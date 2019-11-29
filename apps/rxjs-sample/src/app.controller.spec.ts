import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { of } from 'rxjs';

describe('AppController', () => {
  let appController: AppController;
  let service: AppService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        {
          provide: AppService,
          useValue: {
            playWithRxJS: jest.fn().mockReturnValue(of(10)),
          },
        },
      ],
    }).compile();

    appController = app.get<AppController>(AppController);
    service = app.get<AppService>(AppService);
  });

  describe('AppController', () => {
    it('should return 10 for no options', (done) => {
      appController.getHello().subscribe({
        next: (val) => expect(val).toBe(10),
        error: (err) => {
          throw err;
        },
        complete: () => done(),
      });
    });
    it('should return 50 for maxVal 50 and take 50', (done) => {
      service.playWithRxJS = jest.fn().mockReturnValueOnce(of(50));
      appController.getHello({ maxVal: 50, takeAmount: 50 }).subscribe({
        next: (val) => expect(val).toBe(50),
        error: (err) => {
          throw err;
        },
        complete: () => done(),
      });
    });
    it('should return 10 for no max and take 10', (done) => {
      service.playWithRxJS = jest.fn().mockReturnValueOnce(of(10));
      appController.getHello({ takeAmount: 10 }).subscribe({
        next: (val) => expect(val).toBe(10),
        error: (err) => {
          throw err;
        },
        complete: () => done(),
      });
    });
    // in practice this will actually throw an error,
    // but we are just covering branches for now
    it('should return 5 for max 5 take no value', (done) => {
      service.playWithRxJS = jest.fn().mockReturnValueOnce(of(5));
      appController.getHello({ maxVal: 5 }).subscribe({
        next: (val) => expect(val).toBe(5),
        error: (err) => {
          throw err;
        },
        complete: () => done(),
      });
    });
  });
});
