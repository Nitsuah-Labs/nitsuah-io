# TODO

**Updated:** October 29, 2025

_No active tasks. This file tracks in-progress development work._

---

## User Feedback

- [] See `FEEDBACK.md` for active user-reported issues and feature requests.

## Backlog

### ✅ Completed

- ✅ Phase 7 - Homepage, navigation, resume, crypto, projects, labs improvements
- ✅ Phase 7.2 - Blog and clients page consistent styling
- ✅ Phase 7.3 (Week 1-2) - Wallet UX improvements and profile page
- ✅ Security audit - All moderate/high vulnerabilities fixed
- ✅ Dependency cleanup - Removed unused packages (lokijs, pino-pretty, encoding, @react-native-async-storage)

### In Progress

- [ ] Phase 7.3 (Week 3-4) - Contract debugging, toast notifications, E2E tests
- [ ] Projects page filters/categories based on tags

### Security

- ✅ Run `npm audit fix` for auto-fixable vulnerabilities (COMPLETED)
- ✅ Fixed all moderate severity issues (esbuild, lint-staged updated)
- ✅ Fixed webpack module resolution warnings (optional peer dependencies)
- 📝 18 low severity vulnerabilities remain (WalletConnect transitive deps - safe, waiting on upstream)

**Current Status:** 18 vulnerabilities (18 low, 0 moderate, 0 high, 0 critical)  
**Details:** See `docs/SECURITY_FIXES.md` for full audit
