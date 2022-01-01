import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CatDTO } from './dto/cat.dto';
import { Cat } from './entities/cat.entity';
import { from, Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class CatService {
  constructor(
    @InjectRepository(Cat) private readonly catRepository: Repository<Cat>,
  ) {}

  findAll(): Observable<Cat[]> {
    return from(this.catRepository.find()).pipe(
      map((cats: Cat[]) => {
        return cats;
      }),
    );
  }

  findOne(id: string): Observable<Cat> {
    return from(this.catRepository.findOne({ id })).pipe(
      map((cats: Cat) => {
        return cats;
      }),
    );
  }

  create(cat: CatDTO): Observable<any> {
    const newCat = new Cat();
    newCat.name = cat.name;
    newCat.breed = cat.breed;
    newCat.age = cat.age;
    return from(this.catRepository.save(newCat)).pipe(
      map((user: Cat) => {
        const { ...result } = user;
        return result;
      }),
      catchError(() => throwError(() => new Error('Cat not created!'))),
    );
  }

  update(id: string, cat: CatDTO): Observable<any> {
    return from(this.catRepository.update({ id }, cat)).pipe(
      map(() => this.findOne(id)),
      catchError(() => throwError(() => new Error('Cat not updated!'))),
    );
  }

  delete(id: string): Observable<any> {
    return from(this.catRepository.delete({ id }));
  }
}
