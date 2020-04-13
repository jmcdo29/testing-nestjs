<p align="center">
  <img src="./testCoverage.png"/>
</p>

# TypeORM Sample

Welcome to the example of using TypeORM with Nest and running tests! Everyone's _favorite_ topic! I decided to go with a very simple CRUD application for a single database object, but if there is enough of a demand I will extend this out to a larger repository with more objects and options. Not much else to say other than I hope this is found as helpful to the community!

## Side Note

For this application, I have added a side package called `@golevelup/nestjs-testing` (name subject to change) to help with mocking Repository objects without needing to create the entire mock on your own. You can find this [specific use here](./src/cat/cat.service.create-mock.spec.ts).

## Cat Integration Test Setup

In order to run the `cat.integration.spec.ts` test, you need access to a PostgreSQL database. There are two ways you can do that.

**Note:** You only need to follow **ONE** of these steps to have a working version of PostgreSQL.

### Method 1: Running PostgreSQL in docker-compose

A docker-compose file already exists which can spin up a database instance for you on the fly. All you have to do is start it in a shell.

```
cd testing-nestjs/apps/typeorm-sample
docker-compose up
```

After this, in another terminal window, simply run

```
npm run test
```

or specify a test or set of tests you want to run using:

```
npm run test:watch
```

### Method 2: Installing PostgreSQL on your machine

Similarly, you can install PostgreSQL on your computer. [This](https://tecadmin.net/install-postgresql-server-on-ubuntu/) tutorial explains how to do this on Ubuntu.

Once installed, run postgres and create a new user.

For this test, the credentials are as follows, but you are free to modify them if you wish (just make sure to update the environment variables after as explained below!):

```
user: rm
password: root
```

You can execute this command to create a new user in pg:

```
CREATE USER rm WITH PASSWORD root;
```

Once a user is created, it's time to create a database in order to run the test. To do so, execute the following commands in postgres:

```
drop database cat_test_db;
create database cat_test_db;
GRANT ALL PRIVILEGES ON DATABASE "cat_test_db" to rm;
```

Before running the tests, make sure that the following environment variables are set in your shell `.rc` file:

```
POSTGRES_USER: rm
POSTGRES_PASSWORD: root
POSTGRES_DB: cat_test_db
POSTGRES_HOST: localhost
POSTGRES_PORT: 5432
```
