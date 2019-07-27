import { BadRequestException, INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { of } from 'rxjs';
import * as request from 'supertest';
import { CatInterceptor } from './../src/cat/cat.interceptor';
import { CatModule } from './../src/cat/cat.module';
import { CatPipe } from './../src/cat/cat.pipe';
import { CatService } from './../src/cat/cat.service';
import { Cat } from './../src/cat/models/cats';
import { ParseIntPipe } from './../src/parse-int.pipe';

// TODO: Look into adding user field or other fields into req object
// TODO: Install Jest Runner

describe('AppController (e2e)', () => {
  let app: INestApplication;

  describe('with mocking', () => {
    let service: CatService;
    // let pipe: CatPipe;
    let intPipe: ParseIntPipe;
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
              new Cat(1, 'Ventus', 'Russian Blue', 3),
              new Cat(2, 'Terra', 'Siberian', 6),
              new Cat(3, 'Aqua', 'Maine Coon', 5),
            ]),
          getById: jest
            .fn()
            .mockReturnValue(new Cat(1, 'Ventus', 'Russian Blue', 3)),
          addCat: jest
            .fn()
            .mockReturnValue(new Cat(4, 'Test Cat 1', 'Test Breed 1', 3)),
          deleteCat: jest.fn().mockReturnValue(true),
        })
        .overridePipe(CatPipe)
        .useValue({
          transform: jest.fn().mockReturnValue({
            name: 'Test Cat 1',
            breed: 'Test Breed 1',
            age: 3,
          }),
        })
        .overridePipe(ParseIntPipe)
        .useValue({
          transform: jest.fn().mockReturnValue(1),
        })
        .overrideInterceptor(CatInterceptor)
        .useValue({
          transform: (data: any) => jest.fn().mockReturnValue(of({ data })),
        })
        .compile();

      app = moduleFixture.createNestApplication();
      // just as in out unit tests we can get the values of the providers/pipes/etc.
      service = moduleFixture.get<CatService>(CatService);
      // pipe = moduleFixture.get<CatPipe>(CatPipe);
      intPipe = moduleFixture.get<ParseIntPipe>(ParseIntPipe);
      await app.init();
    });
    describe('/cat/ GET', () => {
      it('should return an array of cats', () => {
        return request(app.getHttpServer())
          .get('/cat/')
          .expect(200)
          .expect({
            data: [
              { id: 1, name: 'Ventus', breed: 'Russian Blue', age: 3 },
              { id: 2, name: 'Terra', breed: 'Siberian', age: 6 },
              { id: 3, name: 'Aqua', breed: 'Maine Coon', age: 5 },
            ],
          });
      });
    });
    describe.only('/cat/:id GET', () => {
      it('should return the singular cat', () => {
        return request(app.getHttpServer())
          .get('/cat/1')
          .expect(200)
          .expect({
            data: { id: 1, name: 'Ventus', breed: 'Russian Blue', age: 3 },
          });
      });
      it.only('should return a 400', () => {
        intPipe.transform = jest.fn().mockReturnValueOnce(45785487);
        service.getById = jest.fn().mockImplementationOnce(() => {
          throw new BadRequestException('Cat with id 45785487 does not exist.');
        });
        return request(app.getHttpServer())
          .get('/cat/45785487')
          .expect(400)
          .expect({
            statusCode: 400,
            error: 'Bad Request',
            message: 'Cat with id 45785487 does not exist.',
          });
      });
    });
    describe('/cat/new POST', () => {
      it('should return the new cat', () => {
        return request(app.getHttpServer())
          .post('/cat/new')
          .send({ age: 3, name: 'Test Cat 1', breed: 'Test Breed 1' })
          .expect(201)
          .expect({
            data: { id: 4, name: 'Test Cat 1', breed: 'Test Breed 1', age: 3 },
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
          .expect(200)
          .expect({
            data: [
              { id: 1, name: 'Ventus', breed: 'Russian Blue', age: 3 },
              { id: 2, name: 'Terra', breed: 'Siberian', age: 6 },
              { id: 3, name: 'Aqua', breed: 'Maine Coon', age: 5 },
            ],
          });
      });
    });
    describe('/cat/:id GET', () => {
      it('should return a 400 for a bad id', () => {
        return request(app.getHttpServer())
          .get('/cat/badId')
          .expect(400)
          .expect({
            statusCode: 400,
            error: 'Bad Request',
            message: 'Id parameter should be a number.',
          });
      });
      it('should return an acutal cat', () => {
        return request(app.getHttpServer())
          .get('/cat/2')
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
          .send({
            name: 'Test Cat 1',
            breed: 'Test Breed 1',
          })
          .expect(400)
          .expect({
            statusCode: 400,
            error: 'Bad Request',
            message:
              'Incoming cat is not formated correctly. Age must be a number.',
          });
      });
      it('should throw an error for a bad name', () => {
        return request(app.getHttpServer())
          .post('/cat/new')
          .send({
            age: 5,
            breed: 'Test Breed 1',
          })
          .expect(400)
          .expect({
            statusCode: 400,
            error: 'Bad Request',
            message:
              'Incoming cat is not formated correctly. Name must be a string.',
          });
      });
      it('should throw an error for a bad breed', () => {
        return request(app.getHttpServer())
          .post('/cat/new')
          .send({
            age: 5,
            name: 'Test Cat 1',
          })
          .expect(400)
          .expect({
            statusCode: 400,
            error: 'Bad Request',
            message:
              'Incoming cat is not formated correctly. Breed must be a string.',
          });
      });
      it('should return the new cat with id', () => {
        return request(app.getHttpServer())
          .post('/cat/new')
          .send({
            age: 5,
            name: 'Test Cat 1',
            breed: 'Test Breed 1',
          })
          .expect(201)
          .expect({
            data: {
              id: 4,
              age: 5,
              name: 'Test Cat 1',
              breed: 'Test Breed 1',
            },
          });
      });
    });
    describe('/cat/:id DELETE', () => {
      it('should return false for a not found id', () => {
        return request(app.getHttpServer())
          .delete('/cat/633')
          .expect(200)
          .expect({ data: false });
      });
      it('should return true for a found id', () => {
        return request(app.getHttpServer())
          .delete('/cat/2')
          .expect(200)
          .expect({ data: true });
      });
    });

    afterAll(async () => {
      await app.close();
    });
  });
});
