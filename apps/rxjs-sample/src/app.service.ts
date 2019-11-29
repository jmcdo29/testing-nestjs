import { Injectable, Logger } from '@nestjs/common';
import { Observable, interval, throwError, of } from 'rxjs';
import { RxjsService } from './rxjs/rxjs.service';
import { mergeMap, catchError, retryWhen, take, skip } from 'rxjs/operators';

@Injectable()
export class AppService {
  constructor(private readonly rxjsService: RxjsService) {}

  playWithRxJS(maxVal: number = 5, takeAmount: number = 10): Observable<any> {
    // quick note: using `interval` kinda sets things up for failure
    // as it is only going to work when we pass in the correct values,
    // otherwise you're guaranteed an error
    return interval(100).pipe(
      skip(1),
      take(takeAmount),
      mergeMap((val) => {
        if (val % maxVal === 0) {
          return throwError(new Error(`Val is equal to ${maxVal}`));
        }
        return of(val);
      }),
      retryWhen(this.rxjsService.genericRetryStrategy()),
      catchError((err) => {
        throw err;
      }),
    );
  }
}
