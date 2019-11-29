import {
  BadRequestException,
  CallHandler,
  ExecutionContext,
  INestApplication,
} from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { map } from 'rxjs/operators';
import * as request from 'supertest';
import { CatGuard } from './../src/cat/cat.guard';
import { CatInterceptor } from './../src/cat/cat.interceptor';
import { CatModule } from './../src/cat/cat.module';
import { CatPipe } from './../src/cat/cat.pipe';
import { CatService } from './../src/cat/cat.service';
import { Cat } from './../src/cat/models/cats';
import { ParseIntPipe } from './../src/parse-int.pipe';

const testCatName = 'Test Cat 1';
const testCatBreed = 'Test Breed 1';
const russianBlue = 'Russian Blue';
const maineCoon = 'Maine Coon';
const badRequest = 'Bad Request';

// TODO: Look into adding user field or other fields into req object

// I like to declare pipe/guard/interceptor/filter mocks before the tests
// I think it makes the test declaration more readable, but that's me.
const interceptorMock = jest
  .fn()
  .mockImplementation((context: ExecutionContext, next: CallHandler) =>
    next.handle().pipe(map((data) => ({ data }))),
  );

const catGuardMock = jest
  .fn()
  .mockImplementation((context: ExecutionContext) => {
    context.switchToHttp().getRequest().user = 'mock user value';
    return true;
  });

const catPipeMock = jest.fn().mockReturnValue({
  name: testCatName,
  breed: testCatBreed,
  age: 3,
});

const parseIntPipeMock = jest.fn().mockReturnValue(1);

