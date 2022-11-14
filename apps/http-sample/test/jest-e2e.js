const e2eBaseConfig = require('../../../jest.e2e');

module.exports = {
  ...e2eBaseConfig,
  moduleNameMapper: {
    '^axios$': require.resolve('axios'),
  },
};
