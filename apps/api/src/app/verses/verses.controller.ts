import { Controller, Get, Param, Query } from '@nestjs/common';
import { VersesService } from './verses.service';
import { Language } from '@prisma/client';

@Controller('verses')
export class VersesController {
  constructor(private readonly versesService: VersesService) { }

  @Get(':bookSlug/:chapter')
  findChapter(
    @Param('bookSlug') bookSlug: string,
    @Param('chapter') chapter: string,
    @Query('lang') lang: Language = 'PT',
  ) {
    return this.versesService.findChapter(bookSlug, Number(chapter), lang);
  }
}