// tslint:disable-next-line: no-big-function
describe('AppController (e2e)', () => {
  let app: INestApplication;

  describe('with mocking', () => {
    let service: CatService;
    // tslint:disable-next-line: no-commented-code
    // let pipe: CatPipe;
    let intPipe: ParseIntPipe;
    let guard: CatGuard;
    /**
     * Notice there is a lot going on here with all the mocking we are doing
     * This isn't necessarily necessary, but it gives a really good picture
     * about how much can go into making your mocks, and this is without extra services!
     */
    beforeAll(async () => {
      const moduleFixture: TestingModule = await Test.createTestingModule({
        imports: [CatModule],
      })
        .overrideProvider(CatService)
        .useValue({
          getAll: jest
            .fn()
            .mockReturnValue([
              new Cat(1, 'Ventus', russianBlue, 3),
              new Cat(2, 'Terra', 'Siberian', 6),
              new Cat(3, 'Aqua', maineCoon, 5),
            ]),
          getById: jest
            .fn()
            .mockReturnValue(new Cat(1, 'Ventus', russianBlue, 3)),
          addCat: jest
            .fn()
            .mockReturnValue(new Cat(4, testCatName, testCatBreed, 3)),
          deleteCat: jest.fn().mockReturnValue(true),
        })
        .overridePipe(CatPipe)
        .useValue({
          transform: catPipeMock,
        })
        .overridePipe(ParseIntPipe)
        .useValue({
          transform: parseIntPipeMock,
        })
        .overrideGuard(CatGuard)
        .useValue({
          canActivate: catGuardMock,
        })
        .overrideInterceptor(CatInterceptor)
        .useValue({
          intercept: interceptorMock,
        })
        .compile();

      app = moduleFixture.createNestApplication();
      // just as in out unit tests we can get the values of the providers/pipes/etc.
      service = moduleFixture.get<CatService>(CatService);
      // not overriding the cat pipe just because it's a validation pipe
      // pipe = moduleFixture.get<CatPipe>(CatPipe);
      intPipe = moduleFixture.get<ParseIntPipe>(ParseIntPipe);
      guard = moduleFixture.get<CatGuard>(CatGuard);
      await app.init();
    });
    describe('/cat/ GET', () => {
      it('should return an array of cats', () => {
        return request(app.getHttpServer())
          .get('/cat/')
          .expect(200)
          .expect({
            data: [
              { id: 1, name: 'Ventus', breed: russianBlue, age: 3 },
              { id: 2, name: 'Terra', breed: 'Siberian', age: 6 },
              { id: 3, name: 'Aqua', breed: maineCoon, age: 5 },
            ],
          });
      });
      it('should return a 403 for unauthorized', () => {
        jest
          .spyOn(guard, 'canActivate')
          .mockImplementationOnce((context: ExecutionContext) => false);
        return request(app.getHttpServer())
          .get('/cat/')
          .expect(403);
      });
    });
    describe('/cat/:id GET', () => {
      it('should return the singular cat', () => {
        return request(app.getHttpServer())
          .get('/cat/1')
          .expect(200)
          .expect({
            data: { id: 1, name: 'Ventus', breed: russianBlue, age: 3 },
          });
      });
      it('should return a 400', () => {
        intPipe.transform = jest.fn().mockReturnValueOnce(45785487);
        service.getById = jest.fn().mockImplementationOnce(() => {
          throw new BadRequestException('Cat with id 45785487 does not exist.');
        });
        return request(app.getHttpServer())
          .get('/cat/45785487')
          .expect(400)
          .expect({
            statusCode: 400,
            error: badRequest,
            message: 'Cat with id 45785487 does not exist.',
          });
      });
    });
    describe('/cat/new POST', () => {
      it('should return the new cat', () => {
        return request(app.getHttpServer())
          .post('/cat/new')
          .send({ age: 3, name: testCatName, breed: testCatBreed })
          .expect(201)
          .expect({
            data: { id: 4, name: testCatName, breed: testCatBreed, age: 3 },
          });
      });
    });
    describe('/cat/:id DELETE', () => {
      it('should delete the cat', () => {
        return request(app.getHttpServer())
          .delete('/cat/2')
          .expect(200)
          .expect({ data: true });
      });
    });

    // make sure to close the connection, otherwise you could get an ECONNREFUSED error
    afterAll(async () => {
      await app.close();
    });
  });
  describe('without mocking', () => {
    beforeAll(async () => {
      const moduleFixture: TestingModule = await Test.createTestingModule({
        imports: [CatModule],
      }).compile();

      app = moduleFixture.createNestApplication();
      await app.init();
    });

    describe('/cat/ GET', () => {
      it('should return an array of cats', () => {
        return request(app.getHttpServer())
          .get('/cat')
          .set('authorization', 'auth')
          .expect(200)
          .expect({
            data: [
              { id: 1, name: 'Ventus', breed: russianBlue, age: 3 },
              { id: 2, name: 'Terra', breed: 'Siberian', age: 6 },
              { id: 3, name: 'Aqua', breed: maineCoon, age: 5 },
            ],
          });
      });
    });
    describe('/cat/:id GET', () => {
      it('should return a 400 for a bad id', () => {
        return request(app.getHttpServer())
          .get('/cat/badId')
          .set('authorization', 'auth')
          .expect(400)
          .expect({
            statusCode: 400,
            error: badRequest,
            message: 'Id parameter should be a number.',
          });
      });
      it('should return an acutal cat', () => {
        return request(app.getHttpServer())
          .get('/cat/2')
          .set('authorization', 'auth')
          .expect(200)
          .expect({
            data: {
              id: 2,
              name: 'Terra',
              breed: 'Siberian',
              age: 6,
            },
          });
      });
    });
    describe('cat/new POST', () => {
      it('should throw an error for a bad age', () => {
        return request(app.getHttpServer())
          .post('/cat/new')
          .set('authorization', 'auth')
          .send({
            name: testCatName,
            breed: testCatBreed,
          })
          .expect(400)
          .expect({
            statusCode: 400,
            error: badRequest,
            message:
              'Incoming cat is not formated correctly. Age must be a number.',
          });
      });
      it('should throw an error for a bad name', () => {
        return request(app.getHttpServer())
          .post('/cat/new')
          .set('authorization', 'auth')
          .send({
            age: 5,
            breed: testCatBreed,
          })
          .expect(400)
          .expect({
            statusCode: 400,
            error: badRequest,
            message:
              'Incoming cat is not formated correctly. Name must be a string.',
          });
      });
      it('should throw an error for a bad breed', () => {
        return request(app.getHttpServer())
          .post('/cat/new')
          .set('authorization', 'auth')
          .send({
            age: 5,
            name: testCatName,
          })
          .expect(400)
          .expect({
            statusCode: 400,
            error: badRequest,
            message:
              'Incoming cat is not formated correctly. Breed must be a string.',
          });
      });
      it('should return the new cat with id', () => {
        return request(app.getHttpServer())
          .post('/cat/new')
          .set('authorization', 'auth')
          .send({
            age: 5,
            name: testCatName,
            breed: testCatBreed,
          })
          .expect(201)
          .expect({
            data: {
              id: 4,
              age: 5,
              name: testCatName,
              breed: testCatBreed,
            },
          });
      });
    });
    describe('/cat/:id DELETE', () => {
      it('should return false for a not found id', () => {
        return request(app.getHttpServer())
          .delete('/cat/633')
          .set('authorization', 'auth')
          .expect(200)
          .expect({ data: false });
      });
      it('should return true for a found id', () => {
        return request(app.getHttpServer())
          .delete('/cat/2')
          .set('authorization', 'auth')
          .expect(200)
          .expect({ data: true });
      });
    });

    afterAll(async () => {
      await app.close();
    });
  });
});
