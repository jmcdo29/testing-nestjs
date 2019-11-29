import { CatPipe } from './cat.pipe';
import { CatDTO } from './dto/cats.dto';

const metadata = {} as any;
const testBreed = 'Test Breed';
const badRequest = 'Bad Request';
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
      expect(pipe.transform(catDTO, metadata)).toEqual(catDTO);
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
        try {
          pipe.transform(badAgeCat as any, metadata);
        } catch (err) {
          expect(err.message.message).toBe(
            'Incoming cat is not formated correctly. Age must be a number.',
          );
          expect(err.message.statusCode).toBe(400);
          expect(err.message.error).toBe(badRequest);
        }
      });
      it(failString, () => {
        try {
          badAgeCat.age = '5' as any;
          pipe.transform(badAgeCat, metadata);
        } catch (err) {
          expect(err.message.message).toBe(
            'Incoming cat is not formated correctly. Age must be a number.',
          );
          expect(err.message.statusCode).toBe(400);
          expect(err.message.error).toBe(badRequest);
        }
      });
    });
    describe('name errors', () => {
      const badNameCat: CatDTO = {
        age: 5,
        breed: testBreed,
      } as any;
      it('should throw an error for missing name', () => {
        try {
          pipe.transform(badNameCat as any, metadata);
        } catch (err) {
          expect(err.message.message).toBe(
            'Incoming cat is not formated correctly. Name must be a string.',
          );
          expect(err.message.statusCode).toBe(400);
          expect(err.message.error).toBe(badRequest);
        }
      });
      it(failString, () => {
        try {
          badNameCat.name = true as any;
          pipe.transform(badNameCat as any, metadata);
        } catch (err) {
          expect(err.message.message).toBe(
            'Incoming cat is not formated correctly. Name must be a string.',
          );
          expect(err.message.statusCode).toBe(400);
          expect(err.message.error).toBe(badRequest);
        }
      });
    });
    describe('breed errors', () => {
      const badBreedCat: CatDTO = {
        age: 5,
        name: 'Test Name',
      } as any;
      it('should throw an error for missing breed', () => {
        try {
          pipe.transform(badBreedCat as any, metadata);
        } catch (err) {
          expect(err.message.message).toBe(
            'Incoming cat is not formated correctly. Breed must be a string.',
          );
          expect(err.message.statusCode).toBe(400);
          expect(err.message.error).toBe(badRequest);
        }
      });
      it(failString, () => {
        try {
          badBreedCat.breed = true as any;
          pipe.transform(badBreedCat as any, metadata);
        } catch (err) {
          expect(err.message.message).toBe(
            'Incoming cat is not formated correctly. Breed must be a string.',
          );
          expect(err.message.statusCode).toBe(400);
          expect(err.message.error).toBe(badRequest);
        }
      });
    });
  });
});
