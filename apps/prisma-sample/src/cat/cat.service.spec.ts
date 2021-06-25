import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PrismaService } from '../prisma/prisma.service';
import { CatService } from './cat.service';

const testCat1 = 'Test Cat 1';
const testBreed1 = 'Test Breed 1';

const catArray = [
  { name: testCat1, breed: testBreed1, age: 4 },
  { name: 'Test Cat 2', breed: 'Test Breed 2', age: 3 },
  { name: 'Test Cat 3', breed: 'Test Breed 3', age: 2 },
];

const oneCat = catArray[0];

const db = {
  cat: {
    findMany: jest.fn().mockResolvedValue(catArray),
    findUnique: jest.fn().mockResolvedValue(oneCat),
    findFirst: jest.fn().mockResolvedValue(oneCat),
    create: jest.fn().mockReturnValue(oneCat),
    save: jest.fn(),
    update: jest.fn().mockResolvedValue(oneCat),
    // as these do not actually use their return values in our sample
    // we just make sure that their resolve is true to not crash
    delete: jest.fn().mockResolvedValue(oneCat),
  },
};

describe('CatService', () => {
  let service: CatService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CatService,
        {
          provide: PrismaService,
          useValue: db,
        },
      ],
    }).compile();

    service = module.get<CatService>(CatService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  describe('getAll', () => {
    it('should return an array of cats', async () => {
      const cats = await service.getAll();
      expect(cats).toEqual(catArray);
    });
  });
  describe('getOne', () => {
    it('should get a single cat', () => {
      expect(service.getOne('a uuid')).resolves.toEqual(oneCat);
    });
  });
  describe('getOneByName', () => {
    it('should get one cat', () => {
      expect(service.getOneByName(testCat1)).resolves.toEqual(oneCat);
    });
  });
  describe('insertOne', () => {
    it('should successfully insert a cat', () => {
      expect(
        service.insertOne({
          name: testCat1,
          breed: testBreed1,
          age: 4,
        }),
      ).resolves.toEqual(oneCat);
    });
  });
  describe('updateOne', () => {
    it('should call the update method', async () => {
      const cat = await service.updateOne({
        name: testCat1,
        breed: testBreed1,
        age: 4,
        id: 'a uuid',
      });
      expect(cat).toEqual(oneCat);
    });
  });
  describe('deleteOne', () => {
    it('should return {deleted: true}', () => {
      expect(service.deleteOne('a uuid')).resolves.toEqual({ deleted: true });
    });
    it('should return {deleted: false, message: err.message}', () => {
      const dbSpy = jest
        .spyOn(prisma.cat, 'delete')
        .mockRejectedValueOnce(new Error('Bad Delete Method.'));
      expect(service.deleteOne('a bad uuid')).resolves.toEqual({
        deleted: false,
        message: 'Bad Delete Method.',
      });
    });
  });
});
