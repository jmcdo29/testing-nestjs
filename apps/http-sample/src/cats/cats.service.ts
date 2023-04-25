import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import { Cat } from './entities/cat.entity';

@Injectable()
export class CatsService {
  constructor(private httpService: HttpService) {}

  create(createCatDto: CreateCatDto): Observable<Cat> {
    return this.httpService
      .post<Cat>('http://localhost:3000/cats', createCatDto)
      .pipe(map((response) => response.data));
  }

  findAll(): Observable<Cat[]> {
    return this.httpService
      .get<Cat[]>('http://localhost:3000/cats')
      .pipe(map((response) => response.data));
  }

  findOne(id: number): Observable<Cat> {
    return this.httpService
      .get<Cat>(`http://localhost:3000/cats/${id}`)
      .pipe(map((response) => response.data));
  }

  update(id: number, updateCatDto: UpdateCatDto): Observable<Cat> {
    return this.httpService
      .put<Cat>(`http://localhost:3000/cats/${id}`, updateCatDto)
      .pipe(map((response) => response.data));
  }

  remove(id: number): Observable<void> {
    return this.httpService
      .delete(`http://localhost:3000/cats/${id}`)
      .pipe(map((response) => response.data));
  }
}
