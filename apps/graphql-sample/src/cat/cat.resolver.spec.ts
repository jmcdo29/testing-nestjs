import { Test } from '@nestjs/testing';
import { CatResolver } from './cat.resolver';
import { CatService } from './cat.service';
import { CatInput } from './models/cat-input.dto';
import { CatInsert } from './models/cat-mutation.dto';
import { Cat } from './models/cat-query.dto';
import { CatUpdateDTO } from './models/cat-update.dto';

describe('CatResolver', () => {
  let resolver: CatResolver;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        CatResolver,
        {
          provide: CatService,
          // using a factory just because
          useFactory: () => ({
            getCats: jest.fn<Cat[], []>(() => [
              {
                age: 3,
                name: 'Ventus',
                breed: 'Russian Blue',
                id: '1',
              },
            ]),
            getOneCat: jest.fn<Cat, [CatInput]>((id) => ({
              age: 3,
              name: 'Test Cat',
              breed: 'Test Breed',
              ...id,
            })),
            newCat: jest.fn<Cat, [CatInsert]>((cat) => ({
              id: '10',
              ...cat,
            })),
            updateCat: jest.fn<Cat, [CatUpdateDTO]>((cat) => ({
              id: '1',
              name: 'Ventus',
              breed: 'Russian Blue',
              age: 4,
              ...cat,
            })),
            deleteCat: jest.fn<Cat, [string]>().mockImplementation((catId) => ({
              id: catId,
              name: 'Ventus',
              breed: 'Russian Blue',
              age: 5,
            })),
          }),
        },
      ],
    }).compile();

    resolver = module.get(CatResolver);
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
  describe('updateCat', () => {
    it('should update a cat', () => {
      expect(
        resolver.updateCat({
          id: '1',
          name: 'Toms',
          breed: 'Siberian Husky',
        }),
      ).toEqual({
        id: '1',
        name: 'Toms',
        breed: 'Siberian Husky',
        age: 4,
      });
    });
  });

  describe('deleteCat', () => {
    it('should delete a cat', () => {
      const catId = '1';
      expect(resolver.deleteCat(catId)).toEqual({
        id: catId,
        name: 'Ventus',
        breed: 'Russian Blue',
        age: 5,
      });
    });
  });
});
