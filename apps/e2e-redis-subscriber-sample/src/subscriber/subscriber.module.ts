import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { MongooseModule } from '@nestjs/mongoose';
import { SubscriberController } from './subscriber.controller';
import { LogSchema } from './subscriber.schema';
import { SubscriberService } from './subscriber.service';
import { EVENT_HUB, LOG_SCHEMA } from './subscriber.type';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: LOG_SCHEMA,
        schema: LogSchema,
      },
    ]),
  ],
  controllers: [SubscriberController],
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
    SubscriberService,
  ],
})
export class SubscriberModule {}
