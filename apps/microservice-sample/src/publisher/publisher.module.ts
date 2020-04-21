import { Module } from '@nestjs/common';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { PublisherController } from './publisher.controller';
import { PublisherService } from './publisher.service';
import { EVENT_HUB } from './publisher.type';

@Module({
  controllers: [PublisherController],
  providers: [
    {
      provide: EVENT_HUB,
      useValue: ClientProxyFactory.create({
        transport: Transport.TCP,
      }),
    },
    PublisherService,
  ],
})
export class PublisherModule {}
