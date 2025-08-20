import { Module } from '@nestjs/common';
import { PostServiceController } from './post-service.controller';
import { PostServiceService } from './post-service.service';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    TypeOrmModule.forFeature([Post]),

    JwtModule.registerAsync({
      useFactory: () => ({
        secret: process.env.JWT_SECRET,
        signOptions: { expiresIn: process.env.JWT_EXPIRES_IN },
      }),
    }),

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
