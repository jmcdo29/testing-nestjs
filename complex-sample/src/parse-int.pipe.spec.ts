import { ParseIntPipe } from './parse-int.pipe';

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
        expect(pipe.transform(randomNumber.toString(), {} as any)).toBe(
          randomNumber,
        );
      });
    }
  });
  describe('unsuccessful calls', () => {
    it('should throw an error if given a non-number string', () => {
      try {
        pipe.transform('true', {} as any);
      } catch (err) {
        expect(err.message.message).toBe('Id parameter should be a number.');
        expect(err.message.statusCode).toBe(400);
        expect(err.message.error).toBe('Bad Request');
      }
    });
  });
});
