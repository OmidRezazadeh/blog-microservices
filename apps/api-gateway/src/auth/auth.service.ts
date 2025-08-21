import { Inject, Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { User } from 'blog/common/entities';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { LoginDto, RegisterDto } from 'blog/common';
import { firstValueFrom, timeout } from 'rxjs';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
    @Inject('AUTH_SERVICE') private readonly rabbitClient: ClientProxy
  ) {}

  async store(registerDto: RegisterDto) {
    try {
      const user = await firstValueFrom(
        this.rabbitClient.send('user.register', registerDto).pipe(timeout(5000))
      );
      
      // Check if the response contains an error
      if (user && user.error) {
        if (user.errorType === 'ConflictException') {
          throw new ConflictException(user.message);
        } else {
          throw new Error(user.message);
        }
      }
      
      return this.generateJwtToken(user);
    } catch (error) {
      console.error('Error in auth store:', error);
      throw error;
    }
  }

  async login(loginDto: LoginDto) {
    try {
      const user = await firstValueFrom(
        this.rabbitClient.send('user.login', loginDto).pipe(timeout(5000))
      );
      
      // Check if the response contains an error
      if (user && user.error) {
        if (user.errorType === 'UnauthorizedException') {
          throw new UnauthorizedException(user.message);
        } else {
          throw new Error(user.message);
        }
      }
      
      const token = await this.generateJwtToken(user);
      return {
        access_token: token.accessToken,
      };
    } catch (error) {
      console.error('Error in auth login:', error);
      throw error;
    }
  }

  async generateJwtToken(user) {
    const payload = { email: user.email, id: user.id };
    const accessToken = this.jwtService.sign(payload, { expiresIn: '1h' });
    const refreshToken = this.jwtService.sign(payload, { expiresIn: '7d' });
    user.refreshToken = refreshToken;
    await this.userRepository.save(user);
    return {
      accessToken,
      refreshToken,
    };
  }
}
