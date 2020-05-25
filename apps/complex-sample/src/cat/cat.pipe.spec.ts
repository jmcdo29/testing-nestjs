import { CatPipe } from './cat.pipe';
import { CatDTO } from './dto/cats.dto';
import { BadRequestException } from '@nestjs/common';

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
   * You'll notice a ton of any types in here. That's because TypeScript
   * tries to keep you from setting the wrong value, but in these tests
   * we are wanting to test against the wrong value, hence overriding
   * the linter and compiler :)
   */
  describe('unsuccessful calls', () => {
    describe('age errors', () => {
      const badAgeCat: CatDTO = {
        name: 'Test Name',
        breed: testBreed,
      } as any;
      it('should throw an error for missing age', () => {
        const errorPipe = () => pipe.transform(badAgeCat as any);
        expect(errorPipe).toThrowError(BadRequestException);
        expect(errorPipe).toThrowError(
          'Incoming cat is not formatted correctly. Age must be a number.',
        );
      });
      it(failString, () => {
        badAgeCat.age = '5' as any;
        const errorPipe = () => pipe.transform(badAgeCat);
        expect(errorPipe).toThrowError(BadRequestException);
        expect(errorPipe).toThrowError(
          'Incoming cat is not formatted correctly. Age must be a number.',
        );
      });
    });
    describe('name errors', () => {
      const badNameCat: CatDTO = {
        age: 5,
        breed: testBreed,
      } as any;
      it('should throw an error for missing name', () => {
        const errorPipe = () => pipe.transform(badNameCat as any);
        expect(errorPipe).toThrowError(BadRequestException);
        expect(errorPipe).toThrowError(
          'Incoming cat is not formatted correctly. Name must be a string.',
        );
      });
      it(failString, () => {
        badNameCat.name = true as any;
        const errorPipe = () => pipe.transform(badNameCat);
        expect(errorPipe).toThrowError(BadRequestException);
        expect(errorPipe).toThrowError(
          'Incoming cat is not formatted correctly. Name must be a string.',
        );
      });
    });
    describe('breed errors', () => {
      const badBreedCat: CatDTO = {
        age: 5,
        name: 'Test Name',
      } as any;
      it('should throw an error for missing breed', () => {
        const errorPipe = () => pipe.transform(badBreedCat as any);
        expect(errorPipe).toThrowError(BadRequestException);
        expect(errorPipe).toThrowError(
          'Incoming cat is not formatted correctly. Breed must be a string.',
        );
      });
      it(failString, () => {
        badBreedCat.breed = true as any;
        const errorPipe = () => pipe.transform(badBreedCat);
        expect(errorPipe).toThrowError(BadRequestException);
        expect(errorPipe).toThrowError(
          'Incoming cat is not formatted correctly. Breed must be a string.',
        );
      });
    });
  });
});
