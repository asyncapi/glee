/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
export default {
  preset: 'ts-jest/presets/default-esm',
  testEnvironment: 'node',
  setupFilesAfterEnv: ['./jest.setup.ts'],
  collectCoverage: true,
  setupFiles: ['core-js'],
  silent: false,
  testPathIgnorePatterns: ['functions.test.ts'],
  globals: {
    'ts-jest': {
      useESM: true
    },
  },
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1',
  },
}