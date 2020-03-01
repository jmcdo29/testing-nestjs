import { Test, TestingModule } from '@nestjs/testing';
import { CatResolver } from './cat.resolver';
import { CatService } from './cat.service';
import { CatInsert } from './models/cat-mutation.dto';

describe('CatResolver', () => {
  let resolver: CatResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CatResolver,
        {
          provide: CatService,
          // using a factory just because
          useFactory: () => ({
            getCats: jest.fn(() => [
              {
                age: 3,
                name: 'Ventus',
                breed: 'Russian Blue',
                id: '1',
              },
            ]),
            getOneCat: jest.fn((id: { id: string }) => ({
              age: 3,
              name: 'Test Cat',
              breed: 'Test Breed',
              ...id,
            })),
            newCat: jest.fn((cat: CatInsert) => ({
              id: '10',
              ...cat,
            })),
          }),
        },
      ],
    }).compile();

    resolver = module.get<CatResolver>(CatResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('getCats', () => {
    it('should get the cats array', () => {
      expect(resolver.getCats()).toEqual([
        {
          age: 3,
          name: 'Ventus',
          breed: 'Russian Blue',
          id: '1',
        },
      ]);
    });
  });
  describe('getCat', () => {
    it('should get one cat', () => {
      expect(resolver.getCat({ id: '500' })).toEqual({
        name: 'Test Cat',
        breed: 'Test Breed',
        age: 3,
        id: '500',
      });
    });
  });
  describe('insertCat', () => {
    it('should make a new cat', () => {
      expect(
        resolver.insertCat({
          name: 'Bad Cat',
          breed: 'Sphinx',
          age: 1390,
        }),
      ).toEqual({
        name: 'Bad Cat',
        breed: 'Sphinx',
        age: 1390,
        id: '10',
      });
    });
  });
});
