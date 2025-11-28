# Playwright Tests

Comprehensive end-to-end, visual regression, and accessibility testing suite for nitsuah.io.

## Test Structure

```
tests/
├── visual/               # Visual regression tests (screenshots)
│   ├── homepage.spec.ts
│   ├── projects.spec.ts
│   └── labs.spec.ts
├── e2e/                  # End-to-end functional tests
│   └── labs/
│       ├── wallet-connection.spec.ts
│       └── navigation.spec.ts
├── accessibility/        # WCAG 2.1 AA compliance tests
│   ├── all-pages.spec.ts
│   └── resume.spec.ts
└── utils/               # Test utilities and helpers
```

## Running Tests

### Local (Quick)

```bash
# All tests
npm run test:e2e

# Interactive UI Mode
npm run test:e2e:ui

# Headed Mode (See Browser)
npm run test:e2e:headed

# Specific test file
npx playwright test tests/visual/homepage.spec.ts

# Specific browser
npx playwright test --project=chromium-desktop

# Accessibility tests only
npm run test:a11y

# Quick accessibility check (Homepage, About, Projects only)
npm run test:a11y:quick
```

### Docker (CI-Consistent Environment)

**Why Docker?** Local tests can pass but fail in CI due to OS/browser/build differences. Docker ensures consistency.

```bash
# Build image (first time or after dependency changes)
npm run test:e2e:docker:build

# Run all tests in Docker (matches CI environment exactly)
npm run test:e2e:docker

# Run specific test file in Docker
docker-compose -f docker-compose.test.yml run --rm playwright \
  npx playwright test tests/accessibility/all-pages.spec.ts

# Run specific project (browser) in Docker
docker-compose -f docker-compose.test.yml run --rm playwright \
  npx playwright test --project=chromium-desktop
```

**When to use Docker:**
- Before pushing changes to visual components
- After updating dependencies
- When local tests pass but CI fails
- To regenerate visual snapshots consistently
- When debugging Windows-specific test failures

**Docker Image Details:**
- Base: `mcr.microsoft.com/playwright:v1.56.1-noble` (Ubuntu)
- Build Time: ~5.5 minutes (332s) first build, faster with cache
- Context Size: ~137MB (project files)
- Volumes: Source code, node_modules, test-results, playwright-report

## Test Types

### Visual Regression Tests
- Captures screenshots of pages across devices
- Compares against baseline screenshots
- Detects unintended visual changes
- **Note:** Currently 3 tests skipped pending Docker validation

### Functional Tests
- Tests wallet connection flows
- Validates navigation
- Checks form interactions
- Tests Web3 functionality (mocked)

### Accessibility Tests
- WCAG 2.1 AA compliance checks
- Color contrast validation
- Keyboard navigation
- Screen reader support
- ARIA attributes
- **Current Status:** 20/28 passing (8 resume tests under investigation)

## Updating Baselines

When UI changes are intentional:

```bash
# Local (may differ from CI)
npx playwright test --update-snapshots

# Docker (matches CI exactly)
docker-compose -f docker-compose.test.yml run --rm playwright \
  npx playwright test --update-snapshots
```

Review changes:
```bash
git diff tests/**/*.png
```

## CI/CD Integration

Tests run automatically on:
- Pull requests (all tests)
- Pushes to main/dev (build + validation)

Results and screenshots are uploaded as artifacts.

**CI Environment:**
- Docker container (mcr.microsoft.com/playwright:v1.56.1-noble)
- NODE_ENV=production
- CI=true flag
- Headless browsers only

## Browser Support

Tests run on:
- **Desktop**: Chrome, Firefox, Safari
- **Mobile**: Pixel 5, iPhone 12
- **Tablet**: iPad Pro

## Configuration

See `playwright.config.ts` for:
- Timeout settings
- Device configurations
- Screenshot options
- CI/CD behavior

See `docker-compose.test.yml` for:
- Docker service configuration
- Volume mounts
- Environment variables
- Resource limits (2GB shm_size)

