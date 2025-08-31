import { Controller, Get } from '@nestjs/common';
import { ProfileServiceService } from './profile-service.service';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';
import { RegisterDto } from 'blog/common';

@Controller()
export class ProfileServiceController {
  constructor(private readonly profileServiceService: ProfileServiceService) {}

   @EventPattern('profile_created')
    async store(@Payload() data: { userId: number,bio:string }){
             await this.profileServiceService.createProfile(data.userId,data.bio);
    }
}
