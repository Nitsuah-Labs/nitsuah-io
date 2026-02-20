# Testing Guide

## Overview

This project uses a multi-layered testing strategy to ensure code quality and catch issues before they reach production.

## Test Types

### 1. Unit Tests (Jest + React Testing Library)
- **What:** Component logic, utility functions, hooks
- **When:** During development, pre-commit hook
- **Command:** `npm test`
- **Coverage:** 98% statement coverage

### 2. E2E Tests (Playwright)
- **What:** Full user workflows, visual regression, accessibility
- **When:** Pre-push hook, CI/CD pipeline
- **Command:** `npm run test:e2e`
- **Projects:** 61 tests across visual/accessibility/integration

### 3. Accessibility Tests (axe-core)
- **What:** WCAG 2.1 AA compliance
- **When:** CI/CD, on-demand
- **Command:** `npm run test:a11y`
- **Coverage:** 20 accessibility-focused tests

## The Precheck Workflow

**Problem:** Tests passing locally but failing in CI because dev mode != production mode.

**Solution:** Run `npm run precheck` before pushing to test in production mode locally.

```bash
# What precheck does:
npm run precheck
# 1. Builds production bundle (npm run build:skip-wagmi)
# 2. Runs E2E tests against production build (npm run test:e2e)
```

### When to Use Precheck

✅ **Always run before pushing:**
- Major feature changes
- Component refactoring
- Build configuration changes
- Any changes to pages/layouts

✅ **Integrated into pre-push hook:**
- Runs automatically when you `git push`
- Catches production-specific issues early
- Prevents CI timeouts

❌ **Skip for:**
- Documentation-only changes
- Minor style tweaks (if you're confident)
- Use `git push --no-verify` (but be careful!)

## Testing Workflow

### Development Flow

```bash
# 1. Write code
vim src/components/MyComponent.tsx

# 2. Write/update tests
vim src/components/__tests__/MyComponent.test.tsx

# 3. Run unit tests (fast)
npm test

# 4. Commit (runs pre-commit hook: typecheck, lint, format)
git add .
git commit -m "feat: add MyComponent"

# 5. Push (runs pre-push hook: typecheck, unit tests, precheck)
git push
# Pre-push hook runs:
#  - npm run typecheck
#  - npm test
#  - npm run precheck (build + E2E tests)
```

### Manual Testing Commands

```bash
# Unit tests
npm test                    # Run all unit tests
npm run test:watch          # Watch mode for TDD
npm run test:coverage       # Generate coverage report

# E2E tests (requires .next build)
npm run build:skip-wagmi    # Build first
npm run test:e2e            # Run all E2E tests
npm run test:e2e:ui         # Open Playwright UI
npm run test:e2e:headed     # Run with browser visible

# Accessibility tests
npm run test:a11y           # Full a11y suite
npm run test:a11y:quick     # Quick check (Homepage, About, Projects)

# Visual regression tests
npm run test:visual         # Run visual tests
npm run test:visual:update  # Update baselines (use carefully!)

# Precheck (before pushing)
npm run precheck            # Build + E2E tests
npm run precheck:docker     # Same, but in Docker (matches CI exactly)
```

## Docker Testing

Use Docker to test in the exact CI environment:

```bash
# Build Docker image with production build
npm run test:e2e:docker:build

# Run tests in Docker
npm run test:e2e:docker
# OR
npm run precheck:docker
```

**When to use Docker testing:**
- Debugging CI-specific failures
- Verifying cross-platform compatibility
- Testing in clean environment
- Before major releases

## CI/CD Pipeline

Our GitHub Actions CI runs:

1. **build-and-test job:**
   - Install dependencies
   - Type check
   - Lint
   - Unit tests
   - Build application

2. **playwright-tests job:**
   - Build production bundle
   - Install Playwright browsers
   - Run E2E + visual + accessibility tests

3. **lighthouse-check job:**
   - Performance audits

## Git Hooks

### Pre-commit Hook
Runs on `git commit`:
- Type checking (`npm run typecheck`)
- Linting (`npm run lint`)
- Auto-formatting (`lint-staged`)
- Smoke test (`npm run test:smoke`)

### Pre-push Hook
Runs on `git push`:
- Type checking
- Unit tests
- **Precheck (build + E2E)** ← Catches production issues!

**Bypass hooks** (use sparingly):
```bash
git commit --no-verify
git push --no-verify
```

## Troubleshooting

### Tests pass locally but fail in CI

**Cause:** Dev server (`npm run dev`) behaves differently than production build.

**Solution:**
```bash
# Run precheck to test production build locally
npm run precheck
```

### "Cannot find .next directory" error

**Cause:** E2E tests need a production build to run.

**Solution:**
```bash
# Build first, then test
npm run build:skip-wagmi
npm run test:e2e
```

OR use precheck which does both:
```bash
npm run precheck
```

### Playwright tests timeout

**Cause:** Server not starting, port conflict, or slow build.

**Solution:**
```bash
# Kill any running Node processes
pkill node  # Linux/Mac
Stop-Process -Name node -Force  # Windows PowerShell

# Then rebuild and test
npm run precheck
```

### Visual regression failures

**Cause:** Intentional UI changes or platform differences.

**Solution:**
```bash
# Review the diff images in test-results/
# If changes are expected, update baselines:
npm run test:visual:update

# Commit updated snapshots:
git add tests/**/*-snapshots
git commit -m "test: update visual baselines"
```

## Best Practices

1. **Write tests first (TDD):** Write failing tests, then implement features
2. **Run precheck before pushing:** Catch CI issues locally
3. **Keep tests fast:** Mock external dependencies
4. **Use descriptive test names:** Tests are documentation
5. **Update visual baselines intentionally:** Review diffs carefully
6. **Don't bypass hooks habitually:** They're there to help you

## Test Coverage Goals

- **Unit tests:** 95%+ statement coverage
- **E2E tests:** All critical user paths
- **Accessibility:** 100% WCAG 2.1 AA compliance
- **Visual:** All public pages

## Resources

- [Playwright Docs](https://playwright.dev)
- [Jest Docs](https://jestjs.io)
- [Testing Library](https://testing-library.com)
- [axe-core](https://github.com/dequelabs/axe-core)
- [WCAG Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
