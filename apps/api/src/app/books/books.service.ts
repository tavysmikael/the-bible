import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class BooksService {
    constructor(private readonly prisma: PrismaService) { }

    findAll() {
        return this.prisma.book.findMany({
            orderBy: { order: 'asc' },
            select: {
                id: true,
                slug: true,
                name: true,
                testament: true,
            },
        });
    }

    findBySlugOrName(query: string) {
        const slug = query
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .toLowerCase()
            .trim()
            .replace(/\s+/g, '-');

        return this.prisma.book.findFirst({
            where: {
                slug: {
                    equals: slug,
                },
            },
            orderBy: {
                order: 'asc',
            },
        });
    }
}