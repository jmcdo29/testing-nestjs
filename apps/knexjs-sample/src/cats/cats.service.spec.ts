import { Test } from '@nestjs/testing';
import { CatsService } from './cats.service';

const testCat = { name: 'Test', age: 5, breed: 'Russian Blue' };

const mockCat = {
  name: 'Test',
  age: 5,
  breed: 'Russian Blue',
};

const oneCat = {
  name: 'Test',
  age: 1,
  breed: 'Russian Red',
};

describe('CatsService', () => {
  let service: CatsService;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        CatsService,
        {
          provide: CatsService,
          useValue: {
            knex: {
              table: () => {
                where: jest.fn(() => [testCat]);
              },
            },
          },
        },
      ],
    }).compile();
    service = modRef.get(CatsService);
  });

  it('should get the cats', async () => {
    expect(await service.findAllCat()).toEqual([testCat]);
  });

  it('should get one cat', async () => {
    jest.spyOn(service as any, 'where');
    const catFound = await service.findOneCat(1);
    expect(service.findOneCat).toHaveBeenCalledWith(1);
    expect(catFound).toBe(oneCat);
  });

  it('should add a cat', async () => {
    const newcat = jest.spyOn(service as any, 'insert');
    expect(newcat).toEqual(testCat);
  });
});
