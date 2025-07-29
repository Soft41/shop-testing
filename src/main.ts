import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const PORT = 3100;

  const app = await NestFactory.create(AppModule);

  app.enableCors({
    credentials: true,
    origin: '*',
    allowedHeaders: '*',
  });

  app.useGlobalPipes(
    new ValidationPipe({
      forbidNonWhitelisted: true,
      transform: true,
      whitelist: true,
    }),
  );

  await app.listen(PORT, '0.0.0.0');
}
bootstrap();
