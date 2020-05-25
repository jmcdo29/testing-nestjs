import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { SaidHelloEvent } from './say-hello.event';

@EventsHandler(SaidHelloEvent)
export class SaidHelloEventsHandler implements IEventHandler<SaidHelloEvent> {
  handle(event: SaidHelloEvent) {
    console.log(`Said hello to ${event.name}`);
  }
}
