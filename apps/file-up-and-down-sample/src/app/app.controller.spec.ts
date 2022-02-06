import { StreamableFile } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { Readable } from 'stream';

import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let app: TestingModule;
  let appController: AppController;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        {
          provide: AppService,
          useValue: {
            getData: jest
              .fn()
              .mockReturnValue({ message: 'AppService#getData' }),
            getFileStream: jest.fn().mockImplementation(() => {
              const readable = new Readable();
              readable.push(Buffer.from('Hello World!'));
              readable.push(null);
              return readable;
            }),
          },
        },
      ],
    }).compile();
    appController = app.get<AppController>(AppController);
  });

  describe('getData', () => {
    it('should return "Welcome to file-up-and-down-sample!"', () => {
      expect(appController.getData()).toEqual({
        message: 'AppService#getData',
      });
    });
  });
  describe('postFile', () => {
    it('should return the file.originalname property', () => {
      expect(
        appController.postFile({
          originalname: 'testfile.json',
          buffer: Buffer.from('Hello'),
          destination: '',
          fieldname: 'file',
          filename: 'new-file.json',
          mimetype: 'text/plain',
          encoding: '7bit',
          path: '',
          size: 5091,
          stream: new Readable(),
        }),
      ).toEqual('testfile.json');
    });
  });
  describe('getStreamableFile', () => {
    it('should return a streamable file', () => {
      expect(appController.getStreamableFile()).toEqual(
        new StreamableFile(Buffer.from('Hello World!')),
      );
    });
  });
  describe('getFileViaResStream', () => {
    it('should pipe the response object through the readStream', (done) => {
      // mocking all of the writable methods
      const resMock: NodeJS.WritableStream = {
        end: done,
        write: jest.fn(),
        addListener: jest.fn(),
        emit: jest.fn(),
        eventNames: jest.fn(),
        getMaxListeners: jest.fn(),
        listenerCount: jest.fn(),
        listeners: jest.fn(),
        off: jest.fn(),
        on: jest.fn(),
        once: jest.fn(),
        prependListener: jest.fn(),
        prependOnceListener: jest.fn(),
        rawListeners: jest.fn(),
        removeAllListeners: jest.fn(),
        removeListener: jest.fn(),
        setMaxListeners: jest.fn(),
        writable: true,
      };
      // keep in mind this is the absolute **minimum** for testing, and should be expanded upon with better tests later
      appController.getFileViaResStream(resMock);
      expect(resMock.on).toBeCalled();
    });
  });
});
