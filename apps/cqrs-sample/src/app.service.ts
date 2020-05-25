import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { SayHelloCommand } from './say-hello.command';

@Injectable()
export class AppService {
  constructor(private commandBus: CommandBus) {}
  async getHello(queryArgs: { name: string }): Promise<string> {
    return this.commandBus.execute(new SayHelloCommand(queryArgs.name));
  }
}
