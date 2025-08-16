import { Controller, Get } from '@nestjs/common';
import { RoleServiceService } from './role-service.service';

@Controller()
export class RoleServiceController {
  constructor(private readonly roleServiceService: RoleServiceService) {}

  @Get()
  getHello(): string {
    return this.roleServiceService.getHello();
  }
}
