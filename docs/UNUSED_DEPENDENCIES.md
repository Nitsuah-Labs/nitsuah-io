# Unused Dependencies Audit

## Potentially Unused Dependencies

Review the following packages for actual usage in the codebase:

### Production Dependencies

1. **`lokijs` (^1.5.12)**
   - Searched codebase: No imports found
   - Purpose: In-memory database
   - **Recommendation:** Remove if confirmed unused
   - Command: `npm uninstall lokijs`

2. **`pino-pretty` (^13.1.2)**
   - Searched codebase: No imports found  
   - Purpose: Pino logger formatter
   - **Recommendation:** Remove if confirmed unused
   - Command: `npm uninstall pino-pretty`

3. **`@react-native-async-storage/async-storage` (^2.2.0)** (devDependency)
   - Appears to be a React Native package
   - Not needed for Next.js web app
   - **Recommendation:** Remove
   - Command: `npm uninstall -D @react-native-async-storage/async-storage`

4. **`encoding` (^0.1.13)**
   - May be a transitive dependency
   - Check if explicitly needed
   - **Recommendation:** Review usage, likely can be removed

5. **`utf-8-validate` (^6.0.5)** + **`bufferutil` (^4.0.9)**
   - WebSocket performance optimizations
   - Used by WalletConnect
   - **Recommendation:** Keep (improves wallet connection performance)

## Verification Process

Before removing any dependency:

```bash
# 1. Search for imports in codebase
grep -r "from 'lokijs'" src/
grep -r "require('lokijs')" src/

# 2. Check if used in node_modules by other packages
npm ls lokijs

# 3. Try removing and run tests
npm uninstall lokijs
npm run typecheck
npm run build
npm run test

# 4. If all pass, dependency was unused. Commit removal.
# If fails, reinstall and investigate
npm install lokijs
```

## Recommended Cleanup Script

```bash
# Run this after verification:
npm uninstall lokijs pino-pretty encoding
npm uninstall -D @react-native-async-storage/async-storage
npm install  # clean install
npm audit    # check for new issues
```

## Expected Impact

- **Bundle size:** ~100-200KB reduction
- **Install time:** Faster npm install
- **Security:** Fewer packages = smaller attack surface
- **Maintenance:** Fewer dependencies to update

## Next Steps

1. Verify each package is truly unused
2. Remove in separate commits for easy rollback
3. Run full test suite after each removal
4. Update package-lock.json
5. Document removals in changelog
