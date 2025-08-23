import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post} from 'blog/common/entities';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { AuthModule } from '@blog/auth';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([Post]),
    AuthModule,
    ClientsModule.register([
      {
        name: 'POST_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://user_rabbitmq:admin_rabbitmq@localhost:5672'],
          queue: 'post_queue',
          queueOptions: {
            durable: false,
          },
        },
      },
    ]),
  ],
  controllers: [PostController],
  providers: [PostService],
  exports: [PostService],
})
export class PostModule {}
