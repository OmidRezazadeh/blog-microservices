// apps/user-service/src/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module'; 
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  // برای REST API
  const app = await NestFactory.create(AppModule); 
  app.useGlobalPipes(new ValidationPipe({ transform: false }));

  await app.listen(3001, '0.0.0.0');
  console.log('REST API running on http://localhost:3001');
}
bootstrap();