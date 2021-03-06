module.exports = {
  preset: 'ts-jest/presets/js-with-ts',
  testEnvironment: 'node',
  coveragePathIgnorePatterns: [
    '/node_modules/',
    '/coverage/',
    'dist/',
    '(.test)\\.(ts|tsx|js)$',
    'jest.transform.js',
    '.json',
  ],
};
