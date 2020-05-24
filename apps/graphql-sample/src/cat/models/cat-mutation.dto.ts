import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CatInsert {
  @Field(() => Int)
  age: number;

  @Field()
  name: string;

  @Field()
  breed: string;
}
