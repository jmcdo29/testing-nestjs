import { BadRequestException, Injectable } from '@nestjs/common';
import { CatDTO } from './dto/cats.dto';
import { Cat } from './models/cats';

@Injectable()
export class CatService {
  private cats: Cat[] = [
    new Cat(1, 'Ventus', 'Russian Blue', 3),
    new Cat(2, 'Terra', 'Siberian', 6),
    new Cat(3, 'Aqua', 'Maine Coon', 5),
  ];

  getAll(): Cat[] {
    return this.cats;
  }

  getById(id: number): Cat {
    const foundCat = this.cats.find((cat) => cat.id === id);
    if (!foundCat) {
      throw new BadRequestException('No cat found with id ' + id + '.');
    }
    return foundCat;
  }

  addCat(cat: CatDTO): Cat {
    const newCat = new Cat(
      this.cats[this.cats.length - 1].id + 1,
      cat.name,
      cat.breed,
      cat.age,
    );
    this.cats.push(newCat);
    return newCat;
  }

  deleteCat(id: number): boolean {
    const index = this.cats.findIndex((cat) => cat.id === id);
    if (index === -1) {
      return false;
    }
    this.cats = this.cats.filter((cat, catIndex) => catIndex !== index);
    return true;
  }

  updateCat(id: number, updateCat: Partial<CatDTO>): Cat {
    const idx = this.cats.findIndex((cat) => cat.id === id);
    if (idx < 0) {
      throw new BadRequestException(`No cat found with id ${id}.`);
    }

    this.cats[idx] = { ...this.cats[idx], ...updateCat };
    return this.cats[idx];
  }
}
