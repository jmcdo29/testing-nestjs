import { IsNotEmpty, IsNumber, IsString, Validate } from 'class-validator';
import { OwnerExistsRule } from './owner-exists-rule';

export class CatDTO {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  breed: string;

  @IsNumber()
  @IsNotEmpty()
  age: number;

  @IsString()
  @IsNotEmpty()
  @Validate(OwnerExistsRule)
  ownerId: string;
}

export type TCat = CatDTO & { id: string };
