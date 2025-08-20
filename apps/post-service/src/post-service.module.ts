import { Module } from '@nestjs/common';
import { PostServiceController } from './post-service.controller';
import { PostServiceService } from './post-service.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from 'blog/common/entities';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    TypeOrmModule.forFeature([Post]),

    ClientsModule.register([
      {
        name: 'USER_RMQ',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://user_rabbitmq:admin_rabbitmq@localhost:5672'],
          queue: 'user_queue',
          queueOptions: { durable: false },
          exchange: 'posts',
          exchangeType: 'topic',
        },
      },
    ]),
  ],
  controllers: [PostServiceController],
  providers: [PostServiceService],
  exports: [PostServiceService],
})
export class PostServiceModule {}
