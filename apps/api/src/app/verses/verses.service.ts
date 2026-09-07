import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Language } from '@prisma/client';

@Injectable()
export class VersesService {
    constructor(private readonly prisma: PrismaService) { }

    findChapter(bookSlug: string, chapter: number, language: Language) {
        return this.prisma.verse.findMany({
            where: {
                book: { slug: bookSlug },
                chapter,
            },
            orderBy: { number: 'asc' },
            include: {
                texts: { where: { language } },
            },
        });
    }
}