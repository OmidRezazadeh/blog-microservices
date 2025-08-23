import { Controller } from '@nestjs/common';
import { UserServiceService } from './user-service.service';
import { MessagePattern, Payload } from '@nestjs/microservices';


@Controller('user')
export class UserServiceController {
  constructor(
    private readonly userService: UserServiceService,
  ) {}

  @MessagePattern('user.getAll')
  async getAll(){


      return await this.userService.getAll()
  }
 

  // @MessagePattern('user.validate')
  // async ValidateUser(@Payload() data: { userId: number }) {
  //   try {
  //     return await this.userService.validateUser(data);
  //   } catch (error) {
  //     console.error('Error in user.validate:', error);
  //     throw error;
  //   }
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