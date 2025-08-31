import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User, Profile } from 'blog/common/entities';
import { UserServiceController } from './user-service.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { UserServiceService } from './user-service.service';

@Module({
  imports: [
  TypeOrmModule.forFeature([User, Profile]),
    ClientsModule.register([
      {
        name: 'USER_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://user_rabbitmq:admin_rabbitmq@localhost:5672'],
          queue: 'user_queue',
          queueOptions: { durable: false },
        },
        
      },
    ]),
  ],
  controllers: [UserServiceController],
  providers: [UserServiceService],
  exports: [UserServiceService],
})
export class UserServiceModule {}
