# Phase 3.2 Implementation Summary

## Changes Completed

### 1. Web3 Wallet Improvements

**Files Modified:**

- `src/app/_components/_web3/Connect.tsx`
- `src/app/labs/mint/page.tsx`
- `src/app/labs/register/page.tsx`

**Changes:**

- **Surface all wallet connectors**: Now shows all available connectors (MetaMask, Coinbase Wallet, WalletConnect, injected) even when not ready, with disabled state and "not available" hint
- **Added data-testid attributes**: Each connector button gets `data-testid="connector-{id}"` for deterministic e2e targeting
- **Broadened test helper selectors**: Updated from MetaMask-specific `[aria-label='Connect to MetaMask wallet']` to generic `[data-testid^='connector-'], [aria-label^='Connect to']`
- **Added wrapper aria-label**: Connect component now has `aria-label="Connect to wallet"` for better accessibility
- **Result**: Non-MetaMask wallets (Coinbase, Phantom) now visible and targetable in tests; users see all options

### 2. Visual Test Stabilization

**Files Modified:**

- `tests/visual/homepage.spec.ts`
- `tests/visual/labs.spec.ts`
- `tests/visual/projects.spec.ts`

**Changes:**

- Added explicit `waitFor({ state: 'visible', timeout: 15000 })` for spline-container or canvas elements
- Added 200ms settle delay before screenshots to allow animations to complete
- Reduced timeout from 25s to 15s (more realistic) with proper state checking
- **Result**: Visual tests should be more stable and deterministic

### 3. Performance & Lighthouse Optimizations

**Files Modified:**

- `next.config.js`
- `src/app/_components/_spline/spline-home.tsx` (already done)
- `src/app/head.tsx` (already done)

**Changes in next.config.js:**

- Added `@splinetool/react-spline`, `wagmi`, `viem` to `optimizePackageImports`
- Enabled image caching with `minimumCacheTTL: 60`
- Added SVG support with security CSP
- Disabled `productionBrowserSourceMaps` to reduce bundle size
- Disabled `poweredByHeader` for security
- Enabled `compress: true` for response compression
- Added optional `standalone` output mode for faster deployments

**Previously Completed:**

- Deferred Spline rendering until browser idle (requestIdleCallback)
- Added preconnect/dns-prefetch to Spline host in `src/app/head.tsx`
- Added `data-testid="spline-container"` for deterministic test targeting

**Expected Impact:**

- Improved LCP (Largest Contentful Paint) by deferring heavy Spline load
- Reduced TBT (Total Blocking Time) via idle callback
- Smaller bundle sizes via tree-shaking optimizations
- Faster image delivery via AVIF/WebP with caching

### 4. Accessibility & Color Contrast Fixes

**Previously Completed:**

- Fixed color contrast in `src/app/_components/_styles/SelectedProjects.css`
- Darkened primary blues to #1e40af / #163071 (hover)
- Lightened footer text to #d1d5db
- **Result**: Projects page accessibility tests now pass

### 5. Test Infrastructure

**Previously Completed:**

- Created `tests/_utils/playwright-helpers.ts` with `go()` helper
- Updated Playwright config to use production build in CI
- Added `NEXT_PUBLIC_TEST_HELPERS` environment forwarding
- Created deterministic test helpers in Mint/Register pages

## What's Ready for Testing

### Commit and Run

```powershell
git add -A
git commit -m "feat(phase3.2): web3 improvements, visual test stabilization, and performance optimizations"
git push origin phase-3
```

### Then Run Full Test Suite

```powershell
# Run visual tests
npx cross-env NEXT_PUBLIC_TEST_HELPERS=1 npx playwright test tests/visual --project=chromium-desktop

# Run e2e tests
npx cross-env NEXT_PUBLIC_TEST_HELPERS=1 npx playwright test tests/e2e --project=chromium-desktop

# Run accessibility tests
npx playwright test tests/accessibility --project=chromium-desktop

# Run Lighthouse (if configured)
npm run lighthouse
```

## Outstanding Items

### 1. Prettier Formatting (Blocked by npm/node)
- `src/app/labs/register/page.tsx` still fails format:check
- **Workaround**: Install Node.js locally or run `npm run format` in proper environment

### 2. Visual Snapshot Triage
- After running tests, inspect diff artifacts in `test-results/`
- Decide: small CSS tweaks OR intentional baseline updates
- Update baselines with: `npx playwright test --update-snapshots`

### 3. Dependency Security (Low Priority)
- GitHub reported 3 vulnerabilities (2 moderate, 1 low) on default branch
- Run `npm audit` and review Dependabot PRs when ready

## CI Validation
- Pre-push checks passed: accessibility smoke + production build
- Full CI run (GitHub Actions) will validate all changes
- Expected: some visual diffs requiring baseline updates

## Performance Metrics to Track
- **LCP**: Target <2.5s (improved via Spline defer + preconnect)
- **TBT**: Target <200ms (improved via idle callback)
- **CLS**: Should remain stable (no layout shift changes)
- **Accessibility**: Should pass all axe scans (contrast fixed)

## Notes
- All changes are backward compatible
- Test helpers only activate with `NEXT_PUBLIC_TEST_HELPERS=1` or `?testHelpers=1`
- Wallet connectors show all options even when provider not installed (better UX)
- Performance optimizations are production-only (dev experience unchanged)
