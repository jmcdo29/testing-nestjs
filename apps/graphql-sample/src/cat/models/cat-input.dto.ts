import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CatInput {
  @Field({ nullable: true })
  id: string;
}
