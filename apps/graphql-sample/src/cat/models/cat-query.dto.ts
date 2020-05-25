import { Field, Int, ObjectType } from '@nestjs/graphql';

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
