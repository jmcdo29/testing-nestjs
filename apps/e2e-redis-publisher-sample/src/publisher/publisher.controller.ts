import { Body, Controller, Post } from '@nestjs/common';
import { PublisherService } from './publisher.service';

@Controller()
export class PublisherController {
  constructor(private readonly publisherService: PublisherService) {}

  @Post()
  publishEvent(@Body() body: object) {
    const result = this.publisherService.publish(body);
    return {
      result,
    };
  }
}
