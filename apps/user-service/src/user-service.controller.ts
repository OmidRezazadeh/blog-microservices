import { Controller } from '@nestjs/common';
import { UserServiceService } from './user-service.service';
import { MessagePattern, EventPattern, Payload } from '@nestjs/microservices';

@Controller()
export class UserServiceController {
  constructor(private readonly userServiceService: UserServiceService) {}


  @MessagePattern('user.validate')
  async ValidateUser(@Payload() data: { userId: number }) {
    console.log('📩 Received data in user-service:',data);
    return await this.userServiceService.validateUser(data);
 

  }
  @EventPattern('post.created')
  async onPostCreated(@Payload() data:any){
    console.log('post.created received in user-service:', data);

  }
}