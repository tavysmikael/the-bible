import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class BooksService {
    constructor(private readonly prisma: PrismaService) { }

    findAll() {
        return this.prisma.book.findMany({
            orderBy: { order: 'asc' },
            select: { id: true, slug: true, name: true, testament: true },
        });
    }
}