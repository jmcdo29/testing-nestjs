import { SaidHelloEvent } from './say-hello.event';

describe('SaidHelloEvent', () => {
  it('should create a SaidHelloEvent instance', () => {
    const event = new SaidHelloEvent('Test');
    expect(event.name).toBe('Test');
    expect(event instanceof SaidHelloEvent).toBe(true);
  });
});
