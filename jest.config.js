module.exports = {
  preset: '@vue/cli-plugin-unit-jest/presets/typescript-and-babel',
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/renderer/$1"
  },
  transform: {
    '^.+\\.vue$': 'vue-jest'
  }
}
