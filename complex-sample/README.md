<p align="center">
  <img src="./testCoverage.png"/>
</p>

# Complex Sample

So, this really is more of an intermediately complex example, as it only scratches the surface of getting into a lot of mocking. The test classes give this project 100% statement, line, branch, and function coverage, and also has all E2E tests passing with both mocking and non mocking examples.

## Hangups

I will admit that the interceptor is not mocked in the E2E test, as I was having trouble figuring out how to correctly mock it so that the data given would work out as expected. The Unit Test for the interceptor does show how mocking can be achieved for line coverage.

### UPDATE

Interceptor mocking is now added in to show it _is_ possible and _easy_ to do!

## Acknowledgements

We created our own ParseIntPipe even though Nest provides one just to show how to go about testing with multiple pipes. This is absolutely not necessary and only done in the scope of this example, normally you should use given tools if you trust the authors.

## Future Additions

Filters can be added in the future to make for even better example of tests.

## Closing Remarks

Do note that while the non-mocked E2E test looks cleaner and easier to deal with, it is also a lot more prone to breaking as it very closely depends on the logic implemented in the CatsService. If that logic changes, the test will fail, while for the most part, the mocked variant will pass. Just as in the unit tests, it is possible to get each provider individually so that you can mock in each function as your heart desires. _(Note to self: I should add that in)_
