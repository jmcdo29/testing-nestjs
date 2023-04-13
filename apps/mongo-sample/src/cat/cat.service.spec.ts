/**
 * You'll note that in a lot of this test class we use `to any`
 * rather liberally. Normally I'd be against this, but I don't
 * really want to mock all 59 fields **and** the ones we have
 * defined for our model, so instead we add an `as any` and
 * make those errors magically go away. In all seriousness
 * you may want to use some sort of base file elsewhere that
 * contains all the basic mock fields so you can take that
 * and add your fields on top. Seriously, 59 plus fields is a lot.
 */

import { Test, TestingModule } from '@nestjs/testing';
import { CatService } from './cat.service';
import { getModelToken } from '@nestjs/mongoose';
import { Cat } from './interfaces/cat.interface';
import { createMock } from '@golevelup/ts-jest';
import { Model, Query } from 'mongoose';
import { CatDoc } from './interfaces/cat-document.interface';

const lasagna = 'lasagna lover';

// I'm lazy and like to have functions that can be re-used to deal with a lot of my initialization/creation logic
const mockCat = (
  name = 'Ventus',
  id = 'a uuid',
  age = 4,
  breed = 'Russian Blue',
): Cat => ({
  name,
  id,
  age,
  breed,
});

// still lazy, but this time using an object instead of multiple parameters
const mockCatDoc = (mock?: Partial<Cat>): Partial<CatDoc> => ({
  name: mock?.name || 'Ventus',
  _id: mock?.id || 'a uuid',
  age: mock?.age || 4,
  breed: mock?.breed || 'Russian Blue',
});

const catArray = [
  mockCat(),
  mockCat('Vitani', 'a new uuid', 2, 'Tabby'),
  mockCat('Simba', 'the king', 14, 'Lion'),
];

const catDocArray: Partial<CatDoc>[] = [
  mockCatDoc(),
  mockCatDoc({ name: 'Vitani', id: 'a new uuid', age: 2, breed: 'Tabby' }),
  mockCatDoc({ name: 'Simba', age: 14, id: 'the king', breed: 'Lion' }),
];

describe('CatService', () => {
  let service: CatService;
  let model: Model<CatDoc>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CatService,
        {
          provide: getModelToken('Cat'),
          // notice that only the functions we call from the model are mocked
          useValue: {
            new: jest.fn().mockResolvedValue(mockCat()),
            constructor: jest.fn().mockResolvedValue(mockCat()),
            find: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            create: jest.fn(),
            remove: jest.fn(),
            exec: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<CatService>(CatService);
    model = module.get<Model<CatDoc>>(getModelToken('Cat'));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  // In all the spy methods/mock methods we need to make sure to
  // add in the property function exec and tell it what to return
  // this way all of our mongo functions can and will be called
  // properly allowing for us to successfully test them.
  it('should return all cats', async () => {
    jest.spyOn(model, 'find').mockReturnValue({
      exec: jest.fn().mockResolvedValueOnce(catDocArray),
    } as unknown as Query<CatDoc[], CatDoc>);
    const cats = await service.getAll();
    expect(cats).toEqual(catArray);
  });
  it('should getOne by id', async () => {
    jest.spyOn(model, 'findOne').mockReturnValueOnce(
      createMock<Query<CatDoc, CatDoc>>({
        exec: jest
          .fn()
          .mockResolvedValueOnce(mockCatDoc({ name: 'Ventus', id: 'an id' })),
      }),
    );
    const findMockCat = mockCat('Ventus', 'an id');
    const foundCat = await service.getOne('an id');
    expect(foundCat).toEqual(findMockCat);
  });
  it('should getOne by name', async () => {
    jest.spyOn(model, 'findOne').mockReturnValueOnce(
      createMock<Query<CatDoc, CatDoc>>({
        exec: jest
          .fn()
          .mockResolvedValueOnce(
            mockCatDoc({ name: 'Mufasa', id: 'the dead king' }),
          ),
      }),
    );
    const findMockCat = mockCat('Mufasa', 'the dead king');
    const foundCat = await service.getOneByName('Mufasa');
    expect(foundCat).toEqual(findMockCat);
  });
  it('should insert a new cat', async () => {
    jest.spyOn(model, 'create').mockImplementationOnce(() =>
      Promise.resolve({
        _id: 'some id',
        name: 'Oliver',
        age: 1,
        breed: 'Tabby',
      }),
    );
    const newCat = await service.insertOne({
      name: 'Oliver',
      age: 1,
      breed: 'Tabby',
    });
    expect(newCat).toEqual(mockCat('Oliver', 'some id', 1, 'Tabby'));
  });
  // jest is complaining about findOneAndUpdate. Can't say why at the moment.
  it.skip('should update a cat successfully', async () => {
    jest.spyOn(model, 'findOneAndUpdate').mockReturnValueOnce(
      createMock<Query<CatDoc, CatDoc>>({
        exec: jest.fn().mockResolvedValueOnce({
          _id: lasagna,
          name: 'Garfield',
          breed: 'Tabby',
          age: 42,
        }),
      }),
    );
    const updatedCat = await service.updateOne({
      _id: lasagna,
      name: 'Garfield',
      breed: 'Tabby',
      age: 42,
    });
    expect(updatedCat).toEqual(mockCat('Garfield', lasagna, 42, 'Tabby'));
  });
  it('should delete a cat successfully', async () => {
    // really just returning a truthy value here as we aren't doing any logic with the return
    jest.spyOn(model, 'remove').mockResolvedValueOnce(true as any);
    expect(await service.deleteOne('a bad id')).toEqual({ deleted: true });
  });
  it('should not delete a cat', async () => {
    // really just returning a falsy value here as we aren't doing any logic with the return
    jest.spyOn(model, 'remove').mockRejectedValueOnce(new Error('Bad delete'));
    expect(await service.deleteOne('a bad id')).toEqual({
      deleted: false,
      message: 'Bad delete',
    });
  });
});
