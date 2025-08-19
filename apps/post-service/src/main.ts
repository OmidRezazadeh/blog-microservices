// apps/user-service/src/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module'; 
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  // برای REST API
  const app = await NestFactory.create(AppModule); 
  app.useGlobalPipes(new ValidationPipe({ transform: false }));

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://user_rabbitmq:admin_rabbitmq@localhost:5672'],
      queue: 'user_queue',
      queueOptions: { durable: false },
    },
  });

  // 2️⃣ استارت میکروسرویس
  await app.startAllMicroservices();
  console.log('Microservice is running');

  await app.listen(3001, '0.0.0.0');
  console.log('REST API running on http://localhost:3001');
}
bootstrap();