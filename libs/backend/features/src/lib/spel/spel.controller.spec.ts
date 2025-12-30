import { Test, TestingModule } from '@nestjs/testing';
import { SpelController } from '../spel.controller';

describe('SpelController', () => {
  let controller: SpelController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SpelController],
    }).compile();

    controller = module.get<SpelController>(SpelController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
