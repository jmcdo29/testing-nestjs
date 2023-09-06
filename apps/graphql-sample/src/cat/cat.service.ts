import { BadRequestException, Injectable } from '@nestjs/common';
import { CatInput } from './models/cat-input.dto';
import { CatInsert } from './models/cat-mutation.dto';
import { Cat } from './models/cat-query.dto';
import { CatUpdateDTO } from './models/cat-update.dto';

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

  updateCat(cat: CatUpdateDTO): Cat {
    const idx = this.cats.findIndex((el) => el.id === cat.id);
    if (idx < 0) {
      throw new BadRequestException(`No cat with id ${cat.id} found`);
    }
    const currentCat = this.cats[idx];

    this.cats[idx] = { ...currentCat, ...cat };
    return this.cats[idx];
  }

  deleteCat(catId: string): Cat {
    const catIdx = this.cats.findIndex((el) => el.id === catId);
    if (catIdx < 0) {
      throw new BadRequestException(`No cat with id ${catId} found`);
    }
    const deletedCat = this.cats[catIdx];
    this.cats.splice(catIdx, 1);
    return deletedCat;
  }
}
