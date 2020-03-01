import { ArgsType, Field, InputType } from 'type-graphql';

@InputType()
export class CatInput {
  @Field({ nullable: true })
  id: string;
}
