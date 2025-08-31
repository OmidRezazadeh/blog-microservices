import { RegisterDto, LoginDto } from 'blog/common';
import * as bcrypt from 'bcrypt';
import {
  ConflictException,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'blog/common/entities';
import { Repository } from 'typeorm';
import { Profile } from 'blog/common/entities/profile.entity';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class AuthServiceService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @Inject('PROFILE_SERVICE') private readonly profileClient: ClientProxy, // اضافه کردیم

  ) {}
  async store(registerDto: RegisterDto) {
    const existingUser = await this.userRepository.findOne({
      where: { email: registerDto.email },
    });

    if (existingUser) {
      throw new ConflictException('کاربری با این ایمیل قبلاً ثبت شده است');
    }

    const hashedPassword = await bcrypt.hash(registerDto.password, 10);
    const user = this.userRepository.create({
      ...registerDto,
      password: hashedPassword,
    });
    const bio= registerDto.bio
    const savedUser = await this.userRepository.save(user);
    this.profileClient.emit('profile_created', { userId: savedUser.id ,bio});
    return savedUser;
  }

  async login(loginDto: LoginDto) {
    const user = await this.userRepository.findOne({
      where: { email: loginDto.email },
    });

    if (!user) {
      throw new UnauthorizedException('کاربری یافت نشد');
    }

    const isPasswordValid = await bcrypt.compare(
      loginDto.password,
      user.password,
    );
    if (!isPasswordValid) {
      throw new UnauthorizedException('رمز عبور اشتباه است');
    }
    return user;
  }

  async validateUser(data: { userId: number }) {
    return await this.userRepository.findOne({ where: { id: data.userId } });
  }
}
