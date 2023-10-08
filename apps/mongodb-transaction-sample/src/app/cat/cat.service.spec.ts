import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import mongoose, { ClientSession, Model } from 'mongoose';
import { CatService } from './cat.service';
import { CatDoc } from './interface/cat-doc';
import { ICat } from './interface/cat.interface';

const cats: ICat[] = [
  {
    id: 1,
    name: 'Test Cat',
    age: 3,
    breed: 'Arabian',
  },
];

describe('CatService', () => {
  let service: CatService;
  let model: Model<CatDoc>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CatService],
    })
      .useMocker((token) => {
        if (token === getModelToken('Cat')) {
          return {
            create: jest.fn(),
            find: () => ({ lean: jest.fn().mockResolvedValueOnce(cats) }),
            findOneAndUpdate: jest.fn(),
            findOneAndRemove: jest.fn(),
          };
        }
      })
      .compile();

    service = module.get(CatService);
    model = module.get(getModelToken('Cat'));
  });

  afterEach(() => jest.clearAllMocks());

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe(`getAll`, () => {
    it(`should get all gets in service`, async () => {
      const allCats = await service.getAll();
      expect(allCats.length).toStrictEqual(1);
    });
  });

  describe(`addCat`, () => {
    it(`should create cat with transaction success`, async () => {
      const cat: ICat = {
        id: 2,
        name: 'Another Cat',
        age: 5,
        breed: 'Test Breed!',
      };

      jest.spyOn(mongoose, 'startSession').mockResolvedValueOnce({
        withTransaction: jest.fn(async (fn) => await fn()), // execute the withTransaction function callback, check in service.ts
        endSession: jest.fn(),
      } as unknown as ClientSession);

      jest
        .spyOn(model, 'create')
        .mockImplementation(() => Promise.resolve(cats[0]));

      const result = await service.addCat(cat);
      expect(result.message).toStrictEqual('Cat created successfully!');
    });

    it(`should create cat with transaction fails when cat id is passed 1`, async () => {
      try {
        const cat: ICat = {
          id: 1,
          name: 'Another Cat',
          age: 5,
          breed: 'Test Breed!',
        };

        jest.spyOn(mongoose, 'startSession').mockResolvedValueOnce({
          withTransaction: jest
            .fn(async (fn) => await fn())
            .mockRejectedValueOnce('Transaction failed!'),
          endSession: jest.fn(),
        } as unknown as ClientSession);

        await service.addCat(cat);
      } catch (error) {
        expect(error.message).toStrictEqual('Transaction cancel!');
      }
    });
  });

  describe(`updateCat`, () => {
    it(`should update cat with transaction success`, async () => {
      const cat: Partial<ICat> = {
        id: 1,
        name: 'Updated Cat',
      };

      jest.spyOn(mongoose, 'startSession').mockResolvedValueOnce({
        withTransaction: jest.fn(async (fn) => await fn()),
        endSession: jest.fn(),
      } as unknown as ClientSession);

      jest
        .spyOn(model, 'findOneAndUpdate')
        .mockResolvedValueOnce({ ...cats[0], ...cat });

      const updatedCat = await service.updateCat(cat);
      expect(updatedCat).toStrictEqual({
        id: 1,
        name: 'Updated Cat',
        age: 3,
        breed: 'Arabian',
      });
    });

    it(`should transaction failed while updating the cat`, async () => {
      try {
        const cat: ICat = {
          id: 1,
          name: 'Another Cat',
          age: 5,
          breed: 'Test Breed!',
        };

        jest.spyOn(mongoose, 'startSession').mockResolvedValueOnce({
          withTransaction: jest
            .fn()
            .mockRejectedValueOnce('Transaction failed!'),
          endSession: jest.fn(),
        } as unknown as ClientSession);

        await service.updateCat(cat);
      } catch (error) {
        expect(error.message).toStrictEqual('Transaction cancel!');
      }
    });
  });

  describe(`deleteCat`, () => {
    it(`should delete cat with transaction success`, async () => {
      const catId = '1';

      jest.spyOn(mongoose, 'startSession').mockResolvedValueOnce({
        withTransaction: jest.fn(async (fn) => await fn()),
        endSession: jest.fn(),
      } as unknown as ClientSession);

      jest
        .spyOn(model, 'findOneAndRemove')
        .mockResolvedValueOnce({ ...cats[0], id: catId });

      const deletedCat = await service.deleteCat(catId);
      expect(deletedCat).toStrictEqual({
        deleted: true,
        message: 'Cat Deleted!',
      });
    });

    it(`should transaction failed while deleting the cat`, async () => {
      try {
        const catId = '1';

        jest.spyOn(mongoose, 'startSession').mockResolvedValueOnce({
          withTransaction: jest
            .fn()
            .mockRejectedValueOnce('Transaction failed!'),
          endSession: jest.fn(),
        } as unknown as ClientSession);

        await service.deleteCat(catId);
      } catch (error) {
        expect(error.message).toStrictEqual('Transaction cancel!');
      }
    });
  });
});
