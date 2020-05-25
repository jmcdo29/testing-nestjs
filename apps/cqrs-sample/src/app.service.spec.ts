import { CommandBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';
import { AppService } from './app.service';

describe('AppService', () => {
  let service: AppService;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        AppService,
        {
          provide: CommandBus,
          useValue: {
            execute: async () => 'Hello World!',
          },
        },
      ],
    }).compile();
    service = modRef.get(AppService);
  });

  describe('getHello', () => {
    it('should return "Hello World!', async () => {
      expect(await service.getHello({ name: '' })).toBe('Hello World!');
    });
  });
});
