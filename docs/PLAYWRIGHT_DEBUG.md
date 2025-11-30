# Playwright Test Failures - Debugging Report

## Issue Summary
All Playwright E2E tests failing in CI with blank/empty page rendering. Tests pass locally but fail consistently in GitHub Actions CI environment.

## Symptoms
- **50+ tests failing** with identical error pattern
- `TimeoutError: page.waitForSelector: Timeout 10000ms exceeded` waiting for `main, body`
- `Cannot read properties of null (reading 'documentElement')` 
- `element(s) not found` for basic page elements (header, footer, main)
- All pages rendering as blank/empty HTML

## Evidence from CI Logs

### Test Failure Pattern
```
TimeoutError: page.waitForSelector: Timeout 10000ms exceeded.
Call log:
  - waiting for locator('main, body')
```

### Affected Tests (All)
- All accessibility tests (13 failed)
- All resume tests (8 failed)
- All E2E wallet connection tests (9 failed)
- All visual/homepage tests (4 failed)
- All visual/resume tests (9 failed)
- All visual/projects tests (2 failed)
- All visual/labs tests (4 failed)

## Root Cause Analysis

### Primary Hypothesis: Client-Side Hydration Failure in CI
The Next.js dev server starts successfully but React fails to hydrate, leaving blank pages.

**Evidence:**
1. Dev server starts (we see baseline-browser-mapping warnings = dev server running)
2. Tests run (no connection errors to localhost:3000)
3. Pages load but have NO content (timeouts waiting for elements)
4. Error: `Cannot read properties of null (reading 'documentElement')` = DOM is null

### Contributing Factors

#### 1. Wagmi/WalletConnect Initialization
The app uses WalletConnect which creates persistent connections. In CI:
- Headless browser environment
- No crypto wallet extensions
- Could block/hang React rendering

**Evidence in code:**
- `src/wagmi.ts` creates WalletConnect config
- `src/app/providers.tsx` wraps entire app in `WagmiProvider`
- If WalletConnect hangs, entire app won't render

#### 2. Race Condition - Server Not Fully Ready
Playwright config waits for server on port 3000, but:
- Server might respond to HTTP before Next.js is ready
- First render could be incomplete
- 120s timeout might not be enough for cold start

#### 3. Test Helper Scripts Not Applied
Environment variable `NEXT_PUBLIC_TEST_HELPERS=1` set in CI, but:
- Test helper CSS not being applied (diagnostic test shows `false`)
- Test helper scripts may not be running
- This could cause pages to render incorrectly

#### 4. CI Environment Resource Constraints
- Limited memory in GitHub Actions runners
- Chromium browser in headless mode
- 4 parallel workers competing for resources
- Could cause silent OOM or process crashes

## Diagnostic Test Results (Local)

```
HTML length: 42921 ✓
Has Next.js root: 1 ✓
Element counts - main: 1 header: 1 footer: 0 ✓
Console errors: [] ✓
Has test-helpers class: false ✗ (even with NEXT_PUBLIC_TEST_HELPERS=1)
```

**Key Finding:** Pages render fine locally, suggesting CI-specific environment issue.

## Proposed Fixes (Priority Order)

### Fix 1: Add Explicit Wait for Hydration
**Problem:** Tests start before React hydration completes
**Solution:** Wait for React root to be present and for specific app markers

```typescript
// In tests/accessibility/all-pages.spec.ts
await page.goto(pageInfo.path);
await page.waitForLoadState("networkidle");

// NEW: Wait for React hydration
await page.waitForSelector("#__next", { state: "attached", timeout: 15000 });
await page.waitForFunction(() => {
  return document.querySelector('main, body')  !== null &&
         document.body.children.length > 0;
}, { timeout: 15000 });
```

### Fix 2: Make Wagmi Provider CI-Safe
**Problem:** WalletConnect might hang in headless CI
**Solution:** Add timeout and fallback for provider initialization

