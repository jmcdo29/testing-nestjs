import { Module, Logger } from '@nestjs/common';
import { RxjsService } from './rxjs.service';

@Module({
  providers: [RxjsService, Logger],
  exports: [RxjsService],
})
export class RxjsModule {}
