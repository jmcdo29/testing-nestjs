import { Body, Controller, Get, Post } from '@nestjs/common';
import { CatDTO } from './cat.dto';
import { Cat } from './cat.model';
import { CatsService } from './cats.service';

@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Get()
  async getCats(): Promise<Cat[]> {
    return this.catsService.getCats();
  }

  @Post('new')
  async newCat(@Body() cat: CatDTO): Promise<Cat> {
    return this.catsService.addCat(cat);
  }
}
