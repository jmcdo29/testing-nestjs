/**
 * * Nest Modules
 */
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseType, getConnection, Repository } from 'typeorm';

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
 * Casting type as DatabaseType
 */
const postgresDatabase: DatabaseType = 'postgres';

/**
 * Database Credentials
 */
const credentials = {
  type: postgresDatabase,
  host: process.env.POSTGRES_HOST,
  port: Number(process.env.POSTGRES_PORT),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  entities: [__dirname + '/**/*.entity.{ts,js}'],
  dropSchema: false,
  synchronize: process.env.NODE_ENV.trim() !== 'production',
  logging: false,
};

/**
 * Test cat object
 */
const cat: Partial<CatDTO> = {
  name: 'Test Cat Mike',
  breed: 'Orange Tabby',
  age: 5,
};

/**
 * Second test cat object
 */
const cat2: Partial<CatDTO> = {
  name: 'Test Cat Mona',
  breed: 'Grey Shorthair',
  age: 7,
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

      expect(newCat).toMatchObject({ name: cat.name });
      expect(newCat).toMatchObject({ breed: cat.breed });
      expect(newCat).toMatchObject({ age: cat.age });
      expect(newCat).toBeTruthy();
    });
  });

  describe('Edit', () => {
    const testNewName = 'Some Other Cat';
    const testNewBreed = 'Grey Tabby';
    const testNewAge = 7;

    let catDataToUpdate = {
      name: testNewName,
      breed: testNewBreed,
      age: testNewAge,
    };

    it('should be able to update a cat', async () => {
      // create new cat
      const newCat = await service.insertOne(cat);

      // get new cat's id
      const { id } = newCat;

      // assign the newly created cat's id into the update object
      catDataToUpdate = { ...catDataToUpdate, ...{ id } };

      // update cat
      const updatedCat = await service.updateOne(catDataToUpdate);

      expect(updatedCat).not.toMatchObject({ name: cat.name });
      expect(updatedCat).not.toMatchObject({ breed: cat.breed });
      expect(updatedCat).not.toMatchObject({ age: cat.age });
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
    await repo.query('DELETE FROM cat');
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
