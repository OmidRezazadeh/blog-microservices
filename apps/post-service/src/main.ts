// apps/user-service/src/main.ts
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { PostServiceModule } from './post-service.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    PostServiceModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://user_rabbitmq:admin_rabbitmq@localhost:5672'],
        queue: 'post_queue',
        queueOptions: {
          durable: false,
        },
      },
    },
  );
  await app.listen();
}
bootstrap();
