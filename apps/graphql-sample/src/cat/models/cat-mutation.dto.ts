import { InputType, Field, Int } from 'type-graphql';

@InputType()
export class CatInsert {
  @Field(() => Int)
  age: number;

  @Field()
  name: string;

  @Field()
  breed: string;
}
