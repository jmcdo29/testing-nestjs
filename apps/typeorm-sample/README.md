<p align="center">
  <img src="./testCoverage.png"/>
</p>

# TypeORM Sample

Welcome to the example of using TypeORM with Nest and running tests! Everyone's _favorite_ topic! I decided to go with a very simple CRUD application for a single database object, but if there is enough of a demand I will extend this out to a larger repository with more objects and options. Not much else to say other than I hope this is found as helpful to the community!

## Side Note

For this application, I have added a side package called `@golevelup/nestjs-testing` (name subject to change) to help with mocking Repository objects without needing to create the entire mock on your own. You can find this [specific use here](./src/cat/cat.service.create-mock.spec.ts).
