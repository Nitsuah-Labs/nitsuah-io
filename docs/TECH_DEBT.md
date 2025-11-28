# Technical Debt & Code Cleanup

**Created:** November 2, 2025  
**Last Updated:** January 2025  
**Status:** Active

---

## 🧪 Testing Infrastructure

### Playwright Local vs Docker Discrepancy

**Status:** 🔴 High Priority - Blocking local development testing

**Issue:** Client-side pages fail to render in Playwright local environment but may work in Docker/CI.

**Symptoms:**

- Pages return only `<!DOCTYPE html>` (15 bytes) locally
- JavaScript error: `"Unexpected identifier 'overseer'"` (likely conflict with other repo running at same time)
- Zero DOM elements render (no `<html>`, `<body>`, etc.)
- Pages work perfectly in normal browser
- 21 tests skipped locally, awaiting CI validation

**Affected Pages:**

- `/projects` - Projects listing
- `/labs` - Labs hub and all subpages
- `/resume` - Resume page  
- `/not-found` - 404 page

**Root Cause Hypothesis:**

Next.js dev server failing to compile/serve client-side React pages in Playwright's webServer mode. The "overseer" identifier error suggests a parse error during page load.

**Investigation Needed:**

1. ✅ Tests restored from working commit (ce4724c) and pushed to CI
2. ⏳ Verify if tests pass in Docker/CI environment
3. ⏳ If CI also fails: bisect between ce4724c and current to find breaking commit
4. ⏳ Investigate "overseer" JavaScript error source
5. ⏳ Check Next.js dev server compilation logs
6. ⏳ Try production build (`npm run build && npm run start`)
7. ⏳ Review test-helpers script in `src/app/layout.tsx` (lines 215-260)

**Workaround:**

Tests properly skipped with `.skip()` and documentation. Run tests in Docker for validation:

```bash
npm run test:e2e:docker:build
npm run test:e2e:docker
```

**Current Test Status:**

- ✅ 39/60 tests passing locally (65%)
- ✅ 20/20 accessibility tests (server-rendered pages)
- ⏸️ 21 tests skipped (client-side pages)
- ✅ 14/14 Jest unit tests passing
- ✅ 97.41% code coverage

**Reference:** See full details in git history or CI logs for commit ce4724c comparison.

---

## ⚠️ Known Warnings (Non-Critical)

### Baseline Browser Mapping Age Warning

**Status:** 🟢 Informational Only - Can be ignored

**Warning Message:**

```text
[baseline-browser-mapping] The data in this module is over two months old.
To ensure accurate Baseline data, please update: `npm i baseline-browser-mapping@latest -D`
```

**Explanation:**

- Package version 2.8.32 is the latest available
- Warning is based on package publication date (Sept 2025), not data staleness
- Package self-warns after 60 days as a built-in feature
- Does NOT affect test results or accuracy
- This is cosmetic and can be safely ignored

**Why it appears:**

The package `baseline-browser-mapping` checks its own publication date and emits this warning if it's older than 60 days. Since the package hasn't been updated recently upstream, the warning will always appear until the maintainers publish a new version.

**Impact:** None - the warning appears in console logs but doesn't affect functionality.

**Action:** No action needed. Monitor [upstream package](https://www.npmjs.com/package/baseline-browser-mapping) for updates.

---

## 📸 Visual Regression

### Screenshot Updates

**Status:** 🟡 Medium Priority

**Issue:** Visual regression baselines need systematic update process.

**Tasks:**

- [ ] Design automated screenshot gathering script
- [ ] Standardize baseline update workflow
- [ ] Document when/how to update baselines
- [ ] Consider using Docker for consistent screenshot generation

**Notes:**

- Current process: Manual `npx playwright test --update-snapshots`
- Ideal: Automated script that generates screenshots across all device types
- Must ensure Docker-generated screenshots match CI exactly

---

## 📚 Reference Documentation

- **ARCHITECTURE.md** - High-level system architecture and design patterns
- **DEMO_REF.md** - Component usage guide
- **TESTING.md** - Test suite documentation and best practices
- **TODO.md** - Future work and manual tasks
