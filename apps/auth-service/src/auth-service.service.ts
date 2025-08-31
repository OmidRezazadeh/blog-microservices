import { RegisterDto, LoginDto } from 'blog/common';
import * as bcrypt from 'bcrypt';
import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'blog/common/entities';
import { Repository } from 'typeorm';
import { Profile } from 'blog/common/entities/profile.entity';

@Injectable()
export class AuthServiceService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly profileRepository: Repository<Profile>,
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
    const savedUser = await this.userRepository.save(user);
    const profile = this.profileRepository.create({
      userId: savedUser.id,
    });
    await this.profileRepository.save(profile);
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
