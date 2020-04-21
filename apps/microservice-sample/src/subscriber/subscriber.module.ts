import { Module } from '@nestjs/common';
import { SubscriberController } from './subscriber.controller';
import { EVENT_HUB } from './subscriber.type';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';

@Module({
  controllers: [SubscriberController],
  providers: [
    {
      provide: EVENT_HUB,
      useValue: ClientProxyFactory.create({
        transport: Transport.TCP,
      }),
    },
  ],
})
export class SubscriberModule {}
