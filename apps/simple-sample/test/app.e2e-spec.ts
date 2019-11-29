import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { INestApplication } from '@nestjs/common';

const requestFunction = (url: string, data: string, app: INestApplication) =>
  request(app.getHttpServer())
    .get(url)
    .expect(200)
    .expect(data);

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = module.createNestApplication();
    await app.init();
  });

  describe('/ (GET)', () => {
    it('/ (GET)', () => {
      return requestFunction('/', 'Hello, World!', app);
    });
    it('/?name=Tester', () => {
      return requestFunction('/?name=Tester', 'Hello, Tester!', app);
    });
  });
});
