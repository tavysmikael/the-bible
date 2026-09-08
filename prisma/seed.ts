import { PrismaClient, Testament } from '@prisma/client';
import * as fs from 'fs';
import * as path from 'path';

const prisma = new PrismaClient();

const OLD_TESTAMENT = [
    'GEN', 'EXO', 'LEV', 'NUM', 'DEU', 'JOS', 'JDG', 'RUT', '1SA', '2SA', '1KI', '2KI',
    '1CH', '2CH', 'EZR', 'NEH', 'EST', 'JOB', 'PSA', 'PRO', 'ECC', 'SNG', 'ISA', 'JER',
    'LAM', 'EZK', 'DAN', 'HOS', 'JOL', 'AMO', 'OBA', 'JON', 'MIC', 'NAM', 'HAB', 'ZEP',
    'HAG', 'ZEC', 'MAL',
];

const NEW_TESTAMENT = [
    'MAT', 'MRK', 'LUK', 'JHN', 'ACT', 'ROM', '1CO', '2CO', 'GAL', 'EPH', 'PHP', 'COL',
    '1TH', '2TH', '1TI', '2TI', 'TIT', 'PHM', 'HEB', 'JAS', '1PE', '2PE', '1JN', '2JN',
    '3JN', 'JUD', 'REV',
];

const BOOK_ORDER = [...OLD_TESTAMENT, ...NEW_TESTAMENT];

function slugify(name: string): string {
    return name
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '') // remove acentos
        .toLowerCase()
        .replace(/\s+/g, '-');
}

async function main() {
    const dataDir = path.join(process.cwd(), 'prisma', 'seed-data', 'BLIVRE');

    for (let i = 0; i < BOOK_ORDER.length; i++) {
        const code = BOOK_ORDER[i];
        const raw = fs.readFileSync(path.join(dataDir, `${code}.json`), 'utf-8');
        const bookData = JSON.parse(raw);

        const testament: Testament = OLD_TESTAMENT.includes(code) ? 'OLD' : 'NEW';
        const slug = slugify(bookData.name);

        const book = await prisma.book.upsert({
            where: { slug },
            update: {},
            create: { slug, testament, order: i + 1 },
        });

        for (const chapter of bookData.chapters) {
            for (const verseData of chapter.verses) {
                const verse = await prisma.verse.upsert({
                    where: {
                        bookId_chapter_number: {
                            bookId: book.id,
                            chapter: chapter.number,
                            number: verseData.number,
                        },
                    },
                    update: {},
                    create: {
                        bookId: book.id,
                        chapter: chapter.number,
                        number: verseData.number,
                    },
                });

                await prisma.verseText.upsert({
                    where: { verseId_language: { verseId: verse.id, language: 'PT' } },
                    update: { content: verseData.text.trim() },
                    create: {
                        verseId: verse.id,
                        language: 'PT',
                        content: verseData.text.trim(),
                    },
                });
            }
        }

        console.log(`✔ ${bookData.name} (${code}) importado`);
    }
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });