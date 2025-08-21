import { Module } from '@nestjs/common';
import { AuthServiceModule } from './auth-service.module';

@Module({
  imports: [
    AuthServiceModule,
  ],
})
export class AppModule {}
