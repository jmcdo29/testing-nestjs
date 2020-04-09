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
const testID = 'd6d98b88-c866-4496-9bd4-de7ba48d0f52';
const testName = 'Test Cat';
const testBreed = 'Orange Tabby';
const testAge = 5;

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
  name: testName,
  breed: testBreed,
  age: testAge,
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
    it('should create a cat', async () => {
      // create new cat
      const newCat = await service.insertOne(cat);

      expect(newCat).toMatchObject({ name: testName });
      expect(newCat).toMatchObject({ breed: testBreed });
      expect(newCat).toMatchObject({ age: testAge });
      expect(newCat).toBeTruthy();
    });
  });

  /**
   * after each test, delete everything from users table
   */
  afterEach(async () => {
    await repo.query(`DELETE FROM cat`);
  });

  /**
   * after all tests are done, delete everything from users table
   */
  afterAll(async () => {
    const connection = getConnection();

    await connection.createQueryBuilder().delete().from(Cat).execute();

    await connection.close();
  });
});
