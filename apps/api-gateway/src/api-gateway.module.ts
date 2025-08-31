import { Module } from '@nestjs/common';
import { ApiGatewayController } from './api-gateway.controller';
import { ApiGatewayService } from './api-gateway.service';
import { UserService } from './user/user.service';
import { UserController } from './user/user.controller';
import { UsersModule } from './user/user.module';
import { PostService } from './post/post.service';
import { PostController } from './post/post.controller';
import { PostModule } from './post/post.module';
import { ProfileModule } from './profile/profile.module';
import { ProfileService } from './profile/profile.service';
import { ProfileController } from './profile/profile.controller';

@Module({
  imports: [UsersModule, PostModule, ProfileModule],
  controllers: [ApiGatewayController, UserController, PostController,ProfileController],
  providers: [ApiGatewayService, UserService, PostService, ProfileService],
})
export class ApiGatewayModule {}
