const baseConfig = require('../../jest.config');

module.exports = {
  displayName: 'mongodb-transaction-sample',
  ...baseConfig,
  snapshotFormat: { escapeString: true, printBasicPrototype: true },
  // preset: '../../jest.preset.js',
  // testEnvironment: 'node',
  // transform: {
  //   '^.+\\.[tj]s$': ['ts-jest', { tsconfig: '<rootDir>/tsconfig.spec.json' }],
  // },
  // moduleFileExtensions: ['ts', 'js', 'html'],
  // coverageDirectory: '../../coverage/apps/mongodb-transaction-sample',
};
