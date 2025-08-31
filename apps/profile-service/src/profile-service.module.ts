import { Module } from '@nestjs/common';
import { ProfileServiceController } from './profile-service.controller';
import { ProfileServiceService } from './profile-service.service';
import { Profile } from 'blog/common/entities/profile.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '@blog/auth';
import { User } from 'blog/common/entities';

@Module({
  imports: [

        TypeOrmModule.forFeature([Profile,User]),
        AuthModule,
  ],
  controllers: [ProfileServiceController],
  providers: [ProfileServiceService],
})
export class ProfileServiceModule {}
