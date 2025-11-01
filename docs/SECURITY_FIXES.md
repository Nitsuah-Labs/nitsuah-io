# Security Audit

**Last Updated:** November 1, 2025  
**Status:** ✅ Production Ready

## Current Status

- **Total:** 18 vulnerabilities (all low severity)
- **Moderate/High/Critical:** 0
- **Assessment:** Safe to deploy

All low severity issues are in WalletConnect/Reown transitive dependencies (logging and internal utilities not exposed to users).

---

## Recent Fixes (October 31, 2025)

### Security Updates

- ✅ Updated **esbuild** to 0.25.11 (fixed moderate vulnerability)
- ✅ Updated **lint-staged** to 16.2.6 (fixed moderate vulnerability)
- ✅ Resolved **micromatch** vulnerability via lint-staged update

### Build Warnings

- ✅ Fixed webpack module resolution warnings for optional peer dependencies
- Added webpack fallback configuration for browser-only build

**Result:** All moderate/high severity vulnerabilities eliminated.

---

## Low Severity Details

**18 vulnerabilities** in WalletConnect packages:

- `fast-redact` (prototype pollution in logger - internal only)
- `@reown/appkit` transitive dependencies
- All affect non-production code paths (logging, development tools)

**Action:** Waiting on upstream package updates. Safe to ignore.

---

## Maintenance

Run security audit before deployments:
```bash
npm audit
npm audit --audit-level=moderate  # Fail on moderate+
```

**Next Review:** November 7, 2025
