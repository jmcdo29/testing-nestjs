import { Injectable } from '@nestjs/common';

const greetings: Record<string, string> = {
  en: 'Hello',
  es: 'Hola',
  fr: 'Bonjour',
};

@Injectable()
export class AppService {
  getHello(name?: string, lang?: string): string {
    const greeting =
      lang && Object.prototype.hasOwnProperty.call(greetings, lang)
        ? greetings[lang]
        : greetings.en;
    return `${greeting}, ${name || 'World'}!`;
  }
}
