import { createMock } from '@golevelup/ts-jest';
import { Test, TestingModule } from '@nestjs/testing';
import { CatController } from './cat.controller';
import { CatDTO } from './cat.dto';
import { CatService } from './cat.service';
import { Cat } from './interfaces/cat.interface';

const testCat1 = 'Test Cat 1';
const testBreed1 = 'Test Breed 1';

describe('Cat Controller', () => {
  let controller: CatController;
  let service: CatService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CatController],
      // If you've looked at the complex sample you'll notice that these functions
      // are a little bit more in depth using mock implementation
      // to give us a little bit more control and flexibility in our tests
      // this is not necessary, but can sometimes be helpful in a test scenario
      providers: [
        {
          provide: CatService,
          useValue: {
            getAll: jest.fn<CatDTO[], unknown[]>().mockImplementation(() => [
              { name: testCat1, breed: testBreed1, age: 4 },
              { name: 'Test Cat 2', breed: 'Test Breed 2', age: 3 },
              { name: 'Test Cat 3', breed: 'Test Breed 3', age: 2 },
            ]),
            getOne: jest
              .fn<Promise<CatDTO>, string[]>()
              .mockImplementation((id) =>
                Promise.resolve({
                  name: testCat1,
                  breed: testBreed1,
                  age: 4,
                  _id: id,
                }),
              ),
            getOneByName: jest
              .fn<Promise<CatDTO>, string[]>()
              .mockImplementation((name) => {
                return Promise.resolve({ name, breed: testBreed1, age: 4 });
              }),
            insertOne: jest
              .fn<Promise<CatDTO>, CatDTO[]>()
              .mockImplementation((cat) =>
                Promise.resolve({ _id: 'a uuid', ...cat }),
              ),
            updateOne: jest
              .fn<Promise<CatDTO>, CatDTO[]>()
              .mockImplementation((cat) =>
                Promise.resolve({ _id: 'a uuid', ...cat }),
              ),
            deleteOne: jest
              .fn<{ deleted: boolean }, unknown[]>()
              .mockImplementation(() => ({ deleted: true })),
          },
        },
      ],
    }).compile();

    controller = module.get(CatController);
    service = module.get(CatService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getCats', () => {
    it('should get an array of cats', () => {
      expect(controller.getCats()).resolves.toEqual([
        {
          name: testCat1,
          breed: testBreed1,
          age: 4,
        },
        {
          name: 'Test Cat 2',
          breed: 'Test Breed 2',
          age: 3,
        },
        {
          name: 'Test Cat 3',
          breed: 'Test Breed 3',
          age: 2,
        },
      ]);
    });
  });
  describe('getById', () => {
    it('should get a single cat', () => {
      expect(controller.getById('a strange id')).resolves.toEqual({
        name: testCat1,
        breed: testBreed1,
        age: 4,
        _id: 'a strange id',
      });
      expect(controller.getById('a different id')).resolves.toEqual({
        name: testCat1,
        breed: testBreed1,
        age: 4,
        _id: 'a different id',
      });
    });
  });
  describe('getByName', () => {
    it('should get a cat back', async () => {
      await expect(controller.getByName('Ventus')).resolves.toEqual({
        name: 'Ventus',
        breed: testBreed1,
        age: 4,
      });
      // using the really cool @golevelup/ts-jest module's utility function here
      // otherwise we need to pass `as any` or we need to mock all 54+ attributes of Document
      const aquaMock = createMock<Cat>({
        name: 'Aqua',
        breed: 'Maine Coon',
        age: 5,
      });
      const getByNameSpy = jest
        .spyOn(service, 'getOneByName')
        .mockResolvedValueOnce(aquaMock);
      const getResponse = await controller.getByName('Aqua');
      expect(getResponse).toEqual(aquaMock);
      expect(getByNameSpy).toBeCalledWith('Aqua');
    });
  });
  describe('newCat', () => {
    it('should create a new cat', () => {
      const newCatDTO: CatDTO = {
        name: 'New Cat 1',
        breed: 'New Breed 1',
        age: 4,
      };
      expect(controller.newCat(newCatDTO)).resolves.toEqual({
        _id: 'a uuid',
        ...newCatDTO,
      });
    });
  });
  describe('updateCat', () => {
    it('should update a new cat', () => {
      const newCatDTO: CatDTO = {
        name: 'New Cat 1',
        breed: 'New Breed 1',
        age: 4,
      };
      expect(controller.updateCat(newCatDTO)).resolves.toEqual({
        _id: 'a uuid',
        ...newCatDTO,
      });
    });
  });
  describe('deleteCat', () => {
    it('should return that it deleted a cat', () => {
      expect(controller.deleteCat('a uuid that exists')).resolves.toEqual({
        deleted: true,
      });
    });
    it('should return that it did not delete a cat', () => {
      const deleteSpy = jest
        .spyOn(service, 'deleteOne')
        .mockResolvedValueOnce({ deleted: false });
      expect(
        controller.deleteCat('a uuid that does not exist'),
      ).resolves.toEqual({ deleted: false });
      expect(deleteSpy).toBeCalledWith('a uuid that does not exist');
    });
  });
});
