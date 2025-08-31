import { Controller, Get } from '@nestjs/common';
import { ProfileServiceService } from './profile-service.service';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';
import { RegisterDto } from 'blog/common';

@Controller()
export class ProfileServiceController {
  constructor(private readonly profileService: ProfileServiceService) {}

   @EventPattern('profile_created')
    async store(@Payload() data: { userId: number,bio:string }){
             await this.profileService.createProfile(data.userId,data.bio);
    }
    @EventPattern('profile-find')
    async single(@Payload() data:{userId:number}){
      return await this.profileService.find(data.userId)
    }
}
