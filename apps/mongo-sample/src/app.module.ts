import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatModule } from './cat/cat.module';
import { MongooseModuleConfigService } from './config/mongoose-module-config.service';

@Module({
  imports: [
    MongooseModule.forRootAsync({ useClass: MongooseModuleConfigService }),
    CatModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
