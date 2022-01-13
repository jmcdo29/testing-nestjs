import { Injectable } from '@nestjs/common';
import { Knex } from 'knex';
import { InjectModel } from 'nest-knexjs';
import { CatDTO } from './cat.dto';
import { Cat } from './cat.model';

@Injectable()
export class CatsService {
  constructor(@InjectModel() private readonly knex: Knex) {}

  async findAllCat() {
    const cats = await this.knex.table('cats');
    return cats;
  }

  async createCat(catDTO: CatDTO) {
    const cat = await this.knex.table('cats').insert({
      name: catDTO.name,
      breed: catDTO.breed,
      age: catDTO.age,
    });

    return cat;
  }

  async findOneCat(id: number) {
    const cat = await this.knex.table('cats').where('id', id);
    return cat;
  }
}
