import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CatDTO } from './cat.dto';
import { Cat } from './cat.model';
import { CatsService } from './cats.service';

@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Get()
  async getCats() {
    return this.catsService.findAllCat();
  }

  @Get(':id')
  async getOneCat(@Param('id') catId: number) {
    return this.catsService.findOneCat(catId);
  }

  @Post('new')
  async newCat(@Body() cat: CatDTO) {
    return this.catsService.createCat(cat);
  }
}
