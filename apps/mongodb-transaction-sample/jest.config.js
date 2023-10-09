const baseConfig = require('../../jest.config');

module.exports = {
  displayName: 'mongodb-transaction-sample',
  ...baseConfig,
  snapshotFormat: { escapeString: true, printBasicPrototype: true },
};
