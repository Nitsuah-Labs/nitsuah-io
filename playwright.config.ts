import { defineConfig, devices } from "@playwright/test";

const CI_TIMEOUT = 45_000; // 45s for CI — enough time for SSR pages, fails fast on real hangs
const LOCAL_TIMEOUT = 60_000; // 1 minute for local development
const CI_WORKERS = Number(process.env.PLAYWRIGHT_WORKERS || "1");

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
  timeout: process.env.CI ? CI_TIMEOUT : LOCAL_TIMEOUT,

  // Test configuration
  fullyParallel: !process.env.CI,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0, // 1 retry in CI to catch transient flakes without multiplying timeout cost
  // Use a single worker in CI by default to avoid production-server/resource
  // contention on GitHub runners. Allow overriding via PLAYWRIGHT_WORKERS.
  // For local runs, use 50% of cores to prevent overwhelming high-core machines.
  workers: process.env.CI ? CI_WORKERS : "50%",

  // Reporter configuration - include GitHub reporter for CI
  reporter: process.env.CI ? [["list"], ["github"]] : "list",

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

  // Include platform in snapshot paths so Windows and Linux baselines don't
  // conflict. Missing snapshots are created automatically on first run.
  snapshotPathTemplate:
    "{testDir}/{testFileDir}/{testFileName}-snapshots/{arg}-{platform}{ext}",
  updateSnapshots: "missing",

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
    // Note: Requires .next build directory to exist (run `npm run build:skip-wagmi` first)
    command: "npm run start",
    url: "http://localhost:3000",
    // Allow reusing existing server in development (but not in CI for clean state)
    reuseExistingServer: !process.env.CI,
    // Increased timeout for CI environment - server needs time to fully start
    timeout: process.env.CI ? 120 * 1000 : 60 * 1000, // Set to 2 min to match test timeout
    // forward NEXT_PUBLIC_TEST_HELPERS to the server so pages can render test helpers
    env: {
      NEXT_PUBLIC_TEST_HELPERS: process.env.NEXT_PUBLIC_TEST_HELPERS ?? "",
    },
    // Add stdout/stderr to see server logs
    stdout: "pipe",
    stderr: "pipe",
  },
});
