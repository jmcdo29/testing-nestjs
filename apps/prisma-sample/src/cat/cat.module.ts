import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CatController } from './cat.controller';
import { CatService } from './cat.service';

@Module({
  providers: [PrismaService, CatService],
  controllers: [CatController],
})
export class CatModule {}
