
const {defaults} = require('jest-config');
module.exports = { 
  displayName: {
    name: 'ebot7-JS-SDK',
    color: 'blue',
  },
  testTimeout: 15000,
  preset: 'ts-jest',
  testEnvironment: 'node',
  transform: {
    '^.+\\.(ts|tsx)?$': 'ts-jest',
  },
  moduleFileExtensions: [...defaults.moduleFileExtensions, 'ts', 'tsx'],
  "testPathIgnorePatterns" : [
    "/node_modules/",
    "<rootDir>/build/module/",
  ]
};

