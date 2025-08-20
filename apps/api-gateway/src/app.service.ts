import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'blog/common/entities';
import { Repository } from 'typeorm';


@Injectable()
export class AppService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async getHello(): Promise<string> {
    try {
      // تست اتصال دیتابیس
      const userCount = await this.userRepository.count();
      return `👤 User Service is running! Users in database: ${userCount}`;
    } catch (error) {
      return `❌ Database connection failed: ${error.message}`;
    }
  }


}
