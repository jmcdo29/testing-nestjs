import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CatModule } from './cat/cat.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: 'postgres://dm-guest:dm-guest@localhost:5432/example',
      synchronize: true,
      entities: [__dirname + '/**/*.entity.{ts,js}'],
      logging: true,
    }),
    GraphQLModule.forRoot({
      debug: true,
      playground: true,
      typePaths: ['./**/*.graphql'],
      installSubscriptionHandlers: true,
      // context: ({req}) => {
      // return {req};
      // },
    }),
    CatModule,
  ],
})
export class AppModule {}
