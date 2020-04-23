# E2E Redis Example

This app should be used in conjuction with `e2e-redis-publisher-sample` app.

## Running Test

Start both services with the following commands:

```bash
nest start e2e-redis-publisher-sample
```

In another terminal:

```bash
nest start e2e-redis-subscriber-sample
```

At the root of the project, you can run the e2e test with:

```bash
PUBLISHER_URL=http://localhost:3000 npm run test e2e-testing/e2e-redis.spec.ts -- --config jest.e2e.js
```
