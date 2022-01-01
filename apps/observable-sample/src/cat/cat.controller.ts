import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CatDTO } from './dto/cat.dto';
import { Cat } from './entities/cat.entity';
import { CatService } from './cat.service';
import { Observable } from 'rxjs';

@Controller('cat')
export class CatController {
  constructor(private readonly catService: CatService) {}

  @Get()
  getAllCats(): Observable<Cat[]> {
    return this.catService.findAll();
  }

  @Get('/:id')
  getCatById(@Param('id') id: string): Observable<Cat> {
    return this.catService.findOne(id);
  }

  @Post()
  newCat(@Body() cat: CatDTO): Observable<Cat> {
    return this.catService.create(cat);
  }

  @Patch('/:id')
  updateCat(@Param('id') id: string, @Body() cat: CatDTO): Observable<Cat> {
    return this.catService.update(id, cat);
  }

  @Delete('/:id')
  deleteCat(@Param('id') id: string): Observable<Cat> {
    return this.catService.delete(id);
  }
}
