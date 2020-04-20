import { Controller } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';

@Controller()
export class SubscriberController {
  @EventPattern('change')
  handleChange() {
    /* noop */
  }
}
