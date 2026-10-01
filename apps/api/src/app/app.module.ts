import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { PrismaModule } from './prisma/prisma.module';
import { VersesModule } from './verses/verses.module';
import { AuthModule } from './auth/auth.module';
import { BooksModule } from './books/books.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/jwt-auth.guard';


@Module({
  imports: [PrismaModule, VersesModule, AuthModule, BooksModule],
  controllers: [AppController],
  providers: [AppService, { provide: APP_GUARD, useClass: JwtAuthGuard }],
})
export class AppModule { }
