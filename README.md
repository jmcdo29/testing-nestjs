<div align="center">

[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/) ![Continuous Integration Testing](https://github.com/jmcdo29/testing-nestjs/workflows/Continuous%20Integration%20Testing/badge.svg) [![Coffee](https://badgen.net/badge/Buy%20Me/A%20Coffee/purple?icon=kofi)](https://www.buymeacoffee.com/jmcdo29)

  <p align="center">
    <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
  </p>
</div>

# testing-nestjs

A repository to show off to the community methods of testing NestJS including Unit Tests, Integration Tests, E2E Tests, pipes, filters, interceptors, GraphQL, Mongo, TypeORM, and more!

## Project Structure

Each folder is a fully functional Nest application on its own. All you need to do after cloning the repository is move into the folder, install the dependencies, and test! Or you could just, you know, look at the test on GitHub too, no big deal.

## Motivation

I've noticed a lot of people seem to get stuck on testing, and how to do it using the utilities given to us by Nest. Hopefully with a community driven repository of tests it will help others get a better understanding and feel for how to get tests running.

## Please Note

This is not necessarily the Nest canonical way to test an application, nor is it the only way in any scenario. I will do my best to show different ways to run tests, but I will more than likely miss certain ways of running the tests, whether it is mocking in a specific way or otherwise. Again, this is a community maintained project and not a part of the official documentation. If you find other ways to test applications, great, I'd love to see them, but please do not think this is the only way.

## Running the Project

1. `git clone https://github.com/jmcdo29/testing-nestjs.git`
2. `cd testing-nestjs/<folderName>`
3. `npm install` OR `yarn add` OR `pnpm install`
4. `npm run test` OR `yarn test` OR `pnpm test`

## Contributing

Did I miss your _favorite_ topic? Did I miss out on something you absolutely **need** tested? Well then [open an issue](https://github.com/jmcdo29/testing-nestjs/issues/new), or better yet, [a pull request](https://github.com/jmcdo29/testing-nestjs/compare)! I'll be happy to look over any topics and try to help figure out how to test them or to merge any PRs that add to the value of the repository. If you do end up making a pull request, please add a screenshot of the test coverage so others can see how well the tests run. The [complex-sample](/complex-sample) branch has a good example.

## Change log

The change log can be found on the [Releases page](https://github.com/jmcdo29/testing-nestjs/releases).

## Authors and license

[Jay McDoniel](mailto:jaymcdoniel.dev) and [contributors](https://github.com/jmcdo29/testing-nestjs/graphs/contributors). Thanks to everyone who's helping with this effort!

MIT License, see the included [License.md](LICENSE) file.
