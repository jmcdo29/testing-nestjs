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

  async getCat(id: string): Promise<Cat> {
    return this.catsRepo.findOne({
      where: {
        id,
      },
    });
  }

  async addCat(cat: CatDTO): Promise<Cat> {
    return this.catsRepo.create(cat);
  }

  async removeCat(id: string): Promise<void> {
    const cat = await this.getCat(id);
    await cat.destroy();
  }

  async updateCat(id: string, updateCat: Partial<Cat>): Promise<Cat> {
    const cat = await this.getCat(id);
    return cat.update(updateCat);
  }
}
