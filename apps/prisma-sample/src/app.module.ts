import { Module } from '@nestjs/common';
import { CatModule } from './cat/cat.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [PrismaModule, CatModule],
})
export class AppModule {}
