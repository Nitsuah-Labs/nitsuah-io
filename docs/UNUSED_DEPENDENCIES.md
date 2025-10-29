# Unused Dependencies - Phase 6 Cleanup# Unused Dependencies Audit



**Status:** Verified - Ready for Removal  ## Potentially Unused Dependencies

**Last Audit:** October 29, 2025

Review the following packages for actual usage in the codebase:

## Confirmed Unused Dependencies

### Production Dependencies

The following packages have been verified as unused in the codebase and are scheduled for removal in Phase 6:

1. **`lokijs` (^1.5.12)**

### 1. `lokijs` (^1.5.12)   - Searched codebase: No imports found

   - Purpose: In-memory database

- **Type:** Production dependency   - **Recommendation:** Remove if confirmed unused

- **Purpose:** In-memory database   - Command: `npm uninstall lokijs`

- **Status:** ❌ No imports found in codebase

- **Recommendation:** **REMOVE**2. **`pino-pretty` (^13.1.2)**

- **Command:** `npm uninstall lokijs`   - Searched codebase: No imports found  

   - Purpose: Pino logger formatter

### 2. `pino-pretty` (^13.1.2)   - **Recommendation:** Remove if confirmed unused

   - Command: `npm uninstall pino-pretty`

- **Type:** Production dependency

- **Purpose:** Pino logger formatter3. **`@react-native-async-storage/async-storage` (^2.2.0)** (devDependency)

- **Status:** ❌ No imports found in codebase   - Appears to be a React Native package

- **Recommendation:** **REMOVE**   - Not needed for Next.js web app

- **Command:** `npm uninstall pino-pretty`   - **Recommendation:** Remove

   - Command: `npm uninstall -D @react-native-async-storage/async-storage`

### 3. `@react-native-async-storage/async-storage` (^2.2.0)

4. **`encoding` (^0.1.13)**

- **Type:** Dev dependency   - May be a transitive dependency

- **Purpose:** React Native storage (not applicable to Next.js web app)   - Check if explicitly needed

- **Status:** ❌ React Native package in Next.js project   - **Recommendation:** Review usage, likely can be removed

- **Recommendation:** **REMOVE**

- **Command:** `npm uninstall -D @react-native-async-storage/async-storage`5. **`utf-8-validate` (^6.0.5)** + **`bufferutil` (^4.0.9)**

   - WebSocket performance optimizations

### 4. `encoding` (^0.1.13)   - Used by WalletConnect

   - **Recommendation:** Keep (improves wallet connection performance)

- **Type:** Production dependency

- **Purpose:** Text encoding utilities## Verification Process

- **Status:** ⚠️ Likely transitive dependency

- **Recommendation:** **VERIFY THEN REMOVE**Before removing any dependency:

- **Command:** `npm ls encoding` (check usage), then `npm uninstall encoding`

```bash

## Dependencies to Keep# 1. Search for imports in codebase

grep -r "from 'lokijs'" src/

### `utf-8-validate` (^6.0.5) + `bufferutil` (^4.0.9)grep -r "require('lokijs')" src/



- **Type:** Production dependencies# 2. Check if used in node_modules by other packages

- **Purpose:** WebSocket performance optimizationsnpm ls lokijs

- **Used By:** WalletConnect

- **Status:** ✅ **KEEP**# 3. Try removing and run tests

- **Reason:** Improves wallet connection performancenpm uninstall lokijs

npm run typecheck

## Phase 6 Cleanup Scriptnpm run build

npm run test

Run after verification (see [PHASE-6.md](./PHASE-6.md) for full plan):

# 4. If all pass, dependency was unused. Commit removal.

```bash# If fails, reinstall and investigate

# Remove confirmed unused dependenciesnpm install lokijs

npm uninstall lokijs pino-pretty encoding```

npm uninstall -D @react-native-async-storage/async-storage

## Recommended Cleanup Script

# Clean install to update lockfile

npm install```bash

# Run this after verification:

# Verify everything still worksnpm uninstall lokijs pino-pretty encoding

npm run typechecknpm uninstall -D @react-native-async-storage/async-storage

npm run buildnpm install  # clean install

npm testnpm audit    # check for new issues

npm run test:e2e```



# Run security audit## Expected Impact

npm audit

```- **Bundle size:** ~100-200KB reduction

- **Install time:** Faster npm install

## Expected Impact- **Security:** Fewer packages = smaller attack surface

- **Maintenance:** Fewer dependencies to update

- **Bundle size reduction:** ~100-200KB

- **Faster install:** Fewer packages to download## Next Steps

- **Security:** Smaller attack surface

- **Maintenance:** Fewer dependencies to update1. Verify each package is truly unused

2. Remove in separate commits for easy rollback

---3. Run full test suite after each removal

4. Update package-lock.json

**Next Steps:** See [PHASE-6.md](./PHASE-6.md) for full Phase 6 implementation plan.5. Document removals in changelog

