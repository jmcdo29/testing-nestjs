import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
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

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Cat> {
    return this.catsService.getCat(id);
  }

  @Post('new')
  async newCat(@Body() cat: CatDTO): Promise<Cat> {
    return this.catsService.addCat(cat);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.catsService.removeCat(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() cat: Partial<Cat>,
  ): Promise<Cat> {
    return this.catsService.updateCat(id, cat);
  }
}
