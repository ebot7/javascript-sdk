module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
};

/**
module.exports = {
  displayName: 'public-api-load-test-serverless',
  preset: '../../../jest.preset.js',
  globals: {
    'ts-jest': {
      tsConfig: '<rootDir>/tsconfig.spec.json',
    },
  },
  transform: {
    '^.+\\.[tj]s$': 'ts-jest',
  },
  moduleFileExtensions: ['ts', 'js', 'html'],
  coverageDirectory:
    '../../../coverage/backend/apps/public-api-load-test-serverless',
};
*/
