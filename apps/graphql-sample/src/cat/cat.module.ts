import { Module } from '@nestjs/common';
import { CatResolver } from './cat.resolver';
import { CatService } from './cat.service';

@Module({
  providers: [CatResolver, CatService],
})
export class CatModule {}
