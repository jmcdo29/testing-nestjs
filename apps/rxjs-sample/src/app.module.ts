import { Module, Logger } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RxjsModule } from './rxjs/rxjs.module';

@Module({
  imports: [RxjsModule],
  controllers: [AppController],
  providers: [AppService, Logger],
})
export class AppModule {}
