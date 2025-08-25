import { Controller } from '@nestjs/common';
import { UserServiceService } from './user-service.service';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';


@Controller('user')
export class UserServiceController {
  constructor(
    private readonly userService: UserServiceService,
  ) {}

  @MessagePattern('user.getAll')
  async getAll(){


      return await this.userService.getAll()
  }
 

}