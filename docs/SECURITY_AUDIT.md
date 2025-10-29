# Security & Dependency Audit Plan

## Current Status (October 29, 2025)

**npm audit results:** 21 vulnerabilities detected
- 3 moderate severity
- 18 low severity

**See Phase 6 plan:** All security updates scheduled for [PHASE-6.md](./PHASE-6.md)

## Phase 6 Security Update Plan

All security updates moved to [PHASE-6.md](./PHASE-6.md). Key items:

1. **Moderate severity fixes:**
   - Update `esbuild` (<=0.24.2 → 0.25.1)
   - Update `micromatch` (<4.0.8 → 4.0.8+)

2. **Review WalletConnect chain** (18 low severity items)
   - Prototype pollution in fast-redact affecting @walletconnect/* packages

3. **Process:**
   - Run `npm audit fix` for non-breaking updates
   - Test `npm audit fix --force` in separate branch
   - Review Dependabot PRs: <https://github.com/Nitsuah-Labs/nitsuah-io/security/dependabot>

### Package Review Priorities

**High Priority Dependencies (Security-Critical):**
- `next` (currently ^14.2.26) - Check for security patches
- `react` / `react-dom` (currently ^18.2.0) - Update to latest 18.x
- `viem` (currently ^2.38.4) - Crypto/web3 library, security-critical
- `wagmi` (currently ^2.18.2) - Wallet connector, review for vulns
- `@playwright/test` (dev) - Update to latest for test stability

**Medium Priority:**
- `@mui/material` / `@emotion/*` - UI framework updates
- `sharp` (image processing) - Check for known CVEs
- Authentication/crypto packages if any

**Low Priority:**
- Dev-only tools (`prettier`, `eslint`, etc.)
- Type definitions (`@types/*`)

### Known Dependency Issues to Check

1. **Lit version consistency:**
   - Currently all using `lit@3.3.0` ✅
   - No duplicates detected

2. **Transitive dependencies:**
   - Check for outdated sub-dependencies
   - Look for packages with known CVEs

3. **Unused dependencies:**
   - `lokijs` (^1.5.12) - verify if still needed
   - `pino-pretty` (^13.1.2) - check usage
   - `@react-native-async-storage/async-storage` - appears unused, remove?

### Testing After Updates

```bash
# After any dependency updates:
npm ci
npm run typecheck
npm run lint
npm run test
npm run build
npm run test:e2e
```

### Dependabot Configuration

Current config at `.github/dependabot.yml` should be reviewed for:
- Update frequency
- Auto-merge rules for patch/minor updates
- Grouping related updates

## Security Best Practices Applied

✅ **Already Implemented:**
- `swcMinify: true` (faster, more secure than Terser)
- `removeConsole` in production (prevents info leakage)
- `poweredByHeader: false` (hides Next.js version)
- Image CSP policies for SVG safety
- `reactStrictMode: true` (catches potential issues)

**Recommendations:**
1. Add `SECURITY.md` with disclosure policy
2. Enable GitHub Advanced Security (if available)
3. Set up automated security scanning in CI
4. Review and restrict CORS policies
5. Audit environment variables for secrets

## Next Steps

1. Install Node.js locally: `https://nodejs.org/`
2. Run `npm audit` and review output
3. Create PRs for dependency updates
4. Test thoroughly before merging to main
5. Schedule quarterly dependency audits
