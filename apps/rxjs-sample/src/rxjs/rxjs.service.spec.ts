import { Logger } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { RxjsService } from './rxjs.service';
import { of, Observable } from 'rxjs';
import { retryWhen } from 'rxjs/operators';
import { Observer } from 'zen-observable-ts';

const createSource = (retryMax = 2): Observable<any> => {
  let retryCount = 0;
  return Observable.create((observer: Observer<any>) => {
    if (retryCount < retryMax) {
      retryCount++;
      const thrownError = new Error('Error');
      (thrownError as any).status = 400;
      observer.error(thrownError);
    } else {
      observer.next(5);
      observer.complete();
    }
  });
};

describe('RxjsService', () => {
  let service: RxjsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RxjsService,
        {
          provide: Logger,
          useValue: {
            log: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<RxjsService>(RxjsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  describe('genericRetryStrategy', () => {
    it('should retry and pass', (done) => {
      let finalVal = 0;
      const source = createSource();
      source.pipe(retryWhen(service.genericRetryStrategy())).subscribe({
        next: (val: any) => {
          finalVal = val;
        },
        error: (err: Error) => {
          throw err;
        },
        complete: () => {
          expect(finalVal).toBe(5);
          done();
        },
      });
    });
    it('should retry and fail after max attempts', (done) => {
      const source = createSource(100);
      source.pipe(retryWhen(service.genericRetryStrategy())).subscribe({
        next: (val) => {
          throw new Error('Expected error, got ' + val);
        },
        error: (err) => {
          expect(err.message).toBe('Error');
          done();
        },
        complete: () => {
          throw new Error('Expected error but Observable completed');
        },
      });
    });
    it('should retry and fail from ignoredError option', (done) => {
      const source = createSource(100);
      source
        .pipe(
          retryWhen(
            service.genericRetryStrategy({
              numberOfAttempts: 3,
              delayTime: 10,
              ignoredErrorCodes: [400],
            }),
          ),
        )
        .subscribe({
          next: (val) => {
            throw new Error('Expected error, got ' + val);
          },
          error: (err) => {
            expect(err.message).toBe('Error');
            done();
          },
          complete: () => {
            throw new Error('Expected error but Observable completed');
          },
        });
    });
  });
});
