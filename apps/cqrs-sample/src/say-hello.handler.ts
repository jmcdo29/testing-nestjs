import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { SayHelloCommand } from './say-hello.command';
import { SaidHelloEvent } from './say-hello.event';

@CommandHandler(SayHelloCommand)
export class SayHelloHandler implements ICommandHandler<SayHelloCommand> {
  constructor(private readonly eventBus: EventBus) {}
  async execute(command: SayHelloCommand) {
    const name = command.name || 'World';
    this.eventBus.publish(new SaidHelloEvent(name));
    return `Hello ${name}!`;
  }
}
