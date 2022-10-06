import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as io from 'socket.io-client';
import { AppModule } from '../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let url: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.listen(0, '0.0.0.0');
    url = await app.getUrl();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should call message', (done) => {
    const socket = io.connect(url);
    socket.emit('message', { name: 'Test' }, (data) => {
      expect(data).toBe('Hello, Test!');
      socket.disconnect();
      done();
    });
  });
});
