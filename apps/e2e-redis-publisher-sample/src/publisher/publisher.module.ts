import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { PublisherController } from './publisher.controller';
import { PublisherService } from './publisher.service';
import { EVENT_HUB } from './publisher.type';

@Module({
  controllers: [PublisherController],
  providers: [
    {
      provide: EVENT_HUB,
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const redisUrl = configService.get<string>('REDIS_URL');
        return ClientProxyFactory.create({
          transport: Transport.REDIS,
          options: {
            url: redisUrl,
          },
        });
      },
    },
    PublisherService,
  ],
})
export class PublisherModule {}
