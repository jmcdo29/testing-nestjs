import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { CatDTO } from './dto/cats.dto';

@Injectable()
export class CatPipe implements PipeTransform<CatDTO, CatDTO> {
  private errorString = 'Incoming cat is not formatted correctly. ';

  transform(value: CatDTO): CatDTO {
    if (!value.age || typeof value.age !== 'number') {
      throw new BadRequestException(this.errorString + 'Age must be a number.');
    }
    if (!value.name || typeof value.name !== 'string') {
      throw new BadRequestException(
        this.errorString + 'Name must be a string.',
      );
    }
    if (!value.breed || typeof value.breed !== 'string') {
      throw new BadRequestException(
        this.errorString + 'Breed must be a string.',
      );
    }
    return value;
  }
}
