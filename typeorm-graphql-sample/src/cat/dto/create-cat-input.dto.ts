import { IsString, MaxLength, MinLength } from 'class-validator';
import { CreateCatInput } from '../../graphql/protocol.schema';

export class CreateCatInputDto extends CreateCatInput {
  @IsString()
  @MinLength(3)
  @MaxLength(50)
  name: string;

  constructor(name: string) {
    super();

    this.name = name;
  }
}
