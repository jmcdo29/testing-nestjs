import { CatDTO } from './cat.dto';

describe('CatDTO', () => {
  it('should create a catDTO object', () => {
    expect(
      new CatDTO({ name: 'Test Cat 1', breed: 'Test Breed 1', id: 3 }),
    ).toEqual(new CatDTO({ name: 'Test Cat 1', breed: 'Test Breed 1', id: 3 }));
  });
});
