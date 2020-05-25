import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SayHelloCommand } from './say-hello.command';
import { SayHelloHandler } from './say-hello.handler';
import { SaidHelloEvent } from './say-hello.event';
import { SaidHelloEventsHandler } from './say-hello.event-handler';

@Module({
  imports: [CqrsModule],
  controllers: [AppController],
  providers: [
    AppService,
    SayHelloCommand,
    SayHelloHandler,
    SaidHelloEvent,
    SaidHelloEventsHandler,
  ],
})
export class AppModule {}
