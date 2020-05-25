import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatModule } from './cat/cat.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost:27017'), CatModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
