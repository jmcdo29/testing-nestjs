import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CatUpdateDTO {
  @Field({ nullable: false })
  id: string;

  @Field(() => Int, { nullable: true })
  age?: number;

  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  breed?: string;
}
