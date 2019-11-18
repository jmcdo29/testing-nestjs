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

### General

If you are creating a new test suite, first make a new application with `nest generate app <app-name>`.

Git branching is optional, but encourages to keep better track of what you are working on. In the end, make sure you make a pull request to the main repository so your changes can be merged. If your changes do not pass all the tests, you will likely be asked to make refactoring changes. Please make your changes and run the following commands:

```bash
git add .
git commit -m "your message here"
git rebase -i
# pick the commit to keep and squash or forget the rest
git push -f origin your_branch
```

This will trigger the tests to re-run as necessary.

### GitHub Actions

When creating a new test suite, please set up a new GitHub Actions workflow with a name `<app>.yml` or similar. You can take a look at the existing workflows for an idea. Please add your current branch as a trigger for the workflow by adding the `branches` property to the yml's `on` array. If you need help, lookup the [GitHub Actions workflow syntax](https://help.github.com/en/actions/automating-your-workflow-with-github-actions/workflow-syntax-for-github-actions) and go from there.

### Testing

Run all tests:

```bash
npm test
```

Run test for a specific project:

```bash
npm test -- <app-name>
# e.g. npm test -- complex-sample
```

### READMEs and Other Updates

At the very least, do your absolute best to achieve 100% test coverage for unit tests, take a screenshot and add it as `testCoverage.png` in that application's root directory. Also, add the screenshot to the applications README so everyone can see that this is a valid test strategy.

**Don’t forget to add tests and update documentation for your changes.**

**Please update npm lock file (`package-lock.json`) if you add or update dependencies.**

## Other notes

- If you have commit access to repository and want to make big change or not sure about something, make a new branch and open pull request.
- We’re using [Prettier](https://github.com/prettier/prettier) to format code, so don’t worry much about code formatting.
- We're using [Commitlint](https://github.com/conventional-changelog/commitlint) to checkout our commit messages. Please follow the expected format
- Don’t commit generated files, like minified JavaScript.
- Don’t change version number and change log.
- Make sure to add a new github workflow under the name of `<project_name>.yml`. You can use any of the others as an example
- Make sure to update the [nightly test job](./.github/workflows/cron.yml) with your new test suite

## Need help?

If you want to contribute but have any questions, concerns or doubts, feel free to ping maintainers. Ideally create a pull request with `WIP` (Work in progress) in its title and ask questions in the pull request description.
