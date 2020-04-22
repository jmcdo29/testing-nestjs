import {
  Inject,
  Injectable,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { EVENT_HUB } from './publisher.type';

@Injectable()
export class PublisherService implements OnModuleInit, OnModuleDestroy {
  constructor(@Inject(EVENT_HUB) private readonly client: ClientProxy) {}

  onModuleInit() {
    return this.client.connect();
  }

  onModuleDestroy() {
    return this.client.close();
  }

  publish(data: object) {
    this.client.emit('log', JSON.stringify(data));
    return {
      success: true,
    };
  }
}
