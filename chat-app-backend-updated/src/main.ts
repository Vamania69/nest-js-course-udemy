import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { Logger } from 'nestjs-pino';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';

import * as cors from 'cors';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });
  app.useGlobalPipes(new ValidationPipe());
  app.useLogger(app.get(Logger));

  app.enableCors({
    origin: 'http://localhost:3001', // Your frontend URL
    credentials: true, // Allow credentials (cookies)
  });
  const configService = app.get(ConfigService);
  
  app.use(cookieParser());
  app.use(
    cors({
      origin: 'http://localhost:3001',
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization'],
    }),
  );

  await app.listen(configService.getOrThrow('PORT') ?? 8000);
}
bootstrap();
