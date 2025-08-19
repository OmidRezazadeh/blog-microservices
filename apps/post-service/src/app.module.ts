import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PostServiceController } from "./post-service.controller";
import { PostServiceService } from "./post-service.service";
import { ConfigModule } from "@nestjs/config";
import { Post } from "./entities/post.entity";
import { User } from "apps/user-service/src/entities/user.entity";
import { PostServiceModule } from "./post-service.module";
import { AuthModule } from "@blog/auth";

@Module({
    imports: [
      ConfigModule.forRoot({ isGlobal: true }),
      TypeOrmModule.forRootAsync({
        useFactory: () => ({
          type: 'postgres',
          host: process.env.DB_HOST ,
          port: parseInt(process.env.DB_PORT || '5433'),
          username: process.env.DB_USERNAME || 'blog_user',
          password: process.env.DB_PASSWORD || 'blog_pass',
          database: process.env.DB_DATABASE || 'blog_db',
          entities:[Post,User],
          synchronize: process.env.NODE_ENV !== 'production',
        }),
      }),
TypeOrmModule.forFeature([Post, User]), 
     PostServiceModule,
     AuthModule, 
    ],
    controllers: [PostServiceController],
    providers: [PostServiceService], 
  })
  export class AppModule {}
  