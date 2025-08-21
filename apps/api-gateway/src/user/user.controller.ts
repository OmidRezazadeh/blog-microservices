import { Controller, Get, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from '@blog/auth';

@Controller('user')
export class UserController {
constructor(private readonly userService:UserService){}


@UseGuards(JwtAuthGuard)  
@Get('getAll')
async getAllUser(){
    console.log('first step')
    return await this.userService.getAll()
  }  

}
