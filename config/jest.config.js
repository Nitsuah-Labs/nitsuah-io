const nextJest = require("next/jest.js");

const createJestConfig = nextJest({
  dir: "./",
});

/** @type {import('jest').Config} */
const config = {
  coverageProvider: "v8",
  testEnvironment: "jsdom",
  rootDir: "..",
  setupFilesAfterEnv: ["<rootDir>/config/jest.setup.ts"],
  moduleDirectories: ["node_modules", "<rootDir>/"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
    "^wagmi(.*)$": "<rootDir>/__mocks__/wagmi.js",
    "^wagmi/codegen$": "<rootDir>/__mocks__/wagmi-codegen.js",
    "^viem(.*)$": "<rootDir>/__mocks__/viem.js",
    "^src/generated$": "<rootDir>/__mocks__/generated.js",
  },
  testPathIgnorePatterns: [
    "<rootDir>/node_modules/",
    "<rootDir>/.next/",
    "<rootDir>/tests/",
    "<rootDir>/.claude/",
  ],
  watchPathIgnorePatterns: ["<rootDir>/.claude/"],
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": ["babel-jest", { presets: ["next/babel"] }],
  },
  transformIgnorePatterns: [
    "^.+node_modules/(?!wagmi|viem).+$",
    "^.+\\.module\\.(css|sass|scss)$",
  ],
};

module.exports = createJestConfig(config);
