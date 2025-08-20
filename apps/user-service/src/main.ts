// apps/user-service/src/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module'; 
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {

  const app = await NestFactory.create(AppModule); 
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3001, '0.0.0.0');
  console.log('Server running on http://localhost:3001');

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://user_rabbitmq:admin_rabbitmq@localhost:5672'],
      queue: 'user_queue',
      queueOptions: {
        durable: false,
      },
    },
  });

  await app.startAllMicroservices();
  console.log('✅ User-service is running (REST + Microservice)');
}
bootstrap();
