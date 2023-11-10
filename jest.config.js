/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
export default {
  testMatch: [
    "<rootDir>/test/**/*.test.ts"
  ],
  preset: 'ts-jest/presets/default-esm',
  testEnvironment: 'node',
  setupFilesAfterEnv: ['./jest.setup.ts'],
  collectCoverage: true,
  silent: false,
  testPathIgnorePatterns: ['functions.test.ts'],
  globals: {
    'ts-jest': {
      useESM: true
    },
  },
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1',
    '^nimma/legacy$': '<rootDir>/node_modules/nimma/dist/legacy/cjs/index.js',
    '^nimma/fallbacks$':
      '<rootDir>/node_modules/nimma/dist/legacy/cjs/fallbacks/index.js',
  },
  transform: {},
}
