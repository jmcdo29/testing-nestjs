import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SubscriberModule } from './subscriber/subscriber.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    SubscriberModule,
  ],
})
export class AppModule {}
