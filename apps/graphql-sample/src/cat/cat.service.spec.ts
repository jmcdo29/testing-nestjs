import { Test, TestingModule } from '@nestjs/testing';
import { CatService } from './cat.service';
import { BadRequestException } from '@nestjs/common';

describe('CatService', () => {
  let service: CatService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CatService],
    }).compile();

    service = module.get<CatService>(CatService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getCats', () => {
    it('should return an array of cats', () => {
      expect(service.getCats()).toEqual([
        {
          name: 'Ventus',
          age: 4,
          breed: 'Russian Blue',
          id: '1',
        },
        {
          name: 'Terra',
          age: 5,
          breed: 'Siberian',
          id: '2',
        },
        {
          name: 'Aqua',
          age: 3,
          breed: 'Maine Coon',
          id: '3',
        },
      ]);
    });
  });

  describe('getOneCat', () => {
    it('should successfully return a cat', () => {
      expect(service.getOneCat({ id: '2' })).toEqual({
        name: 'Terra',
        age: 5,
        breed: 'Siberian',
        id: '2',
      });
    });
    it('should throw an error', () => {
      const noIdCall = () => service.getOneCat({ id: 'not an id' });
      expect(noIdCall).toThrowError(BadRequestException);
      expect(noIdCall).toThrowError('No cat with id not an id found');
    });
  });

  describe('newCat', () => {
    it('should add a cat to the array', () => {
      expect(
        service.newCat({
          name: 'Garfield',
          age: 17,
          breed: 'Tabby',
        }),
      ).toEqual({
        name: 'Garfield',
        age: 17,
        breed: 'Tabby',
        id: '4',
      });
    });
  });

  describe('updateCat', () => {
    it('should update the cat exists in the cat array', () => {
      expect(
        service.updateCat({
          id: '1',
          name: 'Ventus Updated',
          age: 4,
        }),
      ).toEqual({
        id: '1',
        name: 'Ventus Updated',
        age: 4,
        breed: 'Russian Blue',
      });
    });

    it('should throw error when id is not valid', () => {
      const cat = () =>
        service.updateCat({
          id: 'Invalid Id',
          name: 'Ventus Updated',
          age: 4,
        });

      expect(cat).toThrowError(BadRequestException);
      expect(cat).toThrowError('No cat with id Invalid Id found');
    });
  });
});
