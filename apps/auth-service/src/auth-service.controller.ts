import { Controller } from '@nestjs/common';
import { AuthServiceService } from './auth-service.service';
import { RegisterDto, LoginDto } from 'blog/common';
import { MessagePattern } from '@nestjs/microservices';
@Controller('auth')
export class AuthServiceController {
  constructor(private readonly authService: AuthServiceService) {}

  @MessagePattern('user.register')
  async register(registerDto: RegisterDto) {
    try {
      return await this.authService.store(registerDto);
    } catch (error) {
      console.error('Error in user.register:', error);
      throw error;
    }
  }

  @MessagePattern('user.login')
  async login(loginDto: LoginDto) {
    try {
      return await this.authService.login(loginDto);
    } catch (error) {
      console.error('Error in user.login:', error);
      throw error;
    }
  }
}
