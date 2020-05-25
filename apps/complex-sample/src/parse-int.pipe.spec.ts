import { ParseIntPipe } from './parse-int.pipe';
import { BadRequestException } from '@nestjs/common';

describe('ParseIntPipe', () => {
  let pipe: ParseIntPipe;

  beforeEach(() => {
    pipe = new ParseIntPipe();
  });
  it('should be defined', () => {
    expect(pipe).toBeDefined();
  });
  describe('successful calls', () => {
    for (let i = 0; i < 10; i++) {
      it('should return a random number (just for the sake of being thorough)', () => {
        const randomNumber = Math.floor(Math.random() * 1000) % 1000;
        expect(pipe.transform(randomNumber.toString())).toBe(randomNumber);
      });
    }
  });
  describe('unsuccessful calls', () => {
    it('should throw an error if given a non-number string', () => {
      expect(() => pipe.transform('true')).toThrowError(BadRequestException);
      expect(() => pipe.transform('true')).toThrowError(
        'Id parameter should be a number.',
      );
    });
  });
});
