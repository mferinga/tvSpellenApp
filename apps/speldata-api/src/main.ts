/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import { ApiResponseInterceptor } from '@org/dto';

import cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const globalPrefix = 'api';
  const allowedOrigins = (
    process.env.FRONTEND_ORIGINS ||
    'http://localhost:4200,http://127.0.0.1:4200,http://159.69.146.203:4200'
  )
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean);

  app.setGlobalPrefix(globalPrefix);

  app.enableCors({
    origin: allowedOrigins,
    credentials: true,
  });

  app.useGlobalInterceptors(new ApiResponseInterceptor());

  app.use(cookieParser());

  const port = process.env.PORT || 3333;
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();
