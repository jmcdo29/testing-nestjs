import { Test } from '@nestjs/testing';
import * as fs from 'fs';
import { join } from 'path';

import { AppService } from './app.service';

describe('AppService', () => {
  let service: AppService;

  beforeAll(async () => {
    const app = await Test.createTestingModule({
      providers: [AppService],
    }).compile();

    service = app.get<AppService>(AppService);
  });

  describe('getData', () => {
    it('should return "Welcome to file-up-and-down-sample!"', () => {
      expect(service.getData()).toEqual({
        message: 'Welcome to file-up-and-down-sample!',
      });
    });
    describe('getFileStream', () => {
      it('should get the file information', () => {
        // this is passing a value to an internal constructor that isn't usually exposed. Only do this if you understand the implications
        // ref: https://github.com/nodejs/node/blob/master/lib/internal/fs/streams.js#L145
        const stream = new fs.ReadStream('path' as unknown);
        const crsMock = jest
          .spyOn(fs, 'createReadStream')
          .mockReturnValue(stream);
        expect(service.getFileStream()).toEqual(stream);
        expect(crsMock).toBeCalledWith(join(process.cwd(), 'package.json'));
      });
    });
  });
});
