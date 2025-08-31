import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Profile } from 'blog/common/entities/profile.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProfileServiceService {
  constructor(
    @InjectRepository(Profile)
    private readonly profileRepository: Repository<Profile>,
  ) {}

@RabbitSubscribe({
  exchange: 'user-exchange',
  routingKey: 'user.created',
  queue: 'profile-queue',
})
async handleUserCreated(msg:{userId:number}){
  console.log('📥 دریافت event user.created:', msg);

const profile = this.profileRepository.create(
{
  userId:msg.userId
}  
);

    await this.profileRepository.save(profile);
}

}
