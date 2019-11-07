import { Module } from '@nestjs/common';
import { CatController } from './cat.controller';
import { CatService } from './cat.service';

@Module({
  providers: [CatService],
  controllers: [CatController],
})
export class CatModule {}
