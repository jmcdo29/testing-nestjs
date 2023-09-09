import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Cat } from './models/cats';

@Injectable()
export class CatInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<Cat>,
  ): Observable<{ data: Cat }> {
    return next.handle().pipe(map((data) => ({ data })));
  }
}
