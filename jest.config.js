module.exports = {
  preset: '@vue/cli-plugin-unit-jest/presets/typescript-and-babel',
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/renderer/$1",
    "^@universe/mocks/(.*)$": "<rootDir>/src/mocks/$1",
    "^@universe/types/(.*)$": "<rootDir>/src/types/$1",
    "^@universe/shared/(.*)$": "<rootDir>/src/shared/$1"
  },
  transform: {
    '^.+\\.vue$': 'vue-jest'
  },
  testMatch: ["**/__tests__/**/*.[jt]s?(x)", "**/?(*.)+(spec|test).[jt]s?(x)"],
  testPathIgnorePatterns: ["/node_modules/", "/tests/e2e/"],
}
