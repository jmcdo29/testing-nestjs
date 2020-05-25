import { Injectable, Logger } from '@nestjs/common';
import { Observable, throwError, timer } from 'rxjs';
import { finalize, mergeMap } from 'rxjs/operators';
import {
  defaultRetryOptions,
  RxJSRetryOptions,
} from './interfaces/rxjs-options.interface';

@Injectable()
export class RxjsService {
  constructor(private readonly logger: Logger) {}

  genericRetryStrategy<T extends any>(
    options?: RxJSRetryOptions,
  ): (obs: Observable<T>) => Observable<number> {
    options = { ...defaultRetryOptions, ...options };
    return (obs) =>
      obs.pipe(
        mergeMap((error: any, i) => {
          i++;
          if (
            i > options.numberOfAttempts ||
            options.ignoredErrorCodes.find((e) => e === error.status)
          ) {
            return throwError(error);
          }
          return timer(options.delayTime * i);
        }),
        finalize(() =>
          this.logger.log(
            'Finished',
            RxjsService.name + ' ' + this.genericRetryStrategy.name,
          ),
        ),
      );
  }
}
