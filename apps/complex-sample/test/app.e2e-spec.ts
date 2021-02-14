import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

const testCatName = 'Test Cat 1';
const testCatBreed = 'Test Breed 1';
const russianBlue = 'Russian Blue';
const maineCoon = 'Maine Coon';
const badRequest = 'Bad Request';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
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
            'Incoming cat is not formatted correctly. Age must be a number.',
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
            'Incoming cat is not formatted correctly. Name must be a string.',
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
            'Incoming cat is not formatted correctly. Breed must be a string.',
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
});
