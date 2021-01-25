module.exports = (config = {}) => ({
  clearMocks: true,
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['*.spec.ts', '*.spec.tsx'],
  ...config,
});
