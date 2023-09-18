import { Test } from '@nestjs/testing';
import { v4 as uuidv4 } from 'uuid';
import { CatController } from './cat.controller';
import { CatDTO, TCat } from './cat.dto';
import { CatService } from './cat.service';

const catId = uuidv4();
const testCat1 = 'Test Cat 1';
const testBreed1 = 'Test Breed 1';
const ownerId = uuidv4();

describe('Cat Controller', () => {
  let controller: CatController;
  let service: CatService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [CatController],
      // If you've looked at the complex sample you'll notice that these functions
      // are a little bit more in depth using mock implementation
      // to give us a little bit more control and flexibility in our tests
      // this is not necessary, but can sometimes be helpful in a test scenario
      providers: [
        {
          provide: CatService,
          useValue: {
            getAll: jest.fn<CatDTO[], []>().mockImplementation(() => [
              { name: testCat1, breed: testBreed1, age: 4, ownerId },
              {
                name: 'Test Cat 2',
                breed: 'Test Breed 2',
                age: 3,
                ownerId,
              },
              {
                name: 'Test Cat 3',
                breed: 'Test Breed 3',
                age: 2,
                ownerId,
              },
            ]),
            getOne: jest
              .fn<Promise<TCat>, [string]>()
              .mockImplementation((id) =>
                Promise.resolve({
                  name: testCat1,
                  breed: testBreed1,
                  age: 4,
                  ownerId,
                  id,
                }),
              ),
            insertOne: jest
              .fn<Promise<TCat>, [CatDTO]>()
              .mockImplementation((cat) =>
                Promise.resolve({ id: catId, ...cat }),
              ),
            updateOne: jest
              .fn<Promise<TCat>, [string, CatDTO]>()
              .mockImplementation((id, cat) => Promise.resolve({ id, ...cat })),
            deleteOne: jest
              .fn<{ deleted: boolean }, []>()
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
    it('should get an array of cats', async () => {
      await expect(controller.getCats()).resolves.toEqual([
        {
          name: testCat1,
          breed: testBreed1,
          age: 4,
          ownerId: ownerId,
        },
        {
          name: 'Test Cat 2',
          breed: 'Test Breed 2',
          age: 3,
          ownerId: ownerId,
        },
        {
          name: 'Test Cat 3',
          breed: 'Test Breed 3',
          age: 2,
          ownerId: ownerId,
        },
      ]);
    });
  });
  describe('getById', () => {
    it('should get a single cat', async () => {
      await expect(controller.getById('a strange id')).resolves.toEqual({
        name: testCat1,
        breed: testBreed1,
        age: 4,
        id: 'a strange id',
        ownerId,
      });
      await expect(controller.getById('a different id')).resolves.toEqual({
        name: testCat1,
        breed: testBreed1,
        age: 4,
        id: 'a different id',
        ownerId,
      });
    });
  });
  describe('newCat', () => {
    it('should create a new cat', async () => {
      const newCatDTO: CatDTO = {
        name: 'New Cat 1',
        breed: 'New Breed 1',
        age: 4,
        ownerId,
      };
      await expect(controller.newCat(newCatDTO)).resolves.toEqual({
        id: catId,
        ...newCatDTO,
      });
    });
  });
  describe('updateCat', () => {
    it('should update a cat', async () => {
      const newCatDTO: CatDTO = {
        name: 'New Cat 1',
        breed: 'New Breed 1',
        age: 4,
        ownerId,
      };
      await expect(controller.updateCat(catId, newCatDTO)).resolves.toEqual({
        id: catId,
        ...newCatDTO,
      });
    });
  });
  describe('deleteCat', () => {
    it('should return that it deleted a cat', async () => {
      await expect(controller.deleteCat('a uuid that exists')).resolves.toEqual(
        {
          deleted: true,
        },
      );
    });
    it('should return that it did not delete a cat', async () => {
      const deleteSpy = jest
        .spyOn(service, 'deleteOne')
        .mockResolvedValueOnce({ deleted: false });
      await expect(
        controller.deleteCat('a uuid that does not exist'),
      ).resolves.toEqual({ deleted: false });
      expect(deleteSpy).toBeCalledWith('a uuid that does not exist');
    });
  });
});
