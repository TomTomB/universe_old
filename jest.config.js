module.exports = {
  preset: '@vue/cli-plugin-unit-jest/presets/typescript-and-babel',
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/renderer/$1"
  },
  transform: {
    '^.+\\.vue$': 'vue-jest'
  },
  testMatch: ["**/__tests__/**/*.[jt]s?(x)", "**/?(*.)+(spec|test).[jt]s?(x)"],
  testPathIgnorePatterns: ["/node_modules/", "/tests/e2e/"]
}
