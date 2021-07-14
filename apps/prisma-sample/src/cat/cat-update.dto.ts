import { PartialType } from '@nestjs/mapped-types';
import { CatDTO } from './cat.dto';

export class CatUpdateDTO extends PartialType(CatDTO) {}
