import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';
import { SubscriberController } from './subscriber.controller';
import { EVENT_HUB } from './subscriber.type';

@Module({
  imports: [],
  controllers: [SubscriberController],
  providers: [
    {
      provide: EVENT_HUB,
      inject: [ConfigService],
      useFactory: (configService: ConfigService): ClientProxy => {
        const redisUrl = configService.get<string>('REDIS_URL');
        return ClientProxyFactory.create({
          transport: Transport.REDIS,
          options: {
            url: redisUrl,
          },
        });
      },
    },
  ],
})
export class SubscriberModule {}
