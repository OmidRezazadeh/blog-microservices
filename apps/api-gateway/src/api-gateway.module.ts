import { Module } from '@nestjs/common';
import { ApiGatewayController } from './api-gateway.controller';
import { ApiGatewayService } from './api-gateway.service';
import { UserService } from './user/user.service';
import { UserController } from './user/user.controller';
import { UsersModule } from './user/user.module';

@Module({
  imports: [UsersModule],
  controllers: [ApiGatewayController, UserController],
  providers: [ApiGatewayService, UserService],
})
export class ApiGatewayModule {}
