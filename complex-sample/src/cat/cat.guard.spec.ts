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
    expect(
      guard.canActivate({
        switchToHttp: () => ({
          getRequest: () => ({
            headers: {
              authorization: 'auth',
            },
          }),
        }),
      } as any),
    ).toBeTruthy();
  });
  it('should return false without auth', () => {
    expect(
      guard.canActivate({
        switchToHttp: () => ({
          getRequest: () => ({
            headers: {
              authorization: '',
            },
          }),
        }),
      } as any),
    ).toBeFalsy();
  });
});
