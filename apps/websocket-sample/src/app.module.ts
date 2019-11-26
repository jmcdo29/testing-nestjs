import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { AppGateway } from './app.gateway';
import { join } from 'path';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(process.cwd(), 'apps', 'websocket-sample', 'client'),
    }),
  ],
  providers: [AppGateway],
})
export class AppModule {}
