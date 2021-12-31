import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import type { CatDTO } from './cat.dto';
import { Cat } from './cat.entity';
import { CatService } from './cat.service';

@Controller('cat')
export class CatController {
  constructor(private readonly catService: CatService) {}

  @Get()
  async getCats(): Promise<Cat[]> {
    return this.catService.getAll();
  }

  @Get('/name')
  async getByName(@Query('name') name: string): Promise<Cat> {
    return this.catService.getOneByName(name);
  }

  @Get('/:id')
  async getById(@Param('id') id: string): Promise<Cat> {
    return this.catService.getOne(id);
  }

  @Post('/new')
  async newCat(@Body() cat: CatDTO): Promise<Cat> {
    return this.catService.insertOne(cat);
  }

  @Patch('/update')
  async updateCat(@Body() cat: CatDTO): Promise<Cat> {
    return this.catService.updateOne(cat);
  }

  @Delete('/delete/:id')
  async deleteCat(@Param('id') id: string): Promise<{ deleted: boolean }> {
    return this.catService.deleteOne(id);
  }
}
