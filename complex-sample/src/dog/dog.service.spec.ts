import { Test, TestingModule } from '@nestjs/testing';
import { DogService } from './dog.service';

describe('DogService', () => {
  let service: DogService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DogService],
    }).compile();

    service = module.get<DogService>(DogService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
