// apps/user-service/src/main.ts
import { NestFactory } from '@nestjs/core';
import { UserServiceModule } from './user-service.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    UserServiceModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://user_rabbitmq:admin_rabbitmq@localhost:5672'],
        queue: 'user_queue',
        queueOptions: {
          durable: false,
        },
      },
    },
  );
  await app.listen();
}
bootstrap();
