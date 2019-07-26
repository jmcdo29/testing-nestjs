import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DogModule } from './dog/dog.module';
import { CatModule } from './cat/cat.module';
import { HamsterModule } from './hamster/hamster.module';

@Module({
  imports: [DogModule, CatModule, HamsterModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
