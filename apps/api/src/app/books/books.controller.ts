import { Controller, Get, Query } from '@nestjs/common';

import { BooksService } from './books.service';

@Controller('books')
export class BooksController {

  constructor(private readonly booksService: BooksService) { }

  @Get()
  findAll() {
    return this.booksService.findAll();
  }

  @Get('search')
  search(@Query('q') q: string) {
    return this.booksService.findBySlugOrName(q);
  }

}