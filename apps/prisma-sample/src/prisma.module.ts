import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

const prismaClient = {
  provide: 'PrismaClient',
  useClass: PrismaService,
};

@Global()
@Module({
  providers: [prismaClient],
  exports: [prismaClient],
})
export class PrismaModule {}
