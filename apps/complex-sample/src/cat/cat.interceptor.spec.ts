import { ExecutionContext } from '@nestjs/common';
import { of } from 'rxjs';
import { CatInterceptor } from './cat.interceptor';

const returnCat = { name: 'Test Cat 1', breed: 'Test Breed 1', age: 4, id: 1 };

// create the mock CallHandler for the interceptor
const next = {
  handle: () => of(returnCat),
};

describe('CatInterceptor', () => {
  let interceptor: CatInterceptor;

  beforeEach(() => {
    interceptor = new CatInterceptor();
  });
  it('should be defined', () => {
    expect(interceptor).toBeDefined();
  });
  describe('should return the data wrapped in data object', () => {
    // we use done here to be able to tell the observable subscribe function
    // when the observable should finish. If we do not pass done
    // Jest will complain about an asynchronous task not finishing within 5000 ms.
    it('should successfully return', (done) => {
      // if your interceptor has logic that depends on the context
      // you can always pass in a mock value instead of an empty object
      // just make sure to mock the expected alls like switchToHttp
      // and getRequest
      interceptor.intercept({} as ExecutionContext, next).subscribe({
        next: (value) => {
          expect(value).toEqual({ data: returnCat });
        },
        error: (error) => {
          throw error;
        },
        complete: () => {
          done();
        },
      });
    });
  });
});
