import { Module } from '@nestjs/common';
import { ApiGatewayController } from './api-gateway.controller';
import { ApiGatewayService } from './api-gateway.service';
import { UserService } from './user/user.service';
import { UserController } from './user/user.controller';
import { UsersModule } from './user/user.module';
import { PostService } from './post/post.service';
import { PostController } from './post/post.controller';
import { PostModule } from './post/post.module';

@Module({
  imports: [UsersModule, PostModule],
  controllers: [ApiGatewayController, UserController, PostController],
  providers: [ApiGatewayService, UserService, PostService],
})
export class ApiGatewayModule {}
