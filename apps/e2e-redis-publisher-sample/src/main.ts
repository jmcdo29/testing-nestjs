import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.connectMicroservice({
    transport: Transport.REDIS,
    options: {
      url: app.get(ConfigService).get('REDIS_URL'),
    },
  });

  await app.startAllMicroservicesAsync();

  await app.listen(3000);
}
bootstrap();
