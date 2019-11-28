import { Injectable, Logger } from '@nestjs/common';
import { Observable, interval, throwError, of } from 'rxjs';
import { RxjsService } from './rxjs/rxjs.service';
import { mergeMap, catchError, retryWhen, take, skip } from 'rxjs/operators';

@Injectable()
export class AppService {
  constructor(private readonly rxjsService: RxjsService) {}

  playWithRxJS(maxVal: number = 5, takeAmount: number = 10): Observable<any> {
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
        return of('Error: ' + err.message);
      }),
    );
  }
}
