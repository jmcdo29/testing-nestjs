import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as pactum from 'pactum';
import { AppModule } from '../src/app.module';

const testCatName = 'Test Cat 1';
const testCatBreed = 'Test Breed 1';
const russianBlue = 'Russian Blue';
const maineCoon = 'Maine Coon';
const badRequest = 'Bad Request';

describe('AppController (e2e) {Pactum}', () => {
  let app: INestApplication;
  let url: string;
  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.listen(0);
    url = await app.getUrl();
    pactum.request.setBaseUrl(url.replace('[::1]', 'localhost'));
  });

  afterAll(async () => {
    await app.close();
  });

  it('/ (GET)', () => {
    return pactum.spec().get('/').expectStatus(200).expectBody('Hello World!');
  });
  describe('/cat/ GET', () => {
    it('should return an array of cats', () => {
      return pactum
        .spec()
        .get('/cat')
        .withHeaders('authorization', 'auth')
        .expectStatus(200)
        .expectBody({
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
      return pactum
        .spec()
        .get('/cat/badId')
        .withHeaders('authorization', 'auth')
        .expectStatus(400)
        .expectBody({
          statusCode: 400,
          error: badRequest,
          message: 'Id parameter should be a number.',
        });
    });
    it('should return an acutal cat', () => {
      return pactum
        .spec()
        .get('/cat/2')
        .withHeaders('authorization', 'auth')
        .expectStatus(200)
        .expectBody({
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
      return pactum
        .spec()
        .post('/cat/new')
        .withHeaders('authorization', 'auth')
        .withJson({
          name: testCatName,
          breed: testCatBreed,
        })
        .expectStatus(400)
        .expectBody({
          statusCode: 400,
          error: badRequest,
          message:
            'Incoming cat is not formatted correctly. Age must be a number.',
        });
    });
    it('should throw an error for a bad name', () => {
      return pactum
        .spec()
        .post('/cat/new')
        .withHeaders('authorization', 'auth')
        .withJson({
          age: 5,
          breed: testCatBreed,
        })
        .expectStatus(400)
        .expectBody({
          statusCode: 400,
          error: badRequest,
          message:
            'Incoming cat is not formatted correctly. Name must be a string.',
        });
    });
    it('should throw an error for a bad breed', () => {
      return pactum
        .spec()
        .post('/cat/new')
        .withHeaders('authorization', 'auth')
        .withJson({
          age: 5,
          name: testCatName,
        })
        .expectStatus(400)
        .expectBody({
          statusCode: 400,
          error: badRequest,
          message:
            'Incoming cat is not formatted correctly. Breed must be a string.',
        });
    });
    it('should return the new cat with id', () => {
      return pactum
        .spec()
        .post('/cat/new')
        .withHeaders('authorization', 'auth')
        .withJson({
          age: 5,
          name: testCatName,
          breed: testCatBreed,
        })
        .expectStatus(201)
        .expectBody({
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
      return pactum
        .spec()
        .delete('/cat/633')
        .withHeaders('authorization', 'auth')
        .expectStatus(200)
        .expectBody({ data: false });
    });
    it('should return true for a found id', () => {
      return pactum
        .spec()
        .delete('/cat/2')
        .withHeaders('authorization', 'auth')
        .expectStatus(200)
        .expectBody({ data: true });
    });
  });
});
