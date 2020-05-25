import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async getHello(@Query() query: { name: string }): Promise<string> {
    return this.appService.getHello(query);
  }
}
