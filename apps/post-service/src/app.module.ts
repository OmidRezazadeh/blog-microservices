import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PostServiceModule } from './post-service.module';
import { DatabaseModule } from 'blog/database';

@Module({
 imports:[
  DatabaseModule,
  PostServiceModule,
 ],
})
export class AppModule {}
