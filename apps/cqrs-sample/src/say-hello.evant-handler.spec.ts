import { Test } from '@nestjs/testing';
import { SaidHelloEventsHandler } from './say-hello.event-handler';

describe('SaidHelloEventsHandler', () => {
  let handler: SaidHelloEventsHandler;

  beforeEach(async () => {
    const mod = await Test.createTestingModule({
      providers: [SaidHelloEventsHandler],
    }).compile();
    handler = mod.get(SaidHelloEventsHandler);
  });

  describe('handle', () => {
    it('should print "Said hello to Test"', () => {
      const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
      handler.handle({ name: 'Test' });
      expect(consoleSpy).toBeCalledTimes(1);
      expect(consoleSpy).toBeCalledWith('Said hello to Test');
    });
  });
});
