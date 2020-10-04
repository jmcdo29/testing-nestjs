import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { CatsController } from './cats.controller';
import { Cat } from './cat.model';
import { CatsService } from './cats.service';

@Module({
  imports: [SequelizeModule.forFeature([Cat])],
  controllers: [CatsController],
  providers: [CatsService],
})
export class CatsModule {}
