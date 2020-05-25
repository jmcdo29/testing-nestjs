import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class SubscriberController {
  @MessagePattern({ cmd: 'log' })
  handleChange(
    data: Record<string, any>,
  ): { data: Record<string, any>; message: string } {
    return {
      data,
      message: 'Hello from subscriber',
    };
  }
}
