import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CatDTO } from './cat.dto';
import { Cat } from './cat.model';

@Injectable()
export class CatsService {
  constructor(@InjectModel(Cat) private readonly catsRepo: typeof Cat) {}

  async getCats(): Promise<Cat[]> {
    return this.catsRepo.findAll();
  }

  async addCat(cat: CatDTO): Promise<Cat> {
    return this.catsRepo.create(cat);
  }
}
