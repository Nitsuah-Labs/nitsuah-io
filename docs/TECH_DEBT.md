# Technical Debt & Code Cleanup

**Created:** November 2, 2025  
**Last Updated:** January 2025  
**Status:** Active

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
