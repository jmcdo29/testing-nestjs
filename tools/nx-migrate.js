const { readFileSync, writeFileSync } = require('fs');
const { join } = require('path');

const workspaceFilePath = join(process.cwd(), 'workspace.json');

const getWorkspaceFileAsJson = () => {
  const file = readFileSync(workspaceFilePath).toString();
  return JSON.parse(file);
};

const generateBuildScript = (packageName) => {
  const tsconfigFileName = join(
    process.cwd(),
    'apps',
    packageName,
    'tsconfig.app.json',
  );
  const tsconfigFile = `{
  "extends": "../../tsconfig.build.json",
  "include": ["src/**/*"],
}`;
  writeFileSync(tsconfigFileName, tsconfigFile);
  return {
    executor: '@nx/node:build',
    options: {
      tsConfig: `apps/${packageName}/tsconfig.app.json`,
      main: `apps/${packageName}/src/main.ts`,
      outputPath: `dist/apps/${packageName}`,
    },
  };
};

const generateTestScript = (packageName) => {
  const jestFilePath = join(
    process.cwd(),
    'apps',
    packageName,
    'jest.config.js',
  );
  const jestConfig = `const baseConfig = require('../../jest.config')

module.exports = {
  ...baseConfig
}`;
  writeFileSync(jestFilePath, jestConfig);
  return {
    executor: '@nx/jest:jest',
    options: {
      jestConfig: `apps/${packageName}/jest.config.js`,
    },
  };
};

const generateE2EScript = (packageName) => {
  const jestE2eFilePath = join(
    process.cwd(),
    'apps',
    packageName,
    'test',
    'jest-e2e.js',
  );
  const e2eConfig = `const e2eBaseConfig = require('../../../jest.e2e');

module.exports = {
  ...e2eBaseConfig,
};`;
  writeFileSync(jestE2eFilePath, e2eConfig);
  return {
    executor: '@nx/jest:jest',
    options: {
      jestConfig: `apps/${packageName}/test/jest-e2e.js`,
    },
  };
};

const generateProject = (packageName) => {
  return {
    root: `apps/${packageName}`,
    sourceRoot: `apps/${packageName}/src`,
    targets: {
      build: generateBuildScript(packageName),
      test: generateTestScript(packageName),
      e2e: generateE2EScript(packageName),
    },
  };
};

const workspaceJson = getWorkspaceFileAsJson();

Object.keys(workspaceJson.projects).forEach((project) => {
  workspaceJson.projects[project] = generateProject(project);
});

writeFileSync(workspaceFilePath, JSON.stringify(workspaceJson, null, 2));
