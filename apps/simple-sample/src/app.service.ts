import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(name?: string): string {
    return `Hello, ${name || 'World'}!`;
  }

  getHelloNew(name?: string): string {
    return `Hello, ${name || 'World'}!`;
  }

  getHelloOld(name?: string): string {
    return `Hello, ${name || 'World'}!`;
  }
}
