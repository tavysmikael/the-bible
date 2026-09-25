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

    async findBySlugOrName(query: string) {
        const normalized = query.toLowerCase();

        return this.prisma.book.findFirst({
            where: {
                OR: [
                    { slug: { contains: normalized } },
                    { name: { contains: normalized, mode: 'insensitive' } },
                ],
            },
        });
    }
}