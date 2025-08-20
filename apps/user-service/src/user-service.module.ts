import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from '../../api-gateway/src/auth/auth.controller';
import { User } from 'blog/common/entities';
import { JwtModule } from '@nestjs/jwt';
import { UserServiceController } from './user-service.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { UserServiceService } from './user-service.service';
import { AuthService } from '@blog/auth';

@Module({
  imports: [TypeOrmModule.forFeature([User]),

  JwtModule.registerAsync({
    useFactory: () => ({
      secret: process.env.JWT_SECRET || 'your-super-secret-jwt-key-here',
      signOptions: { expiresIn: process.env.JWT_EXPIRES_IN || '1h'
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
