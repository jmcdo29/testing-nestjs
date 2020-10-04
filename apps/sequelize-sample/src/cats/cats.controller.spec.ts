import { Test } from '@nestjs/testing';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';

const testCat = { id: 1, name: 'Test cat', age: 5, breed: 'Russian Blue' };

describe('CatsController', () => {
  let controller: CatsController;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      controllers: [CatsController],
      providers: [
        {
          provide: CatsService,
          useValue: {
            getCats: jest.fn(() => [testCat]),
            addCat: jest.fn(() => testCat),
          },
        },
      ],
    }).compile();
    controller = modRef.get(CatsController);
  });

  it('should get the cats', async () => {
    expect(await controller.getCats()).toEqual([testCat]);
  });
  it('should make a new cat', async () => {
    expect(
      await controller.newCat({
        name: 'Test Cat',
        age: 5,
        breed: 'Russian Blue',
      }),
    ).toEqual(testCat);
  });
});
