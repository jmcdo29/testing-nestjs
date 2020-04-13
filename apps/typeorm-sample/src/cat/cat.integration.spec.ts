/**
 * * Nest Modules
 */
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule, getRepositoryToken } from '@nestjs/typeorm';
import { getConnection, Repository, DatabaseType } from 'typeorm';

/**
 * * Services
 */
import { CatService } from './cat.service';

/**
 * * Entities
 */
import { Cat } from './cat.entity';

/**
 * * Modules
 */
import { CatModule } from './cat.module';
import { CatDTO } from './cat.dto';

/**
 * * Dependencies
 */
import * as faker from 'faker';

/**
 * Casting type as DatabaseType
 */
const postgresDatabase: DatabaseType = 'postgres';

/**
 * Making password a variable to bypass tslint checks
 */
const postgresPassword = 'root';

/**
 * Database Credentials
 */
const credentials = {
  type: postgresDatabase,
  host: 'localhost',
  port: 5432,
  username: 'rm',
  password: postgresPassword,
  database: 'cat_test_db',
  entities: [__dirname + '/**/*.entity.{ts,js}'],
  dropSchema: false,
  synchronize: process.env.NODE_ENV.trim() !== 'production',
  logging: false,
};

/**
 * Test Cat Data
 */
const testID = faker.random.uuid();
const testID2 = faker.random.uuid();
const testName = 'Test Cat';
const testName2 = 'Test Cat 2';
const testBreed = 'Orange Tabby';
const testBreed2 = 'Red Tabby';
const testAge = 5;
const testAge2 = 3;

/**
 * Test cat object
 */
const cat: Partial<CatDTO> = {
  id: testID,
  name: testName,
  breed: testBreed,
  age: testAge,
};

/**
 * Second test cat object
 */
const cat2: Partial<CatDTO> = {
  id: testID2,
  name: testName2,
  breed: testBreed2,
  age: testAge2,
};

describe('Cat Integration Tests', () => {
  let service: CatService;
  let repo: Repository<Cat>;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        CatModule,
        TypeOrmModule.forFeature([Cat]),
        TypeOrmModule.forRoot(credentials),
      ],
      providers: [CatService],
    }).compile();

    service = module.get<CatService>(CatService);
    repo = module.get<Repository<Cat>>(getRepositoryToken(Cat));
  });

  describe('Add', () => {
    it('should be able to create a cat', async () => {
      // create new cat
      const newCat = await service.insertOne(cat);

      expect(newCat).toMatchObject({ name: testName });
      expect(newCat).toMatchObject({ breed: testBreed });
      expect(newCat).toMatchObject({ age: testAge });
      expect(newCat).toBeTruthy();
    });
  });

  describe('Edit', () => {
    const testNewName = 'Some Other Cat';
    const testNewBreed = 'Grey Tabby';
    const testNewAge = 7;

    const catDataToUpdate = {
      id: testID,
      name: testNewName,
      breed: testNewBreed,
      age: testNewAge,
    };

    it('should be able to update a cat', async () => {
      // create new cat
      await service.insertOne(cat);

      // update cat
      const updatedCat = await service.updateOne(catDataToUpdate);

      expect(updatedCat).not.toMatchObject({ name: testName });
      expect(updatedCat).not.toMatchObject({ breed: testBreed });
      expect(updatedCat).not.toMatchObject({ age: testAge });
      expect(updatedCat).toBeTruthy();
    });
  });

  describe('Delete', () => {
    it('should be able to update a cat', async () => {
      // create new cat
      const newCat = await service.insertOne(cat);

      // delete cat
      const deletedCat = await service.deleteOne(newCat.id);
      expect(deletedCat).toMatchObject({ deleted: true });
    });
  });

  describe('Get', () => {
    it('should be able to find all cats', async () => {
      // create new cat
      await service.insertOne(cat);

      // create new cat
      await service.insertOne(cat2);

      const cats = await service.getAll();
      expect(cats.length).toEqual(2);
    });
  });

  describe('Get One', () => {
    it('should be able to find a cat by id', async () => {
      // create new cat
      const newCat = await service.insertOne(cat);
      const foundCat = await service.getOne(newCat.id);
      expect(foundCat.id).toEqual(newCat.id);
    });

    it('should be able to find a cat by name', async () => {
      // create new cat
      const newCat = await service.insertOne(cat);
      const foundCat = await service.getOneByName(newCat.name);
      expect(foundCat.name).toEqual(newCat.name);
    });
  });

  /**
   * after each test, delete everything from cat table
   */
  afterEach(async () => {
    await repo.query(`DELETE FROM cat`);
  });

  /**
   * after all tests are done, delete everything from cat table
   */
  afterAll(async () => {
    const connection = getConnection();
    await connection.createQueryBuilder().delete().from(Cat).execute();
    await connection.close();
  });
});
