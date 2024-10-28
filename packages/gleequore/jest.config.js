/** @type {import('ts-jest/dist/types').JestConfigWithTsJest} */
export default {
  testMatch: [
    "<rootDir>/test/**/*.test.ts"
  ],
  preset: 'ts-jest/presets/default-esm',
  testEnvironment: 'node',
  "setupFilesAfterEnv": ["jest-extended/all"],
  collectCoverage: true,
  silent: false,
  testPathIgnorePatterns: ['functions.test.ts'],
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1',
    '^nimma/legacy$': '<rootDir>/../../node_modules/nimma/dist/legacy/cjs/index.js',
    '^nimma/fallbacks$':
      '<rootDir>/../../node_modules/nimma/dist/legacy/cjs/fallbacks/index.js',
  },
  transform: {},
}
