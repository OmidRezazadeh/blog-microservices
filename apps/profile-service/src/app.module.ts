import { Module } from '@nestjs/common';
import { DatabaseModule } from 'blog/database';
import { ProfileServiceModule } from './profile-service.module';

@Module({
 imports:[
  DatabaseModule,
  ProfileServiceModule,
 ],
})
export class AppModule {}
