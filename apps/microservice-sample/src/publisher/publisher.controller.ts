import { Controller, Post } from '@nestjs/common';
import { PublisherService } from './publisher.service';

@Controller()
export class PublisherController {
  constructor(private readonly publisherService: PublisherService) {}

  @Post()
  publishEvent() {
    const result = this.publisherService.publish();
    return {
      result,
    };
  }
}
