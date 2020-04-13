import { Cat } from './cat.entity';

describe('Cat class', () => {
  it('should make a cat with no fields', () => {
    const cat = new Cat();
    expect(cat).toBeTruthy();
    expect(cat.name).toBe('');
    expect(cat.breed).toBe('');
    expect(cat.age).toBe(NaN);
  });
  it('should make a cat with name only', () => {
    const cat = new Cat('Test');
    expect(cat).toBeTruthy();
    expect(cat.name).toBe('Test');
    expect(cat.breed).toBe('');
    expect(cat.age).toBe(NaN);
  });
  it('should make a cat with name and breed', () => {
    const cat = new Cat('Test', 'Breed');
    expect(cat).toBeTruthy();
    expect(cat.name).toBe('Test');
    expect(cat.breed).toBe('Breed');
    expect(cat.age).toBe(NaN);
  });
  it('should make a cat with name breed and age', () => {
    const cat = new Cat('Test', 'Breed', 4);
    expect(cat).toBeTruthy();
    expect(cat.name).toBe('Test');
    expect(cat.breed).toBe('Breed');
    expect(cat.age).toBe(4);
  });
});
