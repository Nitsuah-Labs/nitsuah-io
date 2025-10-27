# Dependabot PR Review - October 2025

## Summary
Reviewed 5 Dependabot PRs. 2 safe to merge, 3 require major migration work.

---

## ✅ SAFE TO MERGE

### #98 - Bump pino-pretty from 10.3.1 to 13.1.2
- **Status**: ✅ Safe to merge
- **Type**: Minor/patch logging library update
- **Risk**: Low - backwards compatible
- **Action**: Merge immediately
- **Command**: 
  ```bash
  npm install pino-pretty@^13.1.2
  ```

### #69 - Bump sha.js from 2.4.11 to 2.4.12
- **Status**: ✅ Safe to merge
- **Type**: Security patch
- **Risk**: None - patch version
- **Action**: Merge immediately
- **Command**:
  ```bash
  npm update sha.js
  ```

---

## ❌ REQUIRES MIGRATION - CLOSE FOR NOW

### #107 - Bump viem from 0.3.50 to 2.38.4
- **Status**: ❌ Breaking changes
- **Why Close**:
  - viem v2 has completely rewritten API
  - All useContractRead, useContractWrite hooks changed
  - Requires rewriting: Account.tsx, MintNFT.tsx, labs/domains/page.tsx
  - Must be coordinated with wagmi v2 upgrade
- **Migration Effort**: 8-12 hours
- **Action**: Close PR, create epic for "Web3 Stack Upgrade"
- **Dependencies**: Requires wagmi v2 upgrade first

### #106 - Bump next from 14.2.26 to 16.0.0
- **Status**: ❌ Breaking changes
- **Why Close**:
  - Next.js 15+ requires React 19
  - Current project uses React 18.2
  - App Router changes, metadata API updates
  - turbopack becomes default (breaking for some configs)
- **Migration Effort**: 4-6 hours
- **Action**: Close PR, plan separate "Next.js 15/16 Migration" sprint
- **Migration Guide**: https://nextjs.org/docs/app/building-your-application/upgrading/version-15

### #105 - Bump wagmi from 1.4.13 to 2.18.2
- **Status**: ❌ Breaking changes
- **Why Close**:
  - wagmi v2 requires viem v2
  - Completely new hook API (useReadContract, useWriteContract, etc.)
  - We just fixed v1 code in this session - would undo that work
  - Must be coordinated upgrade: wagmi v2 + viem v2 + update all components
- **Migration Effort**: 12-16 hours
- **Action**: Close PR, coordinate with viem upgrade
- **Migration Guide**: https://wagmi.sh/react/guides/migrate-from-v1-to-v2

---

## Recommended Upgrade Path

### Phase 1: Safe Updates (Now) ⚡
```bash
npm install pino-pretty@^13.1.2
npm update sha.js
npm audit fix
```

### Phase 2: Web3 Stack (Future Sprint)
1. Plan 2-3 day sprint
2. Upgrade together:
   - wagmi v1 → v2
   - viem v0.3 → v2
   - Update all Web3 components
3. Test thoroughly on testnet

### Phase 3: Next.js 16 + React 19 (Future Sprint)
1. Separate 1-2 day sprint
2. Upgrade:
   - React 18 → 19
   - Next.js 14 → 16
3. Update all components for new APIs
4. Test build and runtime

---

## Current State Analysis

**Why the current setup works:**
- wagmi v1.4.13 works with viem v0.3.x
- Next.js 14 is stable with React 18
- All Web3 code just fixed for v1 API

**Why wait on major upgrades:**
- No critical security issues in current versions
- Breaking changes require significant testing
- Better to do coordinated upgrades in dedicated sprints
- Current focus should be on portfolio functionality, not infrastructure

---

## Action Items

- [ ] TODO: UPDATE (pino-pretty)
- [ ] TODO: UPDATE (sha.js)
- [ ] Close #107 with comment: "Waiting for coordinated Web3 stack upgrade"
- [ ] Close #106 with comment: "Requires React 19 migration - planning separate sprint"
- [ ] Close #105 with comment: "Coordinating with viem v2 upgrade in future sprint"
- [ ] TODO: "Epic: Web3 Stack Upgrade (wagmi v2 + viem v2)"
- [ ] TODO: "Epic: Next.js 16 + React 19 Migration"
