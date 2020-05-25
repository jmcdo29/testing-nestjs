import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { Query } from '@nestjs/graphql';
import { CatService } from './cat.service';
import { CatInput } from './models/cat-input.dto';
import { CatInsert } from './models/cat-mutation.dto';
import { Cat } from './models/cat-query.dto';

@Resolver(() => Cat)
export class CatResolver {
  constructor(private readonly catService: CatService) {}

  @Query(() => [Cat])
  getCats(): Cat[] {
    return this.catService.getCats();
  }

  @Query(() => Cat)
  getCat(@Args('catId') args: CatInput): Cat {
    return this.catService.getOneCat(args);
  }

  @Mutation(() => Cat)
  insertCat(@Args('newCat') newCat: CatInsert): Cat {
    return this.catService.newCat(newCat);
  }
}
