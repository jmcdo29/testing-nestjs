import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { Cat } from '../src/cat/models/cat-query.dto';
import { INestApplication } from '@nestjs/common';

const cats: Cat[] = [
  {
    name: 'Ventus',
    age: 4,
    breed: 'Russian Blue',
    id: '1',
  },
  {
    name: 'Terra',
    age: 5,
    breed: 'Siberian',
    id: '2',
  },
  {
    name: 'Aqua',
    age: 3,
    breed: 'Maine Coon',
    id: '3',
  },
];

const gql = '/graphql';

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

  describe(gql, () => {
    describe('cats', () => {
      it('should get the cats array', () => {
        return request(app.getHttpServer())
          .post(gql)
          .send({ query: '{getCats {id name age breed }}' })
          .expect(200)
          .expect((res) => {
            expect(res.body.data.getCats).toEqual(cats);
          });
      });
      describe('one cat', () => {
        it('should get a single cat', () => {
          return request(app.getHttpServer())
            .post(gql)
            .send({ query: '{getCat(catId:{id:"2"}){id name age breed}}' })
            .expect(200)
            .expect((res) => {
              expect(res.body.data.getCat).toEqual({
                name: 'Terra',
                age: 5,
                breed: 'Siberian',
                id: '2',
              });
            });
        });
        it('should get an error for bad id', () => {
          return request(app.getHttpServer())
            .post(gql)
            .send({ query: '{getCat(catId: {id:"500"}){id name age breed}}' })
            .expect(200)
            .expect((res) => {
              expect(res.body.data).toBe(null);
              expect(res.body.errors[0].message).toBe(
                'No cat with id 500 found',
              );
            });
        });
      });
      it('should create a new cat and have it added to the array', () => {
        return (
          request(app.getHttpServer())
            .post(gql)
            .send({
              query:
                'mutation {insertCat(newCat: { name: "Vanitas", breed: "Calico", age: 100 }) {breed name id age}}',
            })
            .expect(200)
            .expect((res) => {
              expect(res.body.data.insertCat).toEqual({
                name: 'Vanitas',
                breed: 'Calico',
                age: 100,
                id: '4',
              });
            })
            // chain another request to see our original one works as expected
            .then(() =>
              request(app.getHttpServer())
                .post(gql)
                .send({ query: '{getCats {id name breed age}}' })
                .expect(200)
                .expect((res) => {
                  expect(res.body.data.getCats).toEqual(
                    cats.concat([
                      {
                        name: 'Vanitas',
                        breed: 'Calico',
                        age: 100,
                        id: '4',
                      },
                    ]),
                  );
                }),
            )
        );
      });
    });
  });
});
