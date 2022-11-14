const baseConfig = require('../../jest.config');

module.exports = {
  ...baseConfig,
  moduleNameMapper: {
    '^axios$': require.resolve('axios'),
  },
};
