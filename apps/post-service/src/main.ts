// apps/user-service/src/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module'; 
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  // برای REST API
  const app = await NestFactory.create(AppModule); 
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3001, '0.0.0.0');
  // برای RabbitMQ Microservice
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://user_rabbitmq:admin_rabbitmq@localhost:5672'],
      queue: 'post_queue',
      queueOptions: {
        durable: false,
      },
    },
  });

  await app.startAllMicroservices();
}
bootstrap();