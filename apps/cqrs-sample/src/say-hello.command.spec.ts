import { SayHelloCommand } from './say-hello.command';

describe('SayHelloCommand', () => {
  it('should create a SayHelloCommand instance', () => {
    const command = new SayHelloCommand('Test');
    expect(command.name).toBe('Test');
    expect(command instanceof SayHelloCommand).toBe(true);
  });
});
