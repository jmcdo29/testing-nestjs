import { Test, TestingModule } from '@nestjs/testing';
import { RxjsService } from './rxjs.service';

describe('RxjsService', () => {
  let service: RxjsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RxjsService],
    }).compile();

    service = module.get<RxjsService>(RxjsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
