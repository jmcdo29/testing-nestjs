import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { CatModule } from './cat/cat.module';
import { GraphQLModule } from '@nestjs/graphql';

@Module({
  imports: [
    CatModule,
    GraphQLModule.forRoot({
      autoSchemaFile: 'schema.gql',
      playground: true,
      debug: true,
    }),
  ],
  providers: [AppService],
})
export class AppModule {}
