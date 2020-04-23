import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PublisherModule } from './publisher/publisher.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PublisherModule,
  ],
})
export class AppModule {}
