# Development Workflow Guide

## Quick Reference

### Fast Development Commits
```bash
# Type-safe quick commit (recommended for rapid iteration)
npm run commit:safe

# Skip all hooks (use sparingly, only for WIP commits)
npm run commit:quick
# OR
git commit --no-verify
```

### Standard Commits
```bash
# Full validation (automatic via git hooks)
git commit -m "your message"
```

## Git Hook Optimization

### Pre-commit (5-10 seconds)
Runs **fast checks only**:
- ✅ TypeScript type checking
- ✅ Auto-format staged files (lint-staged)
- ✅ Jest unit tests

**What's NOT checked** (moved to CI):
- ❌ Accessibility tests (50s saved)
- ❌ Format verification (redundant after auto-format)

### Pre-push (1 minute)
Runs **production build only**:
- ✅ Next.js production build (catches most issues)

**What's NOT checked** (moved to CI):
- ❌ Accessibility tests (1.2m saved)
- ❌ Visual regression tests
- ❌ E2E tests

**Total local validation time: ~1-2 minutes** (down from 3-5 minutes)

## When to Skip Hooks

### Safe to use `--no-verify`:
- ✅ WIP commits during exploration
- ✅ Documentation-only changes
- ✅ JSON/config file tweaks
- ✅ Minor CSS adjustments you've manually verified
- ✅ Reverting a bad commit quickly

### NOT safe to skip:
- ❌ TypeScript changes (type errors will break CI)
- ❌ Component/logic changes (tests will fail in CI)
- ❌ Production-bound code (build errors waste CI time)

## CI Validation

CI runs the **full suite** that was removed from local hooks:
- Accessibility tests (all pages)
- Visual regression tests (all viewports)
- E2E wallet flows
- Full build + deployment

**Strategy**: Fail fast locally with quick checks, catch edge cases in CI.

## Troubleshooting

### "npx: command not found" in Git hooks
Git Bash may not inherit your PATH. Fix:
```bash
# Temporary fix (current session)
export PATH="/c/Program Files/nodejs:$PATH"

# Permanent fix (add to ~/.bashrc)
echo 'export PATH="/c/Program Files/nodejs:$PATH"' >> ~/.bashrc
```

### Pre-commit taking too long?
If pre-commit still feels slow:
1. Check if TypeScript is scanning too many files (`tsconfig.json`)
2. Review Jest test count (should be <10 unit tests)
3. Use `npm run commit:safe` for manual control

### CI failing but local passed?
This is expected! Local validation is intentionally lightweight. Common CI-only failures:
- Accessibility violations (color contrast, ARIA)
- Visual regressions (screenshot diffs)
- Cross-browser issues
- Build warnings promoted to errors in CI

Check CI logs for specifics and fix before pushing again.

## Recommended Workflow

### During active development:
```bash
# Make changes
# ...

# Quick commit (auto-formats, runs fast checks)
npm run commit:safe
```

### When ready to push:
```bash
# Push triggers production build (~1min)
git push

# If push fails, fix issues and force push
git commit --amend --no-edit
git push --force-with-lease
```

### For rapid iteration (testing something):
```bash
# Skip all validation
npm run commit:quick
```

### Before opening PR:
```bash
# Run full local validation manually
npm run validate:full

# Check if build works
npm run build

# Optionally run visual tests
npm run test:e2e
```

## Performance Targets

| Hook | Target Time | Current Time | Status |
|------|-------------|--------------|--------|
| Pre-commit | <10s | ~5-10s | ✅ |
| Pre-push | <60s | ~60s | ✅ |
| CI (full) | <5min | varies | 🔄 |

## Future Optimizations

Potential improvements being considered:
- [ ] Cache Next.js builds in CI
- [ ] Parallelize CI test suites
- [ ] Run accessibility tests only on changed pages
- [ ] Use Playwright sharding for faster visual tests
- [ ] Add GitHub Actions cache for node_modules
