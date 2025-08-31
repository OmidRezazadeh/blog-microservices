import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '@blog/auth';
import { ProfileService } from './profile.service';

@Controller('profile')
export class ProfileController {
    constructor(
        private readonly profileService:ProfileService
    ){}
    
  @UseGuards(JwtAuthGuard)
  @Get('get-profile')
  async single(@Request() request){
           const userId = request.user.id;
           return await this.profileService.single(userId)
  }

}
