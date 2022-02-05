import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CatsService } from './cats.service';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import { Observable } from 'rxjs';
import { Cat } from './entities/cat.entity';
import { AxiosResponse } from 'axios';

@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Post()
  create(@Body() createCatDto: CreateCatDto): Observable<AxiosResponse<Cat[]>> {
    return this.catsService.create(createCatDto);
  }

  @Get()
  findAll(): Observable<AxiosResponse<Cat[]>> {
    return this.catsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Observable<AxiosResponse<Cat>> {
    return this.catsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCatDto: UpdateCatDto,
  ): Observable<AxiosResponse<Cat>> {
    return this.catsService.update(+id, updateCatDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Observable<AxiosResponse<any>> {
    return this.catsService.remove(+id);
  }
}
