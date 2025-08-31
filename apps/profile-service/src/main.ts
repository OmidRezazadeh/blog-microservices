import { NestFactory } from '@nestjs/core';
import { ProfileServiceModule } from './profile-service.module';

async function bootstrap() {
  const app = await NestFactory.create(ProfileServiceModule);
  await app.listen(process.env.port ?? 3000);
}
bootstrap();
