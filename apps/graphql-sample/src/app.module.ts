import { Module } from '@nestjs/common';
import { CatModule } from './cat/cat.module';
import { GraphQLModule } from '@nestjs/graphql';

@Module({
  imports: [
    CatModule,
    GraphQLModule.forRoot({
      autoSchemaFile: true,
      playground: true,
      debug: true,
    }),
  ],
})
export class AppModule {}
