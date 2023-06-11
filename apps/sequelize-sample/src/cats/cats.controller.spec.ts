import { Test } from '@nestjs/testing';
import { Cat } from './cat.model';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';

const testCat = { id: 1, name: 'Test cat', age: 5, breed: 'Russian Blue' };

describe('CatsController', () => {
  let controller: CatsController;
  let service: CatsService;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      controllers: [CatsController],
      providers: [
        {
          provide: CatsService,
          useValue: {
            getCats: jest.fn(() => [testCat]),
            addCat: jest.fn(() => testCat),
            getCat: jest.fn().mockImplementation((id: string) =>
              Promise.resolve({
                name: 'Test Cat',
                age: 5,
                breed: 'Russian Blue',
                id,
              }),
            ),
            removeCat: jest.fn(),
            updateCat: jest
              .fn()
              .mockImplementation((id: string, cat: Partial<Cat>) =>
                Promise.resolve({
                  name: 'Test Cat',
                  age: 5,
                  breed: 'Russian Blue',
                  id,
                  ...cat,
                }),
              ),
          },
        },
      ],
    }).compile();
    controller = modRef.get(CatsController);
    service = modRef.get<CatsService>(CatsService);
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

  it('should find a cat', async () => {
    await controller.findOne('a id');
    expect(service.getCat).toHaveBeenCalled();
    expect(controller.findOne('a id')).resolves.toEqual({
      name: 'Test Cat',
      age: 5,
      breed: 'Russian Blue',
      id: 'a id',
    });
  });

  it('should remove the cat', async () => {
    await controller.remove('anyid');
    expect(service.removeCat).toHaveBeenCalled();
  });

  it('should update the cat', async () => {
    const cat = await controller.update('1', { name: 'Siemans', age: 23 });
    expect(cat).toEqual({
      id: '1',
      name: 'Siemans',
      age: 23,
      breed: 'Russian Blue',
    });
    expect(service.updateCat).toHaveBeenCalled();
  });
});
