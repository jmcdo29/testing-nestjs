import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { readFile } from 'fs/promises';
import { request, spec } from 'pactum';
import { join } from 'path';

import { AppModule } from '../src/app/app.module';

describe('File Upload nad Download E2E', () => {
  let app: INestApplication;
  beforeAll(async () => {
    const modRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = modRef.createNestApplication();
    app.setGlobalPrefix('api');
    await app.listen(0);
    const url = await app.getUrl();
    request.setBaseUrl(`${url.replace('[::1]', 'localhost')}/api`);
  });

  afterAll(async () => {
    await app.close();
  });

  describe('AppController', () => {
    let fileContents: string;
    beforeAll(async () => {
      fileContents = (
        await readFile(join(process.cwd(), 'package.json'))
      ).toString();
    });
    it('GET /', async () => {
      return spec()
        .get('/')
        .expectBody({ message: 'Welcome to file-up-and-down-sample!' });
    });
    it('POST /post-file', async () => {
      return spec()
        .post('/post-file')
        .withFile('file', join(process.cwd(), 'package.json'))
        .expectBody('package.json');
    });
    it('GET /streamable-file', async () => {
      return spec().get('/streamable-file').expectBody(fileContents);
    });
    it('GET /res-stream', async () => {
      return spec().get('/res-stream').expectBody(fileContents);
    });
  });
});
