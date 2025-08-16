import { Module } from '@nestjs/common';
import { RoleServiceController } from './role-service.controller';
import { RoleServiceService } from './role-service.service';

@Module({
  imports: [],
  controllers: [RoleServiceController],
  providers: [RoleServiceService],
})
export class RoleServiceModule {}
