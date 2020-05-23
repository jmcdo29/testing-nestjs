import { Field, Int, ObjectType } from 'type-graphql';

@ObjectType()
export class Cat {
  @Field()
  name: string;

  @Field(() => Int)
  age: number;

  @Field()
  breed: string;

  @Field()
  id: string;
}
