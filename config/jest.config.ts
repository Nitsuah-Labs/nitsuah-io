import type { Config } from 'jest';
import nextJest from 'next/jest.js';

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files
  dir: './',
});

// Add any custom config to be passed to Jest
const config: Config = {
  coverageProvider: 'v8',
  testEnvironment: 'jsdom',
  // The root of your source code, so Jest can find your files
  rootDir: '..',
  // Add more setup options before each test is run
  setupFilesAfterEnv: ['<rootDir>/config/jest.setup.ts'],
  moduleDirectories: ['node_modules', '<rootDir>/'],
  // Map module paths and mock ESM-heavy third-party modules to local mocks to avoid transform issues
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  '^wagmi(.*)$': '<rootDir>/__mocks__/wagmi.js',
  '^viem(.*)$': '<rootDir>/__mocks__/viem.js',
  },
  testPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/.next/'],
  transform: {
    // Use babel-jest to transpile tests with the next/babel preset
    '^.+\\.(js|jsx|ts|tsx)$': ['babel-jest', { presets: ['next/babel'] }],
  },
  // Allow transforming certain ESM node_modules (e.g. wagmi, viem) so Jest can parse them
  // Only ignore transforming node_modules except wagmi and viem (they ship ESM)
  transformIgnorePatterns: [
    '^.+node_modules/(?!wagmi|viem).+$',
    '^.+\\.module\\.(css|sass|scss)$',
  ],
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
export default createJestConfig(config);
