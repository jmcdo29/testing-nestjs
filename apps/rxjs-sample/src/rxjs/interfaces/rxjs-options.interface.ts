export interface RxJSRetryOptions {
  numberOfAttempts: number;
  delayTime: number;
  ignoredErrorCodes: any[];
}

export const defaultRetryOptions: RxJSRetryOptions = {
  numberOfAttempts: 3,
  delayTime: 100,
  ignoredErrorCodes: [],
};
