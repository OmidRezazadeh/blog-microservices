import { Module } from '@nestjs/common';
import { DatabaseModule } from 'blog/database';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User, Post } from 'blog/common/entities';
import { AuthModule } from './auth/auth.module';
import { AuthController } from './auth/auth.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Post, User]),
    DatabaseModule,
    AuthModule,
  ],
  controllers: [AppController,AuthController],
  providers: [AppService],
})
export class AppModule {}