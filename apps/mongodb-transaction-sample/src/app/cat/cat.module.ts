import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CatController } from './cat.controller';
import { CatService } from './cat.service';
import { CatSchema } from './schemas/cat.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Cat', schema: CatSchema }])],
  providers: [CatService],
  controllers: [CatController],
})
export class CatModule {}
