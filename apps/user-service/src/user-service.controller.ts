import { Controller } from '@nestjs/common';
import { UserServiceService } from './user-service.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { RegisterDto, LoginDto } from 'blog/common';

@Controller('user')
export class UserServiceController {
  constructor(
    private readonly userService: UserServiceService,
  ) {}

  @MessagePattern('user.getAll')
  async getAll(){
    console.log('step three')
    return await this.userService.getAll()
  }
  @MessagePattern('user.register')
  async register(registerDto: RegisterDto) {
    try {
      return await this.userService.store(registerDto);
    } catch (error) {
      console.error('Error in user.register:', error);
      throw error;
    }
  }

  @MessagePattern('user.login')
  async login(loginDto: LoginDto) {
    try {
      return await this.userService.login(loginDto);
    } catch (error) {
      console.error('Error in user.login:', error);
      throw error;
    }
  }

  @MessagePattern('user.validate')
  async ValidateUser(@Payload() data: { userId: number }) {
    try {
      return await this.userService.validateUser(data);
    } catch (error) {
      console.error('Error in user.validate:', error);
      throw error;
    }
  }

  // @EventPattern('post.created')
  // async onPostCreated(@Payload() data: any) {
  //   console.log('📬 post.created received in user-service:', data);
  // }

  // HTTP endpoint: get posts of a user by id
  // @Get('/:id/posts')
  // async getUserPosts(@Param('id') id: string) {
  //   try {
  //     const userId = parseInt(id, 10);
  //     return await lastValueFrom(
  //       this.postClient.send('post.byUser', { userId }).pipe(timeout(3000)),
  //     );
  //   } catch (error) {
  //     console.error('Error getting user posts:', error);
  //     throw error;
  //   }
  // }
}