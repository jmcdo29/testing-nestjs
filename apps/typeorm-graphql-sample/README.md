<p align="center">
  <img src="./testCoverage.png"/>
</p>

# TypeORM Sample

Welcome to the example of using TypeORM with Nest and running tests! Everyone's _favorite_ topic! I decided to go with a very simple CRUD application for a single database object, but if there is enough of a demand I will extend this out to a larger repository with more objects and options. Not much else to say other than I hope this is found as helpful to the community!

# Notes:

- Added basic GraphQL based on example https://docs.nestjs.com/graphql/quick-start

## Databse Setup

- Create a Postgres database and update the connection string DATABASE_URL in src/app.module.ts
- Run this SQL statement once in your database so that you can use UUID as primary column.
  > CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

## Run Example

- Run to generate types from GraphQl schema
  > npm run codegen
  - Visit http://localhost:3000/graphql to play with GraphQL api

# Debugging in vscode:

- From debugging menu launch "Debug dev". it should start the server and attach the debugger to it and allow you to but your break points in typescripe code.
