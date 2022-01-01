import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cat } from './entities/cat.entity';
import { CatService } from './cat.service';
import { of } from 'rxjs';

const testCat1 = 'Test Cat 1';
const testBreed1 = 'Test Breed 1';

const catArray = [
  new Cat(testCat1, testBreed1, 4),
  new Cat('Test Cat 2', 'Test Breed 2', 3),
  new Cat('Test Cat 3', 'Test Breed 3', 2),
];

const oneCat = new Cat(testCat1, testBreed1, 4);

describe('CatService', () => {
  let service: CatService;
  let repo: Repository<Cat>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CatService,
        {
          provide: getRepositoryToken(Cat),
          useValue: {
            find: jest.fn(() => of(catArray)),
            findOne: jest.fn(() => of(oneCat)),
            create: jest.fn(() => of(oneCat)),
            save: jest.fn(() => of()),
            update: jest.fn(() => of()),
            delete: jest.fn(() => of()),
          },
        },
      ],
    }).compile();

    service = module.get<CatService>(CatService);
    repo = module.get<Repository<Cat>>(getRepositoryToken(Cat));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  describe('findAll()', () => {
    it('should return an array of cats', () => {
      service.findAll().subscribe((cats) => {
        expect(cats).toEqual(catArray);
      });
    });
  });

  describe('findOne()', () => {
    it('should get a single cat', () => {
      const repoSpy = jest.spyOn(repo, 'findOne');
      service.findOne('a uuid').subscribe((cat) => {
        expect(cat).toEqual(oneCat);
        expect(repoSpy).toBeCalledWith({ id: 'a uuid' });
      });
    });
  });

  describe('create()', () => {
    it('should successfully insert a cat', () => {
      service
        .create({
          name: testCat1,
          breed: testBreed1,
          age: 4,
        })
        .subscribe((cat) => {
          expect(cat).toEqual(oneCat);
          expect(repo.create).toBeCalledTimes(1);
          expect(repo.create).toBeCalledWith({
            name: testCat1,
            breed: testBreed1,
            age: 4,
          });
          expect(repo.save).toBeCalledTimes(1);
        });
    });
  });
  describe('update()', () => {
    it('should call the update method', () => {
      service
        .update('a uuid', {
          name: testCat1,
          breed: testBreed1,
          age: 4,
        })
        .subscribe((cat) => {
          expect(cat).toEqual(oneCat);
          expect(repo.update).toBeCalledTimes(1);
          expect(repo.update).toBeCalledWith(
            { id: 'a uuid' },
            { name: testCat1, breed: testBreed1, age: 4, id: 'a uuid' },
          );
        });
    });
  });
  describe('delete()', () => {
    it('should call the delete method ', () => {
      service.delete('a uuid').subscribe((res) => {
        expect(res).toBeUndefined();
        expect(res).toHaveBeenCalled();
      });
    });
  });
});
