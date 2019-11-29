import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { Observable } from 'rxjs';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(@Query() query?: any): Observable<any> {
    return this.appService.playWithRxJS(
      query && query.maxVal ? Number.parseInt(query.maxVal, 10) : undefined,
      query && query.takeAmount
        ? Number.parseInt(query.takeAmount, 10)
        : undefined,
    );
  }
}
