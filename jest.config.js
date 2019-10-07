// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html

module.exports = {
  clearMocks: true,
  collectCoverage: true,
  collectCoverageFrom: ['dist/**/*.js'],
  coverageDirectory: 'coverage',
  transform: {
    '^.+\\.(js|jsx)?$': 'babel-jest'
  },
  testEnvironment: 'node',
  testMatch: ['<rootDir>/test/**/*.test.js']
}
