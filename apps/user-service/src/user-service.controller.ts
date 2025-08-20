import { Controller, Get, Param } from '@nestjs/common';
import { UserServiceService } from './user-service.service';
import { MessagePattern, EventPattern, Payload, Ctx, RmqContext } from '@nestjs/microservices';
import { Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom, timeout } from 'rxjs';
import { RegisterDto } from '../../../libs/common/src/dto/Register.dto';



@Controller('user')
export class UserServiceController {
  constructor(
    private readonly userService: UserServiceService,
    @Inject('POST_RMQ') private readonly postClient: ClientProxy,
  ) {}

  @MessagePattern('user.register')
  async register(registerDto:RegisterDto){
    return await this.userService.store(registerDto)
  }

  @MessagePattern('user.validate')
  async ValidateUser(@Payload() data: { userId: number }) {
    return await this.userService.validateUser(data);
 

  }
  @EventPattern('post.created')
  async onPostCreated(@Payload() data: any) {
    console.log('📬 post.created received in user-service:', data);
  }

  // HTTP endpoint: get posts of a user by id
  @Get('/:id/posts')
  async getUserPosts(@Param('id') id: string) {
    const userId = parseInt(id, 10);
    return await lastValueFrom(
      this.postClient.send('post.byUser', { userId }).pipe(timeout(3000)),
    );
  }
}