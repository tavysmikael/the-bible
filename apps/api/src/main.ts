import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true })); 
  
  app.setGlobalPrefix('api');
  app.enableCors({
    origin: 'http://localhost:4200',
    credentials: true,
  });

  await app.listen(3000);
}

bootstrap();
