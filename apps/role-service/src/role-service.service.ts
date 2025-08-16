import { Injectable } from '@nestjs/common';

@Injectable()
export class RoleServiceService {
  getHello(): string {
    return 'Hello World!';
  }
}
