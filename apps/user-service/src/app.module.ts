import { Module } from '@nestjs/common';
import { UserServiceModule } from './user-service.module';
import { DatabaseModule } from 'blog/database';

@Module({
  imports: [
    DatabaseModule,
    UserServiceModule,
  ],
})
export class AppModule {}
