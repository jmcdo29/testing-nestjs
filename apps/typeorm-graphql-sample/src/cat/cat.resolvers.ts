import { NotFoundException } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { classToPlain } from 'class-transformer';
import { CatService } from './cat.service';
import { CatDTO } from './dto/cat.dto';
import { CreateCatInputDto } from './dto/create-cat-input.dto';

@Resolver('Cats')
export class CatResolvers {
  constructor(private readonly catService: CatService) {}

  @Query('getAll')
  // @UseGuards(CatGuard)
  async getAll() {
    return this.catService.getAll();
  }

  @Query('Cat')
  async findOneById(@Args('id') id: string): Promise<CatDTO> {
    const cat = await this.catService.getOne(id);
    if (!cat) {
      throw new NotFoundException(id);
    }
    const catJson: any = classToPlain(cat);
    return new CatDTO(catJson);
  }

  @Mutation('createCat')
  // @UseGuards(CatGuard)
  async create(
    @Args('createCatInput') args: CreateCatInputDto,
  ): Promise<CatDTO> {
    const cat = await this.catService.insertOne(args);
    if (!cat) {
      throw new NotFoundException();
    }
    const catJson: any = classToPlain(cat);
    return new CatDTO(catJson);
  }
}
