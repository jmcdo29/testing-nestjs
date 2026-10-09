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
    it('should return "Hola, World!" for lang "es"', () => {
      expect(service.getHello(undefined, 'es')).toBe('Hola, World!');
    });
    it('should return "Bonjour, Tester!" for lang "fr"', () => {
      expect(service.getHello('Tester', 'fr')).toBe('Bonjour, Tester!');
    });
    it('should fall back to English for an unknown lang', () => {
      expect(service.getHello('Tester', 'de')).toBe('Hello, Tester!');
    });
    it('should fall back to English for inherited prototype lang "constructor"', () => {
      expect(service.getHello('Tester', 'constructor')).toBe('Hello, Tester!');
    });
    it('should fall back to English for inherited prototype lang "toString"', () => {
      expect(service.getHello(undefined, 'toString')).toBe('Hello, World!');
    });
  });
});
