import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CatService } from './cat.service';
import { ICat, TCatDeleteRes, TCatPostRes } from './interface/cat.interface';

@Controller('cat')
export class CatController {
  constructor(private catService: CatService) {}

  @Get()
  async getAllCats(): Promise<ICat[]> {
    return this.catService.getAll();
  }

  @Post()
  async addCat(@Body() cat: ICat): Promise<TCatPostRes> {
    return this.catService.addCat(cat);
  }

  @Put()
  async updateCat(@Body() cat: Partial<ICat>) {
    return this.catService.updateCat(cat);
  }

  @Delete('/:id')
  async deleteCat(@Param('id') id: string): Promise<TCatDeleteRes> {
    return this.catService.deleteCat(id);
  }
}
