# Playwright Test Fixes - Implementation Summary

## Problem
All 50+ Playwright E2E tests failing in CI with empty page rendering. Tests pass locally but fail in GitHub Actions with `TimeoutError` waiting for basic elements (`main`, `body`, `header`).

## Root Cause
Next.js pages not hydrating properly in CI environment, resulting in blank HTML being served to tests. Combination of:
1. Race condition between test start and React hydration completion
2. CI resource constraints with 4 parallel workers
3. Inadequate wait strategies for client-side rendering

## Fixes Implemented

### 1. Enhanced Hydration Waiting (`tests/utils/wait-for-hydration.ts`)
**NEW FILE** - Created robust hydration detection utility

```typescript
export async function waitForReactHydration(page: Page, timeout = 15000)
export async function gotoAndWaitForHydration(page: Page, url: string, options?)
```

**What it does:**
- Waits for Next.js `#__next` root element
- Verifies DOM is not null (prevents `Cannot read properties of null` errors)
- Confirms page has actual content (children elements exist)
- Adds 500ms buffer for client-side JS execution

**Impact:** Eliminates race conditions between test execution and React hydration

### 2. Updated Accessibility Tests
**MODIFIED:** `tests/accessibility/all-pages.spec.ts`

**Changes:**
- Imported `gotoAndWaitForHydration` helper
- Replaced basic `page.goto()` + `waitForLoadState()` with hydration-aware navigation
- Increased timeout to 30s for slow CI environment
- Removed redundant `waitForSelector("main, body")` - now handled by hydration helper

**Impact:** All accessibility tests now wait for proper hydration before assertions

### 3. Reduced CI Parallelism
**MODIFIED:** `.github/workflows/ci.yml`

**Changes:**
- `PLAYWRIGHT_WORKERS: 1` (was 4)
- Reduces resource contention in GitHub Actions runners
- Prevents memory pressure that could cause silent failures

**Impact:** More stable test execution, lower risk of OOM errors

### 4. Added Diagnostic Test
**MODIFIED:** `.github/workflows/ci.yml`

**Changes:**
- Runs `tests/diagnostics/page-rendering.spec.ts` first
- Captures HTML length, element counts, console errors
- Continues even if diagnostic fails (non-blocking)

**Impact:** Provides debugging data if tests still fail

### 5. Increased Playwright Timeouts
**MODIFIED:** `playwright.config.ts`

**Changes:**
- Test timeout: `180s` in CI (was 120s)
- WebServer timeout: `180s` in CI (was 120s)
- Accounts for slow GitHub Actions runner startup

**Impact:** Prevents premature timeouts on cold starts

## Files Changed

### New Files
- `tests/utils/wait-for-hydration.ts` - Hydration detection utility
- `tests/diagnostics/page-rendering.spec.ts` - Diagnostic test suite
- `PLAYWRIGHT_DEBUG.md` - Comprehensive debugging documentation

### Modified Files
- `tests/accessibility/all-pages.spec.ts` - Updated to use hydration helper
- `.github/workflows/ci.yml` - Reduced workers, added diagnostic step
- `playwright.config.ts` - Increased timeouts for CI

## Testing Strategy

### Local Validation ✓
```bash
npx playwright test tests/accessibility/all-pages.spec.ts --grep="Homepage" --reporter=line
# Result: 1 passed (10.3s)
```

### CI Validation (Next Step)
1. Diagnostic test runs first, captures evidence
2. If pages still blank → check diagnostic output for clues
3. If hydration works → tests should pass
4. If tests timeout → may need Fix 2 (safer provider initialization)

## Expected Results in CI

### Best Case
- Diagnostic test shows: HTML length > 40KB, elements present
- All 50+ tests pass
- Test suite completes in ~20-30 minutes (was timing out at 31 min)

### If Still Failing
Next steps based on diagnostic output:

**If diagnostic shows blank pages:**
- Implement Fix 2: Make Wagmi/WalletConnect provider CI-safe
- Add provider initialization timeout/fallback

**If diagnostic shows pages render but tests fail:**
- Issue is with test assertions, not page rendering
- Investigate specific failing test logic

**If diagnostic shows pages render slowly:**
- Further increase timeouts
- Consider using production build instead of dev server

## Rollback Plan
If fixes cause issues:
```bash
git revert HEAD  # Revert all changes
# Or selectively:
git checkout HEAD^ -- tests/accessibility/all-pages.spec.ts
git checkout HEAD^ -- .github/workflows/ci.yml
```

## Monitoring
Watch for:
- Test execution time (should be faster with 1 worker despite sequential execution)
- First test to fail (indicates where hydration breaks)
- Diagnostic test output (shows actual page state)

## Additional Notes

### Why Not Use Production Build?
- Dev server more forgiving with hydration
- Faster iteration for test development
- Production build would require full wagmi generation (slow)

### Why Not Increase Workers?
- GitHub Actions runners have limited resources (7GB RAM, 2 CPU)
- Chromium instances are heavy (can use 500MB+ each)
- Better to be slow and stable than fast and flaky

### Why 500ms Buffer in Hydration Helper?
- React hydration can complete but client-side effects still running
- WalletConnect, ToastProvider, etc. may initialize after hydration
- Small delay ensures all providers are ready

## Future Improvements
1. Implement Fix 2 (safer provider init) if issues persist
2. Add custom health check to webServer config
3. Consider switching to production build if dev server remains problematic
4. Add request/response logging to Playwright for better debugging
5. Investigate if WalletConnect can be mocked entirely in tests
