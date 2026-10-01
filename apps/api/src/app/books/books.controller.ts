import { Controller, Get, Query } from '@nestjs/common';

import { BooksService } from './books.service';
import { Public } from '../auth/public.decorator';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Public()
  @Get()
  findAll() {
    return this.booksService.findAll();
  }

  @Public()
  @Get('search')
  search(@Query('q') q: string) {
    return this.booksService.findBySlugOrName(q);
  }
}