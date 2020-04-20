import { Injectable, Inject } from '@nestjs/common';
import { EVENT_HUB } from './publisher.type';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class PublisherService {
  constructor(@Inject(EVENT_HUB) private readonly client: ClientProxy) {}

  publish() {
    this.client.emit('change', 'world');
  }
}
