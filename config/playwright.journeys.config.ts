import { defineConfig, devices } from "@playwright/test";
import path from "path";

/**
 * Nightly journeys (tests/journeys): the happy paths a visitor takes, with a
 * viewport baseline per step. Contract:
 * https://github.com/nitsuah/.github/blob/main/journeys/STANDARD.md
 *
 * Baselines are Linux-only and drawn in the Playwright image
 * (config/Dockerfile.test). Failures are filed as bot:journey issues by
 * .github/workflows/journeys.yml.
 */
export default defineConfig({
  testDir: "../tests/journeys",
  testMatch: "**/*.spec.js",
  // Linux-only baselines (always generated in the Playwright Docker image).
  snapshotPathTemplate:
    "{testDir}/__screenshots__/{testFilePath}/{testName}/{arg}{ext}",
  // A missing baseline fails in CI instead of being silently written.
  updateSnapshots: process.env.CI ? "none" : "missing",
  // The journeys share one production server.
  fullyParallel: false,
  workers: 1,
  retries: process.env.CI ? 1 : 0, // pass-on-retry = flaky, not an issue
  timeout: 60_000,
  reporter: [
    ["list"],
    [
      "json",
      { outputFile: path.resolve(__dirname, "../journeys-report/report.json") },
    ],
  ],
  expect: {
    toHaveScreenshot: {
      // Set from measured noise (see tests/journeys/README.md).
      maxDiffPixels: 20,
      animations: "disabled",
      caret: "hide",
      scale: "css",
    },
  },
  use: {
    baseURL: process.env.BASE_URL || "http://localhost:3000",
    colorScheme: "dark",
    locale: "en-US",
    timezoneId: "UTC",
    serviceWorkers: "block",
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
  },
  projects: [
    {
      name: "journeys",
      // The viewport lives here: a project's device preset overrides a
      // top-level `use.viewport`.
      use: {
        ...devices["Desktop Chrome"],
        viewport: { width: 1440, height: 900 },
      },
    },
  ],
  webServer: {
    command: "npm run start",
    url: "http://localhost:3000",
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
    env: { NEXT_PUBLIC_TEST_HELPERS: "1" },
  },
});
