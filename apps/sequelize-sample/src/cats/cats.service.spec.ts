import { Test } from '@nestjs/testing';
import { getModelToken } from '@nestjs/sequelize';
import { Cat } from './cat.model';
import { CatsService } from './cats.service';

const testCat = { name: 'Test', age: 5, breed: 'Russian Blue' };

describe('CatsService', () => {
  let service: CatsService;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        CatsService,
        {
          provide: getModelToken(Cat),
          useValue: {
            findAll: jest.fn(() => [testCat]),
            create: jest.fn(() => testCat),
          },
        },
      ],
    }).compile();
    service = modRef.get(CatsService);
  });

  it('should get the cats', async () => {
    expect(await service.getCats()).toEqual([testCat]);
  });
  it('should add a cat', async () => {
    expect(
      await service.addCat({ name: 'Test', age: 5, breed: 'Russian Blue' }),
    ).toEqual(testCat);
  });
});
