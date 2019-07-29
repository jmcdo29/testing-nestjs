import { CatDTO } from './cats.dto';

describe('CatDTO', () => {
  it('should create a catDTO object', () => {
    expect(new CatDTO('Test Cat 1', 'Test Breed 1', 3)).toEqual(
      new CatDTO('Test Cat 1', 'Test Breed 1', 3),
    );
  });
});
