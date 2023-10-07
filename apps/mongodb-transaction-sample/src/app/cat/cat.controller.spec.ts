import { Test } from '@nestjs/testing';
import { CatController } from './cat.controller';
import { CatService } from './cat.service';
import { ICat, TCatDeleteRes, TCatPostRes } from './interface/cat.interface';

const cats: ICat[] = [
  {
    id: 1,
    name: 'Test Cat',
    age: 3,
    breed: 'Arabian',
  },
];

describe('CatController', () => {
  let controller: CatController;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [CatController],
    })
      // alternative way to mock the functions
      .useMocker((token) => {
        if (token === CatService) {
          return {
            getAll: jest
              .fn<Promise<ICat[]>, []>()
              .mockImplementation(() => Promise.resolve(cats)),
            addCat: jest
              .fn<Promise<TCatPostRes>, [ICat]>()
              .mockImplementation((cat) => {
                if (cat.id === 1) {
                  // Simulate that transaction failed!
                  throw new Error('Transaction failed!');
                }

                cats.push(cat);
                return Promise.resolve({
                  message: 'Cat Created Successfully!',
                });
              }),
            updateCat: jest
              .fn<Promise<Partial<ICat>>, [cat: Partial<ICat>]>()
              .mockImplementation((cat) => {
                const catIdx = cats.findIndex((ct) => ct.id === cat.id);
                if (catIdx < 0) {
                  throw new Error('Transaction failed!');
                }

                const currentCat = cats[catIdx];
                cats[catIdx] = { ...currentCat, ...cat };
                return Promise.resolve(cats[catIdx]);
              }),
            deleteCat: jest
              .fn<Promise<TCatDeleteRes>, [string]>()
              .mockImplementation((id) => {
                const catIdx = cats.findIndex((ct) => ct.id === +id);
                if (catIdx < 0) {
                  throw new Error('Transaction failed!');
                }

                cats.splice(catIdx, 1);
                return Promise.resolve({
                  deleted: true,
                  message: 'Cat Deleted Successfully!',
                });
              }),
          };
        }
      })
      .compile();

    controller = module.get(CatController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getAll', () => {
    it(`should get all cats`, async () => {
      const allCats = await controller.getAllCats();
      expect(allCats).toBeDefined();
    });
  });

  describe(`addCat (Transaction Mocking)`, () => {
    it(`should create cat with transaction success`, async () => {
      const cat: ICat = {
        id: 2,
        name: 'Another Cat',
        age: 5,
        breed: 'Test Breed!',
      };

      const allCatsLength = (await controller.getAllCats()).length;
      const resultCat = await controller.addCat(cat);

      const updatedCatsLength = (await controller.getAllCats()).length;

      // Although, we don't need to check the new length, but for more clarification for test case
      expect(updatedCatsLength).toStrictEqual(allCatsLength + 1);
      expect(resultCat).toStrictEqual({
        message: 'Cat Created Successfully!',
      });
    });

    it(`should create cat with transaction fails when cat id is passed 1`, async () => {
      try {
        const cat: ICat = {
          id: 1,
          name: 'Another Cat',
          age: 5,
          breed: 'Test Breed!',
        };
        await controller.addCat(cat);
      } catch (error) {
        expect(error.message).toStrictEqual('Transaction failed!');
      }
    });
  });

  describe(`updateCat (Transaction Mocking)`, () => {
    it(`should update cat with transaction success`, async () => {
      const cat: ICat = {
        id: 1,
        name: 'Updated Cat Name',
        age: 4,
        breed: 'South Arabian',
      };

      const resultCat = await controller.updateCat(cat);
      expect(resultCat).toStrictEqual({
        id: 1,
        name: 'Updated Cat Name',
        age: 4,
        breed: 'South Arabian',
      });
    });

    it(`should transaction fails when cat id is incorrect`, async () => {
      try {
        const cat: ICat = {
          id: 2,
          name: 'Another Cat',
          age: 4,
          breed: 'South Arabian',
        };
        await controller.updateCat(cat);
      } catch (error) {
        expect(error.message).toStrictEqual('Transaction failed!');
      }
    });
  });

  describe(`deleteCat (Transaction Mocking)`, () => {
    it(`should delete cat with transaction success`, async () => {
      const catId = '1'; // string because mongodb _id is ObjectId string under the hood

      const deletedCat = await controller.deleteCat(catId);
      expect(deletedCat).toStrictEqual({
        deleted: true,
        message: 'Cat Deleted Successfully!',
      });
    });

    it(`should transaction fails when cat id is incorrect`, async () => {
      try {
        const catId = '1';
        await controller.deleteCat(catId);
      } catch (error) {
        expect(error.message).toStrictEqual('Transaction failed!');
      }
    });
  });
});
