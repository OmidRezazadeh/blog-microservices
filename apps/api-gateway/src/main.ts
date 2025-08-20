// apps/api-gateway/src/main.ts
import { NestFactory } from '@nestjs/core';

import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  
  const port = configService.get('API_GATEWAY_PORT', 3000);
  await app.listen(port);
  
  console.log(`🚀 API Gateway running on: http://localhost:${port}`);
}
bootstrap();