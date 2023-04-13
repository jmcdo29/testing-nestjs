import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ParseIntPipe } from '../parse-int.pipe';
import { CatGuard } from './cat.guard';
import { CatInterceptor } from './cat.interceptor';
import { CatPipe } from './cat.pipe';
import { CatService } from './cat.service';
import { CatDTO } from './dto/cats.dto';
import { Cat } from './models/cats';

@Controller('cat')
@UseInterceptors(CatInterceptor)
@UseGuards(CatGuard)
export class CatController {
  constructor(private readonly catService: CatService) {}

  @Get()
  getAllCats(): Cat[] {
    return this.catService.getAll();
  }

  @Get('/:id')
  getCatById(@Param('id', ParseIntPipe) id: number): Cat {
    return this.catService.getById(id);
  }

  @Post('/new')
  createNewCat(@Body(CatPipe) newCat: CatDTO): Cat {
    return this.catService.addCat(newCat);
  }

  @Delete('/:id')
  deleteCat(@Param('id', ParseIntPipe) id: number): boolean {
    return this.catService.deleteCat(id);
  }

  @Put('/:id')
  updateCat(
    @Param('id', ParseIntPipe) id: number,
    @Body(CatPipe) updateCat: Partial<CatDTO>,
  ): Cat {
    return this.catService.updateCat(id, updateCat);
  }
}
