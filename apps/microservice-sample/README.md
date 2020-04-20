<p align="center">
  <img src="./testCoverage.png"/>
</p>

# Microservice Sample

Using e2e test to simulate the actual interactions of microservices.

```bash
npm run test:cov -- --config ./apps/microservice-sample/jest-e2e.json --runInBand --forceExit
```

- `--forceExit` flag is added as the test will stuck without reason. Jest's `--detectOpenHandles` flag is not helping.
