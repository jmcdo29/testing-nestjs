import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CatController } from './cat.controller';
import { Cat } from './cat.entity';
import { CatService } from './cat.service';

@Module({
  imports: [TypeOrmModule.forFeature([Cat])],
  providers: [CatService],
  controllers: [CatController],
})
export class CatModule {}
