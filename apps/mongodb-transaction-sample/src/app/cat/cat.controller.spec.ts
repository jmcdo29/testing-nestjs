import { Test } from '@nestjs/testing';
import { CatController } from './cat.controller';
import { CatService } from './cat.service';
import { ICat } from './interface/cat.interface';

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
  let service: CatService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [CatController],
      // providers: [
      //   {
      //     provide: CatService,
      //     useValue: {
      //       getAll: jest.fn(),
      //       // addCat: 1,
      //     },
      //   },
      // ],
    })
      .useMocker((token) => {
        if (token === CatService) {
          // console.log(
          //   'Yes token is catService dont know why',
          //   token.toString(),
          // );
          return {
            getAll: jest
              .fn<Promise<ICat[]>, []>()
              .mockImplementation(() => Promise.resolve(cats)),
            addCat: jest.fn<ICat, [ICat]>().mockImplementation((cat) => {
              // const allCats = [...cats];
              if (cat.id === 1) {
                // Simulate that transaction failed!
                throw new Error('Transaction failed!');
              }

              cats.push(cat);
              return cats[cats.length - 1];
            }),
          };
        }
        // if (typeof token === 'function') {
        //   const mockMetadata = moduleMocker.getMetadata(token) as MockFunctionMetadata<any, any>;
        //   const Mock = moduleMocker.generateFromMetadata(mockMetadata);
        //   return new Mock();
        // }
      })
      .compile();

    controller = module.get(CatController);
    service = module.get(CatService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getAll', () => {
    it(`should get all cats`, async () => {
      const allCats = await controller.getAllCats();
      console.log('All Cats', allCats);
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

      const resultCat = await controller.addCat(cat);
      const allCats = await controller.getAllCats();

      expect(allCats[allCats.length - 1]).toStrictEqual(resultCat);
    });

    it(`should create cat with transaction fails when cat id is passed 1`, async () => {
      let catsLengh = 0;
      try {
        const cat: ICat = {
          id: 1,
          name: 'Another Cat',
          age: 5,
          breed: 'Test Breed!',
        };

        catsLengh = (await controller.getAllCats()).length;

        await controller.addCat(cat);
        // const allCats = await controller.getAllCats();
        // expect(allCats[allCats.length - 1]).toStrictEqual(resultCat);
      } catch (error) {
        const updatedCats = await controller.getAllCats();

        expect(updatedCats.length).toStrictEqual(catsLengh);
        expect(error.message).toStrictEqual('Transaction failed!');
      }
    });
  });
});
