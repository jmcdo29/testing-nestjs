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
import { CatDTO } from './cat.dto';
import { Cat } from '@prisma/client';
import { CatService } from './cat.service';
import { CatUpdateDTO } from './cat-update.dto';

@Controller('cats')
export class CatController {
  constructor(private readonly catService: CatService) {}

  @Get()
  async getCats(@Query('name') name?: string): Promise<Cat[]> {
    return this.catService.getAll(name);
  }

  @Get('/:id')
  async getById(@Param('id') id: string): Promise<Cat> {
    return this.catService.getOne(id);
  }

  @Post('/')
  async newCat(@Body() cat: CatDTO): Promise<Cat> {
    return this.catService.insertOne(cat);
  }

  @Patch('/:id')
  async updateCat(
    @Param('id') id: string,
    @Body() cat: CatUpdateDTO,
  ): Promise<Cat> {
    return this.catService.updateOne(id, cat);
  }

  @Delete('/:id')
  async deleteCat(@Param('id') id: string): Promise<{ deleted: boolean }> {
    return this.catService.deleteOne(id);
  }
}
