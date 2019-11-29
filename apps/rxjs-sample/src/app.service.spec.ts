import { Test } from '@nestjs/testing';
import { of, timer, throwError } from 'rxjs';
import { AppService } from './app.service';
import { RxjsService } from './rxjs/rxjs.service';

describe('AppService', () => {
  let service: AppService;
  let rxjsService: RxjsService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        AppService,
        {
          provide: RxjsService,
          useValue: {
            genericRetryStrategy: jest.fn().mockReturnValue(timer(50)),
          },
        },
      ],
    }).compile();

    service = module.get<AppService>(AppService);
    rxjsService = module.get<RxjsService>(RxjsService);
  });

  describe('playWithRxJS', () => {
    it('should return a valid value', (done) => {
      let counter = 0;
      let finalVal: number;
      service.playWithRxJS(50).subscribe({
        next: (val) => {
          // checks each value as it is sent back
          // as we have an incremental observable
          // we need to check each value sent
          expect(val).toBe(++counter);
          finalVal = val;
        },
        error: (err) => {
          throw err;
        },
        complete: () => {
          expect(finalVal).toBe(10);
          done();
        },
      });
    });
    it('should return with an error', (done) => {
      let counter = 0;
      rxjsService.genericRetryStrategy = jest
        .fn()
        .mockReturnValueOnce(() => throwError(new Error('This should error')));
      service.playWithRxJS().subscribe({
        next: (val) => {
          expect(val).toBe(++counter);
        },
        error: (err) => {
          expect(err.message).toBe('This should error');
          expect(rxjsService.genericRetryStrategy).toBeCalledTimes(1);
          done();
        },
        complete: () => done(),
      });
    });
  });
});
