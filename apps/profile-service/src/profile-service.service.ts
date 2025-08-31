import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Profile } from 'blog/common/entities/profile.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProfileServiceService {
  constructor(
    @InjectRepository(Profile)
    private readonly profileRepository: Repository<Profile>,
  ) {}

  async createProfile(userId: number, bio: string) {
    const profile = this.profileRepository.create({ userId, bio });
    return this.profileRepository.save(profile);
  }

  async find(userId: number) {
    const profile = await this.profileRepository.findOne({
      where: { userId: userId },
    });
    if (!profile) {
      throw new NotFoundException('کاربری یافت نشد');
    }
    return profile;
  }
}
