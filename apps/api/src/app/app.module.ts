import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { PrismaModule } from './prisma/prisma.module';
import { VersesModule } from './verses/verses.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [PrismaModule, VersesModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
