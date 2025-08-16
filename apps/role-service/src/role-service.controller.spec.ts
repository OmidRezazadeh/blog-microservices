import { Test, TestingModule } from '@nestjs/testing';
import { RoleServiceController } from './role-service.controller';
import { RoleServiceService } from './role-service.service';

describe('RoleServiceController', () => {
  let roleServiceController: RoleServiceController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [RoleServiceController],
      providers: [RoleServiceService],
    }).compile();

    roleServiceController = app.get<RoleServiceController>(RoleServiceController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(roleServiceController.getHello()).toBe('Hello World!');
    });
  });
});
