// apps/user-service/src/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module'; 
import { ValidationPipe } from '@nestjs/common';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {

  const app = await NestFactory.create(AppModule); 
  app.useGlobalPipes(new ValidationPipe({ transform: false }));

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://user_rabbitmq:admin_rabbitmq@localhost:5672'],
      queue: 'post_queue',
      queueOptions: { durable: false },
    },
  });

  await app.startAllMicroservices();
  console.log('Post-service microservice is running');

  await app.listen(3001, '0.0.0.0');
  console.log('REST API running on http://localhost:3001');
}
bootstrap();