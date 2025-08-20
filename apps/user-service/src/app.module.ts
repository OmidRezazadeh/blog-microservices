import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserServiceModule } from './user-service.module';
import { User, Post } from 'blog/common/entities';
import { DatabaseModule } from 'blog/database';

@Module({
  imports: [
    DatabaseModule,
    // TypeOrmModule.forFeature([Post, User]),
    UserServiceModule,
  ],
})
export class AppModule {}
