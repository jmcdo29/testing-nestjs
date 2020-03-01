import { Injectable, BadRequestException } from '@nestjs/common';
import { Cat } from './models/cat-query.dto';
import { CatInsert } from './models/cat-mutation.dto';
import { CatInput } from './models/cat-input.dto';

@Injectable()
export class CatService {
  private cats: Cat[] = [
    {
      name: 'Ventus',
      age: 4,
      breed: 'Russian Blue',
      id: '1',
    },
    {
      name: 'Terra',
      age: 5,
      breed: 'Siberian',
      id: '2',
    },
    {
      name: 'Aqua',
      age: 3,
      breed: 'Maine Coon',
      id: '3',
    },
  ];

  getCats(): Cat[] {
    return this.cats;
  }

  getOneCat(cat: CatInput): Cat {
    const foundCat = this.cats.find((existingCat) => existingCat.id === cat.id);
    if (!foundCat) {
      throw new BadRequestException(`No cat with id ${cat.id} found`);
    }
    return foundCat;
  }

  newCat(cat: CatInsert): Cat {
    this.cats.push({ id: (this.cats.length + 1).toString(), ...cat });
    return this.cats[this.cats.length - 1];
  }
}
