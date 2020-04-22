import { Controller, Get } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { SubscriberService } from './subscriber.service';

@Controller()
export class SubscriberController {
  constructor(private readonly subscriberService: SubscriberService) {}

  @EventPattern('log')
  handleChange(data: object) {
    return this.subscriberService.create(data);
  }

  @Get()
  getLogs() {
    return this.subscriberService.getAll();
  }
}
