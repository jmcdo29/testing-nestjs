import { AppService } from './app.service';
import { Test } from '@nestjs/testing';

describe('AppService', () => {
  let service: AppService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [AppService],
    }).compile();

    service = module.get<AppService>(AppService);
  });

  describe('getHello', () => {
    it('should return "Hello, World!"', () => {
      expect(service.getHello()).toBe('Hello, World!');
    });
    it('should return "Hello, Tester!"', () => {
      expect(service.getHello('Tester')).toBe('Hello, Tester!');
    });
  });
});
