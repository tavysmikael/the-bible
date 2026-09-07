import { Module } from '@nestjs/common';
import { VersesService } from './verses.service';
import { VersesController } from './verses.controller';

@Module({
  controllers: [VersesController],
  providers: [VersesService],
})
export class VersesModule {}
