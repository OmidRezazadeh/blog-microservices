import { Controller, Post, Body } from '@nestjs/common';
import { RegisterDto } from './dto/Register.dto';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/Login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    return this.authService.store(registerDto);
  }
  @Post('login')
  async login(@Body() loginDto :LoginDto){
     return await this.authService.login(loginDto)
  }

}
