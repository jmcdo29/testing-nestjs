import { Test, TestingModule } from '@nestjs/testing';
import { CatController } from './cat.controller';

describe('Cat Controller', () => {
  let controller: CatController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CatController],
    }).compile();

    controller = module.get<CatController>(CatController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
