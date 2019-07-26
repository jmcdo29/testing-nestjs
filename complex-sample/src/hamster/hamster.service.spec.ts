import { Test, TestingModule } from '@nestjs/testing';
import { HamsterService } from './hamster.service';

describe('HamsterService', () => {
  let service: HamsterService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HamsterService],
    }).compile();

    service = module.get<HamsterService>(HamsterService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
