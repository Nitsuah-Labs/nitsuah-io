import { defineConfig, devices } from "@playwright/test";

/**
 * Playwright configuration for nitsuah.io testing
 *
 * Includes:
 * - Visual regression testing
 * - Functional E2E testing
 * - Accessibility testing
 * - Responsive design testing (mobile/tablet/desktop)
 */
export default defineConfig({
  testDir: "./tests",

  // Global setup to clean WalletConnect state
  globalSetup: require.resolve("./tests/global-setup"),

  // Maximum time one test can run - increased for visual tests with Spline
  timeout: 30 * 1000,

  // Test configuration
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  workers: process.env.CI ? 1 : 2,

  // Reporter configuration - simplified for speed
  reporter: "list",

  // Shared settings for all projects
  use: {
    // Base URL for tests
    baseURL: process.env.BASE_URL || "http://localhost:3000",

    // Collect trace on first retry
    trace: "on-first-retry",

    // Screenshot on failure
    screenshot: "only-on-failure",

    // Video on failure
    video: "retain-on-failure",
  },

  // Use platform-agnostic snapshot paths to avoid Windows/Linux baseline conflicts
  snapshotPathTemplate:
    "{testDir}/{testFileDir}/{testFileName}-snapshots/{arg}{ext}",

  // Configure projects for different browsers and viewports
  // REDUCED: Only run Chromium for speed - add others back for full testing
  projects: [
    // Desktop browsers
    {
      name: "chromium-desktop",
      use: { ...devices["Desktop Chrome"] },
    },
    // Commented out for speed - uncomment for full cross-browser testing
    // {
    //   name: "firefox-desktop",
    //   use: { ...devices["Desktop Firefox"] },
    // },
    // {
    //   name: "webkit-desktop",
    //   use: { ...devices["Desktop Safari"] },
    // },
    // {
    //   name: "mobile-chrome",
    //   use: { ...devices["Pixel 5"] },
    // },
    // {
    //   name: "mobile-safari",
    //   use: { ...devices["iPhone 12"] },
    // },
    // {
    //   name: "tablet-ipad",
    //   use: { ...devices["iPad Pro"] },
    // },
  ],

  // Run local dev server before starting tests
  webServer: {
    command: process.env.CI
      ? "npm run build:ci && npm run start"
      : "npm run dev",
    url: "http://localhost:3001",
    // If test helpers are enabled, force Playwright to start its own dev server
    // If test helpers are enabled, force Playwright to start its own dev server
    reuseExistingServer:
      process.env.NEXT_PUBLIC_TEST_HELPERS === "1" ? false : !process.env.CI,
    timeout: 120 * 1000,
    // forward NEXT_PUBLIC_TEST_HELPERS to the dev server so pages can render test helpers
    env: {
      NEXT_PUBLIC_TEST_HELPERS: process.env.NEXT_PUBLIC_TEST_HELPERS ?? "",
      PORT: process.env.PORT ?? "3001",
    },
  },
});
