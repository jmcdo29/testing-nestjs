import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { INestApplication } from '@nestjs/common';

const requestFunction = (
  url: string,
  data: { data: any; status: number },
  app: INestApplication,
) =>
  request(app.getHttpServer())
    .get(url)
    .expect(data.status)
    .expect(data.data);

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return requestFunction(
      '/',
      {
        data: { statusCode: 500, message: 'Internal server error' },
        status: 500,
      },
      app,
    );
  });
  it('/?takeAmount=10&maxVal=50', () => {
    return requestFunction(
      '/?takeAmount=10&maxVal=50',
      { data: '10', status: 200 },
      app,
    );
  });
});
