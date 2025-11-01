# Security Audit

**Last Updated:** November 1, 2025  
**Status:** ✅ Production Ready

## Current Status

No high severity or impactful vulns. Some low severity related to WalletConnect that may need updates or review (it is on the latest?) Also some dependnency updates pending that may address some other issues or need evaluation/testing.

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

### Dependency updates

- make recommendations to address all issues (including warnings/low severity vulnerabilities)


Pending dependnency updates:

chore(deps): bump @splinetool/runtime from 0.9.526 to 1.10.91 
 dependencies javascript
#125 opened 2 days ago by dependabot bot
@nitsuah
 2

chore(deps-dev): bump globals from 16.0.0 to 16.4.0 
 dependencies javascript
#118 opened last week by dependabot bot
@nitsuah
 2

chore(deps-dev): bump typescript from 5.1.6 to 5.9.3 
 dependencies javascript
#117 opened last week by dependabot bot
@nitsuah
 2

chore(deps-dev): bump typescript-eslint from 8.31.1 to 8.46.2 
 dependencies javascript

**Next Review:** November 7, 2025
