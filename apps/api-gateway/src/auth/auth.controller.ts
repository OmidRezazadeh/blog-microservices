import { Controller, Post, Body } from '@nestjs/common';
import { RegisterDto } from '../../../user-service/src/dto/Register.dto';
import { UserServiceService } from '../../../user-service/src/user-service.service';
import { LoginDto } from '../../../../libs/common/src/dto/Login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly userService: UserServiceService) {}

  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    return this.userService.store(registerDto);
  }
  
  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    // For login, we'll need to implement this in UserServiceService
    // For now, returning a placeholder
    return { message: 'Login functionality to be implemented' };
  }
}
