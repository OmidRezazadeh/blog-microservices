import { Module } from '@nestjs/common';
import { ProfileController } from './profile.controller';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Profile } from 'blog/common/entities';
import { AuthModule } from '@blog/auth';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ProfileService } from './profile.service';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([Profile]),
    AuthModule,
    ClientsModule.register([
      {
        name: 'PROFILE_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://user_rabbitmq:admin_rabbitmq@localhost:5672'],
          queue: 'profile_queue',
          queueOptions: {
            durable: false,
          },
        },
      },
    ]),
  ],
  controllers: [ProfileController],
    providers: [ProfileService],
    exports: [ProfileService],
})
export class ProfileModule {}
