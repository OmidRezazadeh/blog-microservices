import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { Profile } from 'blog/common/entities';
import { firstValueFrom } from 'rxjs';
import { Repository } from 'typeorm';

@Injectable()
export class ProfileService {
  constructor(
    @Inject('PROFILE_SERVICE') private readonly rabbitClient: ClientProxy,
  ) {}
  async single(userId: number) {
    try {
        return await firstValueFrom(
            this.rabbitClient.send('profile-find',{userId})
        )
    } catch (error) {
        
    }
  }
}
