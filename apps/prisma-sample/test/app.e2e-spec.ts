import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { PrismaService } from '../src/prisma.service';

describe('App (e2e)', () => {
  let app: INestApplication;
  let prisma: PrismaService;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    prisma = app.get<PrismaService>(PrismaService);

    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('CatModule', () => {
    afterEach(async () => {
      // TODO: use transactions and transaction rollback once prisma supports it
      await prisma.truncate();
      await prisma.resetSequences();
    });

    it('Post cat, get all, get by id, delete', async () => {
      const ventus = {
        name: 'Ventus',
        breed: 'Russian Blue',
        age: 4,
      };
      const data = await request(app.getHttpServer())
        .post('/cat/new')
        .send(ventus)
        .expect(201);
      expect(data.body).toEqual({
        ...ventus,
        id: expect.any(String),
      });
      const cats = await request(app.getHttpServer()).get('/cat').expect(200);
      expect(cats.body).toEqual(expect.any(Array));
      expect(cats.body.length).toBe(1);
      expect(cats.body[0]).toEqual({
        ...ventus,
        id: expect.any(String),
      });
      const ventusV2 = await request(app.getHttpServer())
        .get(`/cat/${data.body.id}`)
        .expect(200);
      expect(ventusV2.body).toEqual(data.body);
      return request(app.getHttpServer())
        .delete(`/cat/delete/${data.body.id}`)
        .expect(200)
        .expect({ deleted: true });
    });
    it('post can, get by name, update, get by id, delete', async () => {
      const ventus = {
        name: 'Ventus',
        breed: 'Russian Blue',
        age: 4,
      };
      const data = await request(app.getHttpServer())
        .post('/cat/new')
        .send(ventus)
        .expect(201);
      expect(data.body).toEqual({
        ...ventus,
        id: expect.any(String),
      });
      const cat = await request(app.getHttpServer())
        .get('/cat/name?name=Ventus')
        .expect(200);
      expect(cat.body).toEqual({
        ...ventus,
        id: expect.any(String),
      });
      const ventusV2 = await request(app.getHttpServer())
        .patch(`/cat/update`)
        .send({
          id: cat.body.id,
          age: 5,
        })
        .expect(200);
      expect(ventusV2.body).toEqual({ ...data.body, age: 5 });
      const updatedCat = await request(app.getHttpServer())
        .get(`/cat/${cat.body.id}`)
        .expect(200);
      expect(updatedCat.body).toEqual(ventusV2.body);
      return request(app.getHttpServer())
        .delete(`/cat/delete/${data.body.id}`)
        .expect(200)
        .expect({ deleted: true });
    });
  });
});
