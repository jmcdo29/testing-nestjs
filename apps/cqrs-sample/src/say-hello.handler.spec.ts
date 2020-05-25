import { EventBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';
import { SayHelloHandler } from './say-hello.handler';

describe('SayHelloCommandHandler', () => {
  let handler: SayHelloHandler;
  let eventBus: EventBus;

  beforeEach(async () => {
    const mod = await Test.createTestingModule({
      providers: [
        SayHelloHandler,
        {
          provide: EventBus,
          useValue: {
            publish: jest.fn(),
          },
        },
      ],
    }).compile();
    handler = mod.get(SayHelloHandler);
    eventBus = mod.get(EventBus);
  });

  describe('execute', () => {
    afterEach(() => {
      (eventBus.publish as jest.Mock).mockClear();
    });
    it('should return with "Hello Test!"', async () => {
      const response = await handler.execute({ name: 'Test' });
      expect(response).toBe('Hello Test!');
      expect(eventBus.publish).toBeCalledTimes(1);
    });
    it('should return with "Hello World!"', async () => {
      const response = await handler.execute({ name: '' });
      expect(response).toBe('Hello World!');
      expect(eventBus.publish).toBeCalledTimes(1);
    });
  });
});
