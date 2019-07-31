import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CatDTO } from './cat.dto';
import { Cat } from './cat.entity';

@Injectable()
export class CatService {
  constructor(
    @InjectRepository(Cat) private readonly catRepo: Repository<Cat>,
  ) {}

  async getAll(): Promise<Cat[]> {
    return this.catRepo.find();
  }

  async getOne(id: string): Promise<Cat> {
    return this.catRepo.findOneOrFail({ id });
  }

  async getOneByName(name: string): Promise<Cat> {
    return this.catRepo.findOneOrFail({ name });
  }

  async insertOne(cat: CatDTO): Promise<Cat> {
    const newCat = this.catRepo.create(cat);
    this.catRepo.save(newCat);
    return newCat;
  }

  async updateOne(cat: CatDTO): Promise<Cat> {
    const { name, breed, age, id } = cat;
    await this.catRepo.update({ id }, cat);
    return new Cat(name, breed, age, id);
  }

  async deleteOne(id: string): Promise<{ deleted: boolean; message?: string }> {
    try {
      await this.catRepo.delete({ id });
      return { deleted: true };
    } catch (err) {
      return { deleted: false, message: err.message };
    }
  }
}
