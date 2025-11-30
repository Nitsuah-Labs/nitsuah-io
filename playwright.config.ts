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

  // Maximum time one test can run - increased for CI stability
  timeout: process.env.CI ? 180 * 1000 : 120 * 1000,

  // Test configuration
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  workers: process.env.CI ? 1 : 2,

  // Reporter configuration - simplified for speed
  reporter: "list",

  // Shared settings for all projects
  use: {
    // Base URL for tests (match webServer.url)
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

  // Run local server before starting tests
  webServer: {
    // Use production server for more stable, pre-compiled pages
    command: "npm run start",
    url: "http://localhost:3000",
    // Allow reusing existing server in development (but not in CI for clean state)
    reuseExistingServer: !process.env.CI,
    timeout: process.env.CI ? 120 * 1000 : 60 * 1000,
    // forward NEXT_PUBLIC_TEST_HELPERS to the server so pages can render test helpers
    env: {
      NEXT_PUBLIC_TEST_HELPERS: process.env.NEXT_PUBLIC_TEST_HELPERS ?? "",
    },
  },
});
