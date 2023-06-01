import { INestApplication, INestMicroservice } from '@nestjs/common';
import { Transport } from '@nestjs/microservices';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { PublisherModule } from '../src/publisher/publisher.module';
import { SubscriberModule } from '../src/subscriber/subscriber.module';

async function createPublisherApp() {
  const fixture: TestingModule = await Test.createTestingModule({
    imports: [PublisherModule],
  }).compile();

  const app = fixture.createNestApplication();

  await app.startAllMicroservices();

  await app.init();

  return app;
}

async function createSubscriberApp() {
  const fixture: TestingModule = await Test.createTestingModule({
    imports: [SubscriberModule],
  }).compile();

  const app = fixture.createNestMicroservice({
    transport: Transport.TCP,
  });

  await app.listen();

  return app;
}

describe('Microservices (e2e)', () => {
  let publisherApp: INestApplication;
  let subscriberApp: INestMicroservice;

  beforeEach(async () => {
    [publisherApp, subscriberApp] = await Promise.all([
      createPublisherApp(),
      createSubscriberApp(),
    ]);
  });

  afterEach(async () => {
    await Promise.all([publisherApp.close(), subscriberApp.close()]);
  });

  test('makes call to publisher will trigger subscriber', async () => {
    const httpServer = publisherApp.getHttpServer();

    const response = await request(httpServer)
      .post('/')
      .expect(201)
      .set('Accept', 'application/json')
      .then((res) => res.body);

    expect(response).toMatchInlineSnapshot(`
      Object {
        "result": Object {
          "success": true,
        },
      }
    `);

    // wait a while to allow subscriber to receive message
    await new Promise((fulfill) => setTimeout(fulfill, 250));
  });
});
