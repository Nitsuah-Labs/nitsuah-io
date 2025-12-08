const nextJest = require("next/jest");

const createJestConfig = nextJest({ dir: "./" });

const config = {
  coverageProvider: "v8",
  testEnvironment: "<rootDir>/config/jest-environment.js",
  rootDir: "./",
  setupFilesAfterEnv: ["<rootDir>/config/jest.setup.ts"],
  moduleDirectories: ["node_modules", "<rootDir>/"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
    "^wagmi(.*)$": "<rootDir>/__mocks__/wagmi.js",
    "^wagmi/codegen$": "<rootDir>/__mocks__/wagmi-codegen.js",
    "^viem(.*)$": "<rootDir>/__mocks__/viem.js",
    "^src/generated$": "<rootDir>/__mocks__/generated.js",
  },
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": ["babel-jest", { presets: ["next/babel"] }],
  },
  transformIgnorePatterns: [
    "^.+node_modules/(?!wagmi|viem).+$",
    "^.+\\.module\\.(css|sass|scss)$",
  ],
  testPathIgnorePatterns: ["<rootDir>/node_modules/", "<rootDir>/.next/"],
};

module.exports = createJestConfig(config);