```typescript
// In src/app/providers.tsx
export function Providers({ children }: { children: React.ReactNode }) {
  const [isReady, setIsReady] = React.useState(false);
  
  React.useEffect(() => {
    // In test/CI environments, mark ready immediately
    if (process.env.NEXT_PUBLIC_TEST_HELPERS === '1') {
      setIsReady(true);
    } else {
      // Small delay to ensure providers initialize
      const timer = setTimeout(() => setIsReady(true), 100);
      return () => clearTimeout(timer);
    }
  }, []);
  
  // Render children immediately in test mode, otherwise wait
  if (!isReady && process.env.NEXT_PUBLIC_TEST_HELPERS !== '1') {
    return <div data-testid="providers-loading">Loading...</div>;
  }
  
  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <ToastProvider />
        {children}
      </QueryClientProvider>
    </WagmiProvider>
  );
}
```

### Fix 3: Increase Playwright Timeouts & Add Health Check
**Problem:** Default timeouts too aggressive for CI cold starts
**Solution:** Increase timeouts and add proper health check

```typescript
// In playwright.config.ts
export default defineConfig({
  // Increase timeout for CI
  timeout: process.env.CI ? 180 * 1000 : 120 * 1000,
  
  webServer: {
    command: "npm run dev",
    url: "http://localhost:3000",
    reuseExistingServer: !process.env.CI,
    timeout: 180 * 1000,
    
    // NEW: Add health check that verifies pages actually render
    healthCheck: async () => {
      const response = await fetch("http://localhost:3000");
      const html = await response.text();
      // Verify we got actual HTML, not empty response
      return html.length > 1000 && html.includes('<body');
    },
  },
});
```

### Fix 4: Reduce Test Parallelism in CI
**Problem:** 4 parallel workers may overwhelm CI resources
**Solution:** Reduce to 1 worker to avoid resource contention

```yaml
# In .github/workflows/ci.yml
- name: Run Playwright tests (parallel)
  run: npm run test:e2e
  env:
    PLAYWRIGHT_WORKERS: 1  # Changed from 4
    NEXT_PUBLIC_TEST_HELPERS: 1
```

### Fix 5: Add Diagnostic Test to CI
**Problem:** Hard to debug without seeing what's actually rendered
**Solution:** Run diagnostic test first to capture evidence

```yaml
- name: Run diagnostic test first
  run: npx playwright test tests/diagnostics/page-rendering.spec.ts --reporter=line
  continue-on-error: true
  
- name: Run full test suite
  run: npm run test:e2e
```

## Immediate Next Steps

1. **Push diagnostic test** to see what CI actually renders
2. **Implement Fix 1** (explicit hydration wait) - lowest risk, high impact
3. **Implement Fix 4** (reduce parallelism) - easy, rules out resource issues
4. **If still failing**: Implement Fix 2 (safer provider initialization)
5. **If still failing**: Implement Fix 3 (custom health check)

## Questions for User

1. Did this issue start after a recent change, or has it always been broken?
2. Are there any CI environment variables or secrets that might be missing?
3. Has the app ever worked with Playwright in CI before?
4. Should we consider using production build instead of dev server for tests?

## Additional Debugging Commands

```bash
# Run single test with full debug output
PWDEBUG=1 npx playwright test tests/diagnostics/page-rendering.spec.ts --headed

# Capture network traffic
npx playwright test --trace on

# Run with video recording
npx playwright test --video on

# Check what dev server is actually serving
curl http://localhost:3000 > /tmp/homepage.html
cat /tmp/homepage.html | wc -l  # Should be >100 lines
```

## Related Files to Review
- `tests/accessibility/all-pages.spec.ts` - Main failing test
- `src/app/providers.tsx` - Provider initialization
- `src/wagmi.ts` - WalletConnect config
- `playwright.config.ts` - Test configuration
- `.github/workflows/ci.yml` - CI pipeline
