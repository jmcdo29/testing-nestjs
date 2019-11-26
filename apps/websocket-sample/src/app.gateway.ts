import { SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';

@WebSocketGateway()
export class AppGateway {
  @SubscribeMessage('message')
  handleMessage(client: any, payload: any): string {
    return `Hello, ${payload.name || 'World'}!`;
  }
}
