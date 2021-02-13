import * as request from 'supertest';
import { Response } from 'supertest';
import { Model } from 'mongoose';
import { MockFactory } from 'mockingbird-ts';
import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import { MongoInMemoryConfigService } from './common/mongo-in-memory-config.service';
import { AppModule } from '../src/app.module';
import { MongooseModuleConfigService } from '../src/config/mongoose-module-config.service';
import { CatMock } from './common/cat.mock';
import { getModelToken } from '@nestjs/mongoose';
import { CatDocument } from '../src/cat/schemas/cat.document';

describe('Cats Application (e2e)', () => {
  let app: INestApplication;
  let model: Model<CatDocument>;
  let cats;

  beforeAll(async () => {
    cats = MockFactory.create(CatMock, { count: 3 });

    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(MongooseModuleConfigService)
      // Use in-memory database instead of the real one
      .useClass(MongoInMemoryConfigService)
      .compile();

    app = moduleRef.createNestApplication();

    // Get the mongoose model for 'Cat'
    model = moduleRef.get(getModelToken('Cat'));

    // 'Seed' the cats fixture in the database
    await model.create(cats);

    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/cat (GET)', async () => {
    const response: Response = await request(app.getHttpServer()).get('/cat');

    expect(response.status).toBe(HttpStatus.OK);
    expect(response.body).toEqual(
      cats.map((cat) => ({ ...cat, _id: expect.any(String) })),
    );
  });
});
