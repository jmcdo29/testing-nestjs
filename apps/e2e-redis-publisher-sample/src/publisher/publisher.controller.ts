import { Body, Controller, Post } from '@nestjs/common';
import { PublisherService } from './publisher.service';

@Controller()
export class PublisherController {
  constructor(private readonly publisherService: PublisherService) {}

  @Post()
  async publishEvent(@Body() body: object) {
    const result = await this.publisherService.publish(body);
    return {
      result,
    };
  }
}
