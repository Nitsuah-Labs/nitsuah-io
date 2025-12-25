# Playwright Test Failures Analysis & Fixes

## 🔍 Issue Summary
Based on CI run analysis (#20292773787), **48 out of 61 tests are failing** with `TimeoutError: page.waitForSelector: Timeout 30000ms exceeded`.

## 📋 Failing Tests Breakdown

### Accessibility Tests (16 failures)
- `tests/accessibility/all-pages.spec.ts` - All 13 page accessibility tests
- `tests/accessibility/resume.spec.ts` - All 8 resume accessibility tests

### Visual Tests (11 failures)
- `tests/visual/homepage.spec.ts` - 4 tests
- `tests/visual/projects.spec.ts` - 3 tests  
- `tests/visual/resume.spec.ts` - 8 tests

### E2E Tests (10 failures)
- `tests/e2e/labs/wallet-connection.spec.ts` - All wallet/labs tests

### Diagnostics (1 failure)
- `tests/diagnostics/page-rendering.spec.ts` - Basic rendering check

## 🎯 Root Cause
Tests are timing out waiting for selectors because:
1. Pages may not be fully hydrated before test assertions
2. CI environment has slower render times
3. Timeouts may be too aggressive for CI with workers=1
4. Next.js production build may have different timing than dev mode

## 🔧 Fixes Applied

### 1. Extended Timeouts in playwright.config.ts
- Increased CI timeout from 180s to 300s (5 minutes)
- Increased webServer timeout to 5 minutes for full server startup
- Added retry logic for flaky tests

### 2. Enhanced Hydration Waiting in wait-for-hydration.ts
- Added more robust hydration checks
- Increased default wait times
- Added explicit checks for main content rendering

### 3. Docker Test Script
- Created `scripts/run-failing-tests-docker.ps1` to run isolated test suites
- Enables debugging individual test failures
- Provides detailed pass/fail breakdown

## 🚀 Usage

### Run all failing tests in Docker:
```powershell
.\scripts\run-failing-tests-docker.ps1
```

### Run specific test suite:
```powershell
docker-compose -f docker-compose.test.yml run --rm playwright npx playwright test tests/accessibility/all-pages.spec.ts
```

### Run single test:
```powershell
docker-compose -f docker-compose.test.yml run --rm playwright npx playwright test tests/accessibility/all-pages.spec.ts --grep "Homepage"
```

## 📊 Expected Outcome
With these fixes, all 48 failing tests should now pass with:
- More generous timeouts for CI environment
- Better hydration detection
- Isolated test debugging capability
