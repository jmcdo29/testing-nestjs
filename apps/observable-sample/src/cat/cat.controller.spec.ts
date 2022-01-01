import { Test, TestingModule } from '@nestjs/testing';
import { CatController } from './cat.controller';
import { CatDTO } from './dto/cat.dto';
import { CatService } from './cat.service';
import { of } from 'rxjs';

const testCat1 = 'Test Cat #1';
const testBreed1 = 'Test Breed #1';

describe('Cat Controller', () => {
  let controller: CatController;
  let service: CatService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CatController],
      providers: [
        {
          provide: CatService,
          useValue: {
            findAll: jest.fn(() =>
              of([
                { name: 'Test Cat #1', breed: 'Test Breed #1', age: 3 },
                { name: 'Test Cat #2', breed: 'Test Breed #2', age: 2 },
              ]),
            ),
            findOne: jest.fn(() =>
              of((id: string) => ({
                name: testCat1,
                breed: testBreed1,
                age: 4,
                id,
              })),
            ),
            create: jest.fn(() =>
              of((cat: CatDTO) => ({ id: 'a uuid', ...cat })),
            ),
            update: jest.fn(() =>
              of((id: string, cat: CatDTO) => ({ id, ...cat })),
            ),
            delete: jest.fn(() => of()),
          },
        },
      ],
    }).compile();

    controller = module.get<CatController>(CatController);
    service = module.get<CatService>(CatService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getAllCats()', () => {
    it('should get an array of cats', () => {
      controller.getAllCats().subscribe((res) => {
        expect(res).toEqual([
          {
            name: 'Test Cat #1',
            breed: 'Test Breed #1',
            age: 3,
          },
          {
            name: 'Test Cat #2',
            breed: 'Test Breed #2',
            age: 2,
          },
        ]);
      });
    });
  });

  describe('getCatById()', () => {
    it('should get a single cat', () => {
      controller.getCatById('a id').subscribe((res) => {
        expect(res).toEqual({
          name: testCat1,
          breed: testBreed1,
          age: 4,
        });
        expect(controller.getCatById('a different id')).toEqual({
          name: testCat1,
          breed: testBreed1,
          age: 4,
        });
      });
    });
  });

  describe('newCat()', () => {
    it('should create a new cat', () => {
      const newCatDTO: CatDTO = {
        name: 'New Cat #1',
        breed: 'New Breed #1',
        age: 4,
      };
      controller.newCat(newCatDTO).subscribe((res) => {
        expect(res).toEqual({
          id: 'a uuid',
          ...newCatDTO,
        });
      });
    });
  });

  describe('updateCat()', () => {
    it('should update a cat', () => {
      const newCatDTO: CatDTO = {
        name: 'New Cat #1',
        breed: 'New Breed #1',
        age: 4,
      };
      controller.updateCat('a id', newCatDTO).subscribe((res) => {
        expect(res).toEqual({
          ...newCatDTO,
        });
      });
    });
  });
  describe('deleteCat()', () => {
    it('should return that it deleted a cat', () => {
      controller.deleteCat('a id').subscribe((res) => {
        expect(res).toBeUndefined();
        expect(res).toHaveBeenCalled();
      });
    });
  });
});
