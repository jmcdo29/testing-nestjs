import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cat } from './cat.entity';
import { CatResolvers } from './cat.resolvers';
import { CatService } from './cat.service';

@Module({
  imports: [TypeOrmModule.forFeature([Cat])],
  providers: [CatService, CatResolvers],
  controllers: [],
})
export class CatModule {}
