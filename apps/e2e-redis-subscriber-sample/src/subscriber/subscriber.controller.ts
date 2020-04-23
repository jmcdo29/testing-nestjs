import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class SubscriberController {
  @MessagePattern({ cmd: 'log' })
  handleChange(data: object) {
    return {
      data,
      message: 'Hello from subscriber',
    };
  }
}
