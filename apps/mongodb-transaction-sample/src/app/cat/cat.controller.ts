import { Body, Controller, Get, Post } from '@nestjs/common';
import { CatService } from './cat.service';
import { ICat } from './interface/cat.interface';

@Controller('cat')
export class CatController {
  constructor(private catService: CatService) {}

  @Get()
  async getAllCats(): Promise<ICat[]> {
    return this.catService.getAll();
  }

  @Post()
  async addCat(@Body() cat: ICat): Promise<ICat> {
    return this.catService.addCat(cat);
  }

  // @Put()
  // async updateCat(@Body() cat: Partial<ICat>) {
  //   return [];
  // }
}
