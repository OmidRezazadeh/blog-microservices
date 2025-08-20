import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from 'blog/common/entities';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { LoginDto, RegisterDto } from 'blog/common';
import { firstValueFrom } from 'rxjs';
import { ClientProxy } from '@nestjs/microservices';
@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
    @Inject('USER_SERVICE') private readonly rabbitClient:ClientProxy
  ) {}
  async store(registerDto: RegisterDto) {
    const user = await firstValueFrom(
      this.rabbitClient.send('user.register',registerDto)
    )
    return this.generateJwtToken(user);
   
    // const hashedPassword = await bcrypt.hash(registerDto.password, 10);
    // const user = this.userRepository.create({
    //   ...registerDto,
    //   password: hashedPassword,
    // });
    // return this.userRepository.save(user);
  }
  async login(loginDto: LoginDto) {
    const user = await this.validateUser(loginDto.email, loginDto.password);
    const token = this.generateJwtToken(user);
    return {
      access_token: (await token).accessToken,
    };
  }
  async validateUser(email: string, password: string) {
    const user = await   this.userRepository.findOne({where:{email:email}});
    if (!user) {
      throw new UnauthorizedException(' کاربری یافت نشد');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException(' کاربری یافت نشد');
    }

    return user; 
  }
  async generateJwtToken(user) {
    const payload = { email: user.email, id: user.id};
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
