import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { User } from './entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { UserServiceController } from './user-service.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { UserServiceService } from './user-service.service';

@Module({
  imports: [TypeOrmModule.forFeature([User]),

  JwtModule.registerAsync({
    useFactory: () => ({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: process.env.JWT_EXPIRES_IN 
      },
    })
  }),
  ClientsModule.register([
    {
      name: 'POST_RMQ',
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://user_rabbitmq:admin_rabbitmq@localhost:5672'],
        queue: 'post_queue',
        queueOptions: { durable: false },
      },
    },
  ]),
],
  controllers: [AuthController,UserServiceController],
  providers: [AuthService,UserServiceService],
  exports: [AuthService],
})
export class UserServiceModule {}
