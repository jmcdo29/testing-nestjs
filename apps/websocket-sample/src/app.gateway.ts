import { SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';

@WebSocketGateway()
export class AppGateway {
  @SubscribeMessage('message')
  handleMessage(payload: any): string {
    return `Hello, ${payload.name || 'World'}!`;
  }
}
