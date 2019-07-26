import { Test, TestingModule } from '@nestjs/testing';
import { HamsterController } from './hamster.controller';

describe('Hamster Controller', () => {
  let controller: HamsterController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HamsterController],
    }).compile();

    controller = module.get<HamsterController>(HamsterController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
