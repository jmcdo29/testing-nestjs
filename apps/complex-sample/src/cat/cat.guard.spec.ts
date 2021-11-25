import { createMock } from '@golevelup/ts-jest';
import { ExecutionContext } from '@nestjs/common';
import { CatGuard } from './cat.guard';

describe('CatGuard', () => {
  let guard: CatGuard;

  beforeEach(() => {
    guard = new CatGuard();
  });

  it('should be defined', () => {
    expect(guard).toBeDefined();
  });
  it('should return true with auth', () => {
    const context = createMock<ExecutionContext>();

    context.switchToHttp().getRequest.mockReturnValue({
      headers: {
        authorization: 'auth',
      },
    });

    expect(guard.canActivate(context)).toBeTruthy();
  });
  it('should return false without auth', () => {
    const context = createMock<ExecutionContext>();

    expect(guard.canActivate(context)).toBeFalsy();
    expect(context.switchToHttp).toBeCalledTimes(1);
  });
});
