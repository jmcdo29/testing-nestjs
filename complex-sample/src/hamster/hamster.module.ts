import { Module } from '@nestjs/common';
import { HamsterService } from './hamster.service';
import { HamsterController } from './hamster.controller';

@Module({
  providers: [HamsterService],
  controllers: [HamsterController],
})
export class HamsterModule {}
