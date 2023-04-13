import { Test, TestingModule } from '@nestjs/testing';
import { CatService } from './cat.service';
import { CatDTO } from './dto/cats.dto';
import { BadRequestException } from '@nestjs/common';

const testCat1 = 'Test Cat 1';
const testBreed1 = 'Test Breed 1';

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
  describe('getAll', () => {
    it('should return the array of cats', () => {
      const cats = service.getAll();
      expect(cats.length).toBe(3);
      expect(cats[0]).toEqual({
        id: 1,
        name: 'Ventus',
        breed: 'Russian Blue',
        age: 3,
      });
      expect(cats[1].name).toBe('Terra');
      expect(cats[2].age).toBe(5);
    });
  });
  describe('getById', () => {
    it('should return a found cat', () => {
      const cat = service.getById(2);
      expect(cat).toBeTruthy();
      expect(cat.name).toBe('Terra');
      expect(cat.id).toBe(2);
    });
    it('should throw and error for a bad id', () => {
      // Due to how Nest makes its errors, there is a problem with testing the entire message directly.
      expect(() => service.getById(15874)).toThrowError(BadRequestException);
      // we can assert the type and the message like this though, so all is not lost
      expect(() => service.getById(15874)).toThrowError(
        'No cat found with id 15874.',
      );
    });
  });
  describe('addCat', () => {
    it('should add the cat', () => {
      const catDTO: CatDTO = {
        name: testCat1,
        breed: testBreed1,
        age: 8,
      };
      const newCat = service.addCat(catDTO);
      expect(newCat).toEqual({ id: 4, ...catDTO });
    });
  });
  describe('deleteCat', () => {
    it('should return true if the id is valid', () => {
      expect(service.deleteCat(2));
    });
    it('should return false if the id is invalid', () => {
      expect(!service.deleteCat(5874533));
    });
  });
  describe('updateCat', () => {
    it('should update the cat', () => {
      const newCat = service.addCat({
        name: testCat1,
        breed: testBreed1,
        age: 8,
      });

      const updatedCat = service.updateCat(newCat.id, {
        breed: 'Updated Breed 1',
        age: 5,
      });

      expect({
        id: newCat.id,
        name: testCat1,
        breed: 'Updated Breed 1',
        age: 5,
      }).toEqual(updatedCat);
    });
    it('should throw error when id is not valid', () => {
      const cat = () =>
        service.updateCat(98, {
          name: 'Updated Breed 1',
        });

      expect(cat).toThrowError(BadRequestException);
      expect(cat).toThrowError('No cat found with id 98.');
    });
  });
  // a bit of an in depth test to make sure the cats are staying in memory
  describe('getAll, addCat, getAll, deleteCat, getAll, findCat', () => {
    /**
     * Due to how javascript assign objects values by reference and not by value
     * it is imperative to run each test right after the function runs.
     * Also a good idea to get the length immediately as that will not change but the array will
     */
    it('should get all cats, create new cat, get all cats again, delete a cat, get all cats and find a specified cat and update a cat and getAll cat again', () => {
      const firstCatSet = service.getAll();
      const firstCatSetLength = firstCatSet.length;
      expect(firstCatSet.length).toBe(3);

      const newCat = service.addCat({
        name: testCat1,
        breed: testBreed1,
        age: 4,
      });
      expect(newCat).toEqual({
        id: 4,
        name: testCat1,
        breed: testBreed1,
        age: 4,
      });
      const secondCatSet = service.getAll();
      expect(secondCatSet.length).toBe(firstCatSetLength + 1);
      expect(secondCatSet).toContainEqual(newCat);

      const deleted = service.deleteCat(2);
      expect(deleted);
      const thirdCatSet = service.getAll();
      expect(thirdCatSet.length).toBe(firstCatSetLength);

      const foundCat = service.getById(3);
      expect(foundCat).toEqual({
        id: 3,
        name: 'Aqua',
        breed: 'Maine Coon',
        age: 5,
      });

      service.updateCat(newCat.id, { name: 'Update Breed 1' });
      const fourthCatSet = service.getAll();
      expect(fourthCatSet.length).toBe(firstCatSetLength);
    });
  });
});
