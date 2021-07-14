import { Module } from '@nestjs/common';
import { CatController } from './cat.controller';
import { CatService } from './cat.service';
import { OwnerExistsRule } from './owner-exists-rule';

@Module({
  providers: [CatService, OwnerExistsRule],
  controllers: [CatController],
})
export class CatModule {}
