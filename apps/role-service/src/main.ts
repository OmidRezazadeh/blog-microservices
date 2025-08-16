// apps/user-service/src/main.ts
import { NestFactory } from '@nestjs/core';
import { RoleServiceModule } from './role-service.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    RoleServiceModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://user_rabbitmq:admin_rabbitmq@localhost:5672'],
        queue: 'role_queue',
        queueOptions: {
          durable: false,
        },
      },
    },
  );
  await app.listen();
}
bootstrap();
