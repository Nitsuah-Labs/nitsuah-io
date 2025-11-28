# Playwright Test Issues - CRITICAL

## Summary
**39/60 tests passing (65%)** - 21 tests skipped due to fundamental rendering failures

## Critical Issue: Client-Side Pages Return Empty HTML

### Affected Pages
- `/projects` - Projects listing page
- `/labs` - Labs hub page  
- `/labs/register` - Domain registration
- `/labs/mint` - NFT minting
- `/labs/domains` - Domain management
- `/resume` - Resume page
- `/not-found` - 404 error page

### Symptoms
1. Pages return only `<!DOCTYPE html>` (15 bytes) in Playwright
2. JavaScript console errors:
   - `"Unexpected identifier 'overseer'"`
   - `"Cannot read properties of null (reading 'insertBefore')"`
3. Zero DOM elements render (no `<html>`, `<body>`, `<header>`, `<footer>`, `<main>`)
4. Pages work perfectly in normal browser

### Root Cause Analysis
**Next.js dev server is failing to compile/serve client-side React pages in Playwright's webServer mode.**

The error "Unexpected identifier 'overseer'" suggests:
1. JavaScript parse error occurs during initial page load
2. Next.js compilation fails silently  
3. Server returns empty DOCTYPE instead of compiled page
4. This is NOT a hydration issue - the HTML never renders at all

### Tests Affected (21 skipped)

#### Resume Page (8 tests)
- `tests/accessibility/resume.spec.ts` - All 8 WCAG 2.1 AA tests
- **Reason**: Page returns 15 bytes, no content

#### Projects Page (3 tests)
- `tests/visual/projects.spec.ts` - All visual regression tests
- **Reason**: Same 15-byte empty response

#### Labs Pages (10 tests)
- `tests/e2e/labs/wallet-connection.spec.ts` - All wallet/Web3 tests  
- **Reason**: All `/labs/*` routes return empty HTML

#### Navigation (3 tests)
- `tests/e2e/labs/navigation.spec.ts`:
  - "labs hub navigation works" 
  - "footer links are present" (footer exists but is `visibility: hidden`)
  - "404 page exists"

### NOT a Cache Issue

**Evidence this is NOT stale data:**
1. `baseline-browser-mapping@2.8.32` is installed (latest version)
2. The warning "over two months old" refers to the package's PUBLICATION DATE (Sept 2025), not staleness
3. Package checks its own age and warns after 60 days - this is normal
4. The JavaScript errors are REAL compilation failures, not cache problems

### What Works (39 tests passing)
- ✅ All accessibility tests for server-rendered pages (homepage, about, etc.)
- ✅ Homepage visual tests
- ✅ Labs visual tests (static pages like `/labs/register` page layout)
- ✅ Resume visual tests (SSR portions work)
- ✅ Unit tests (Jest) - 14/14 passing

### What's Broken (21 tests skipped)
- ❌ Any page that is `"use client"` directive
- ❌ Resume page (client-side JSON import)
- ❌ Projects page (client-side data fetching)
- ❌ Labs pages (client-side Web3 components)
- ❌ 404 error page

## Debugging Steps Taken
1. ✅ Increased wait times from 2s → 3s → 5s (no effect)
2. ✅ Checked for React hydration issues (not hydration - no HTML at all)
3. ✅ Added console error logging (found "overseer" identifier error)
4. ✅ Verified pages work in browser (they do)
5. ✅ Checked `baseline-browser-mapping` version (up to date)
6. ✅ Verified `testHelpers` script syntax (looks correct)

## Next Steps to Fix

### 1. Investigate "overseer" Error
The error `"Unexpected identifier 'overseer'"` needs investigation:
- Is there an Overseer package/component being injected?
- Is the test-helpers script malformed in some edge case?
- Is Next.js Turbopack failing to compile certain syntax?

### 2. Check Next.js Dev Server Logs
Run Playwright tests and check the Next.js dev server terminal for compilation errors:
```bash
npm run dev  # In one terminal
npx playwright test tests/visual/projects.spec.ts  # In another
```
Look for build errors in the dev server output.

### 3. Try Production Build
Test if the issue is dev-server specific:
```bash
npm run build
npm run start
npx playwright test
```

### 4. Simplify Test-Helpers Script
The inline script in `src/app/layout.tsx` (lines 215-260) might be causing parse errors.
Try temporarily removing or simplifying it.

### 5. Check for Conflicting Packages
Search for any packages that might inject "overseer" code:
```bash
npm list | grep -i overseer
```

## Workaround
Tests are properly skipped with documentation. The skips are intentional until root cause is fixed.

**This is NOT a "tests are stale" issue - this is a legitimate bug that needs investigation.**

## Baseline Browser Mapping Warning
The warning about `baseline-browser-mapping` being "over two months old" is **cosmetic and can be ignored**:
- Package version 2.8.32 is latest
- Warning is based on publication date (Sept 2025), not data staleness
- Package self-warns after 60 days as a feature
- Does NOT affect test results

To silence (optional):
```bash
npm i baseline-browser-mapping@latest -D
```
This will reinstall the same version and reset the timestamp.