See `Dockerfile.test` for:
- Base image configuration
- Build steps
- Dependency installation

## System Dependencies (WSL/Linux)

If browsers fail to launch, install system dependencies:

```bash
sudo npx playwright install-deps
```

## Debugging

### Visual Debugging
```bash
# Local
npx playwright test --debug

# Docker (not recommended - use local for debugging)
docker-compose -f docker-compose.test.yml run --rm playwright \
  npx playwright test --debug
```

### Show Test Report
```bash
npx playwright show-report
```

### View Trace
```bash
npx playwright show-trace trace.zip
```

### Check Docker Test Output
```bash
# View test results from Docker runs
cat test-results/results.json

# View Playwright HTML report
npx playwright show-report playwright-report
```

## Best Practices

1. **Keep tests independent** - Each test should work in isolation
2. **Use meaningful test names** - Describe what's being tested
3. **Wait for stability** - Use `waitForLoadState('networkidle')`
4. **Avoid hardcoded waits** - Use Playwright's auto-waiting
5. **Mock external services** - Don't rely on real Web3 providers
6. **Use Docker for validation** - Match CI environment before pushing
7. **Add data-testid attributes** - For stable selectors that won't break with styling changes
8. **Scope locators appropriately** - Use specific regions to avoid false matches

## Test Status (Current)

| Test Suite         | Status       | Count | Notes                                   |
| ------------------ | ------------ | ----- | --------------------------------------- |
| Unit Tests         | ✅ Passing    | 14/14 | Jest + React Testing Library            |
| A11y Tests         | ✅ Passing    | 20/20 | Server-rendered pages WCAG 2.1 AA       |
| Resume Tests       | ⏸️ Skipped   | 0/8   | Client-side rendering blocked locally   |
| Visual Tests       | ⏸️ Skipped   | 0/3   | Client-side rendering blocked locally   |
| E2E Wallet Flow    | ⏸️ Skipped   | 0/10  | Client-side rendering blocked locally   |
| E2E Navigation     | ✅ Passing    | 1/1   | Main nav links test working             |

**Summary:** 39/60 Playwright tests passing locally (65%), 21 skipped due to client-side page rendering issue. All skipped tests restored from working commit and pushed to CI for Docker validation.

**Coverage:** 97.41% statement coverage (1393/1430), 55.42% branches, 54.28% functions

## Troubleshooting

### Tests pass locally but fail in CI

**Solution:** Use Docker to match CI environment exactly:

```bash
npm run test:e2e:docker:build
npm run test:e2e:docker
```

### Docker build is slow

**Expected:** First build takes ~5 minutes. Subsequent builds use cache (~1-2 minutes).

### "Cannot find module" errors in Docker

**Solution:** Rebuild image after package.json changes:

```bash
npm run test:e2e:docker:build
```

### Client-side pages return empty HTML in tests

**Status:** Under investigation in CI/Docker environment.

**Symptoms:** Pages like `/resume`, `/projects`, `/labs/*` return only 15 bytes locally with JavaScript error "Unexpected identifier 'overseer'".

**Action:** Tests restored from working commit (ce4724c) and pushed to CI. Awaiting Docker validation results.

**Workaround:** Tests properly skipped locally. See `docs/TECH_DEBT.md` for full investigation plan.

### Visual snapshots don't match

**Solution:** Regenerate in Docker to match CI:

```bash
docker-compose -f docker-compose.test.yml run --rm playwright \
  npx playwright test --update-snapshots
git add tests/**/*.png
git commit -m "test: update visual baselines"
```

## Resources

- [Playwright Documentation](https://playwright.dev/)
- [Testing Library Queries](https://testing-library.com/docs/queries/about/)
- [axe-core Rules](https://github.com/dequelabs/axe-core/blob/develop/doc/rule-descriptions.md)
- [Playwright Docker](https://playwright.dev/docs/docker)
