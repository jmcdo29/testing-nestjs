# How to contribute

We love pull requests. And following this guidelines will make your pull request easier to merge.

If you want to contribute but don’t know what to do, take a look at these two labels: [help wanted](https://github.com/jmcdo29/testing-nestjs/issues?q=is%3Aissue+is%3Aopen+label%3A%22help+wanted%22) and [good first issue](https://github.com/jmcdo29/testing-nestjs/issues?q=is%3Aissue+is%3Aopen+label%3A%22good+first+issue%22).

_[Use GitHub interface](https://blog.sapegin.me/all/open-source-for-everyone/) for simple documentation changes, otherwise follow the steps below._

## Prerequisites

- If it’s your first pull request, watch [this amazing course](http://makeapullrequest.com/) by [Kent C. Dodds](https://twitter.com/kentcdodds).
- Install [EditorConfig](http://editorconfig.org/) plugin for your code editor to make sure it uses correct settings.
- Fork the repository and clone your fork.
- Install dependencies: `npm install`.

## Development workflow

Run linters and tests:

```bash
npm test
```

Or run tests in watch mode:

```bash
npm run test:watch
```

**Don’t forget to add tests and update documentation for your changes.**

**Please update npm lock file (`package-lock.json`) if you add or update dependencies.**

## Other notes

- If you have commit access to repository and want to make big change or not sure about something, make a new branch and open pull request.
- We’re using [Prettier](https://github.com/prettier/prettier) to format code, so don’t worry much about code formatting.
- Don’t commit generated files, like minified JavaScript.
- Don’t change version number and change log.

## Need help?

If you want to contribute but have any questions, concerns or doubts, feel free to ping maintainers. Ideally create a pull request with `WIP` (Work in progress) in its title and ask questions in the pull request description.
