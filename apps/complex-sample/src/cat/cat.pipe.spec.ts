import { BadRequestException } from '@nestjs/common';
import { CatPipe } from './cat.pipe';
import { CatDTO } from './dto/cats.dto';

const testBreed = 'Test Breed';
const failString = 'should throw an error for incorrect type';

describe('CatPipe', () => {
  let pipe: CatPipe;

  beforeEach(() => {
    pipe = new CatPipe();
  });
  it('should be defined', () => {
    expect(pipe).toBeDefined();
  });
  describe('successful calls', () => {
    it('should let the cat DTO go on through', () => {
      const catDTO = { name: 'Test Name', breed: testBreed, age: 4 };
      expect(pipe.transform(catDTO)).toEqual(catDTO);
    });
  });
  /**
   * Assertions now made on wrong data types to satisfy TypeScript compiler, in order to pass test cases
   */
  describe('unsuccessful calls', () => {
    describe('age errors', () => {
      const badAgeCat = { name: 'Test Name', breed: testBreed } as CatDTO;
      it('should throw an error for missing age', () => {
        const errorPipe = () => pipe.transform(badAgeCat);
        expect(errorPipe).toThrowError(BadRequestException);
        expect(errorPipe).toThrowError(
          'Incoming cat is not formatted correctly. Age must be a number.',
        );
      });
      it(failString, () => {
        badAgeCat.age = '5' as unknown as number;
        const errorPipe = () => pipe.transform(badAgeCat);
        expect(errorPipe).toThrowError(BadRequestException);
        expect(errorPipe).toThrowError(
          'Incoming cat is not formatted correctly. Age must be a number.',
        );
      });
    });
    describe('name errors', () => {
      const badNameCat = { age: 5, breed: testBreed } as CatDTO;

      it('should throw an error for missing name', () => {
        const errorPipe = () => pipe.transform(badNameCat);
        expect(errorPipe).toThrowError(BadRequestException);
        expect(errorPipe).toThrowError(
          'Incoming cat is not formatted correctly. Name must be a string.',
        );
      });
      it(failString, () => {
        badNameCat.name = true as unknown as string;
        const errorPipe = () => pipe.transform(badNameCat);
        expect(errorPipe).toThrowError(BadRequestException);
        expect(errorPipe).toThrowError(
          'Incoming cat is not formatted correctly. Name must be a string.',
        );
      });
    });
    describe('breed errors', () => {
      const badBreedCat = { age: 5, name: 'Test Name' } as CatDTO;

      it('should throw an error for missing breed', () => {
        const errorPipe = () => pipe.transform(badBreedCat);
        expect(errorPipe).toThrowError(BadRequestException);
        expect(errorPipe).toThrowError(
          'Incoming cat is not formatted correctly. Breed must be a string.',
        );
      });
      it(failString, () => {
        badBreedCat.breed = true as unknown as string;
        const errorPipe = () => pipe.transform(badBreedCat);
        expect(errorPipe).toThrowError(BadRequestException);
        expect(errorPipe).toThrowError(
          'Incoming cat is not formatted correctly. Breed must be a string.',
        );
      });
    });
  });
});
