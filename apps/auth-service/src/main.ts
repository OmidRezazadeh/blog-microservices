import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
async function bootstrap() {
  
  const app = await NestFactory.create(AppModule); 
  
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3001);
  console.log('Server running on http://localhost:3001');

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://user_rabbitmq:admin_rabbitmq@localhost:5672'],
      queue: 'auth_queue',
      queueOptions: {
        durable: false,
      },
    },
  });
  
  await app.startAllMicroservices();
  console.log('✅ auth-service is running (REST + Microservice)');
}
bootstrap();
