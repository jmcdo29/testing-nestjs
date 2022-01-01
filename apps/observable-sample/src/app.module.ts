import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatModule } from './cat/cat.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: 'postgres://postgres:postgres@localhost:5432/typeorm',
      synchronize: true,
      entities: [__dirname + '/**/*.entity.{ts,js}'],
    }),
    CatModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
