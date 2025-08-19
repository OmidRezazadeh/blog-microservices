import { Controller, Post, Body } from '@nestjs/common';
import { RegisterDto } from './dto/Register.dto';
import { UserServiceService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly userService: UserServiceService) {}

  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    console.log('Incoming request: POST /auth/register');
    return this.userService.store(registerDto);
  }
  
}
