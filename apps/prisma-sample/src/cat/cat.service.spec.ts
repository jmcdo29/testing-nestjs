import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma/prisma.service';
import { CatService } from './cat.service';
import { v4 as uuidv4 } from 'uuid';

const testCat1 = 'Test Cat 1';
const testBreed1 = 'Test Breed 1';
const ownerId = uuidv4();

const catArray = [
  { name: testCat1, breed: testBreed1, age: 4, ownerId },
  { name: 'Test Cat 2', breed: 'Test Breed 2', age: 3, ownerId },
  { name: 'Test Cat 3', breed: 'Test Breed 3', age: 2, ownerId },
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

  describe('insertOne', () => {
    it('should successfully insert a cat', () => {
      expect(
        service.insertOne({
          name: testCat1,
          breed: testBreed1,
          age: 4,
          ownerId,
        }),
      ).resolves.toEqual(oneCat);
    });
  });

  describe('updateOne', () => {
    it('should call the update method', async () => {
      const cat = await service.updateOne('a uuid', {
        name: testCat1,
        breed: testBreed1,
        age: 4,
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
