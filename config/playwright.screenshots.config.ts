import { defineConfig, devices } from "@playwright/test";
import path from "path";

/**
 * Screenshot suite for docs/screenshots/*.png (tests/visual).
 * Output goes straight to the committed folder via snapshotPathTemplate and
 * the config rewrites every image that changed (or is missing): this suite
 * exists to regenerate the images, not to gate PRs. Run it in the Playwright Docker image (see
 * .github/workflows/visual-docs.yml); baselines drawn on another OS differ.
 */
export default defineConfig({
  testDir: "../tests/visual",
  testMatch: "**/*.spec.js",
  snapshotPathTemplate: path.resolve(
    __dirname,
    "../docs/screenshots/{arg}{ext}",
  ),
  updateSnapshots: "changed",
  fullyParallel: false,
  workers: 1,
  retries: 0,
  timeout: 60_000,
  reporter: [["list"]],
  expect: {
    toHaveScreenshot: {
      // A few antialiased pixels around the fixed theme-toggle button differ
      // between runs; below this they are not worth a bot PR.
      maxDiffPixels: 30,
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
  },
  projects: [
    {
      name: "screenshots-desktop",
      use: {
        ...devices["Desktop Chrome"],
        viewport: { width: 1440, height: 900 },
      },
    },
    {
      name: "screenshots-mobile",
      use: {
        ...devices["Desktop Chrome"],
        viewport: { width: 390, height: 844 },
        isMobile: true,
        hasTouch: true,
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
