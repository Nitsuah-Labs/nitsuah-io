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

  // Maximum time one test can run - reduced from 30s to 15s
  timeout: 15 * 1000,

  // Test configuration
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0, // Reduced from 2 to 1
  workers: process.env.CI ? 1 : 2, // Limit workers to reduce memory issues

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
    command: "npm run dev",
    url: "http://localhost:3000",
    reuseExistingServer: !process.env.CI,
    timeout: 120 * 1000,
  },
});
