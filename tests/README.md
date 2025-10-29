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
│   └── all-pages.spec.ts
└── utils/               # Test utilities and helpers
```

## Running Tests

### All Tests
```bash
npm run test:e2e
```

### Interactive UI Mode
```bash
npm run test:e2e:ui
```

### Headed Mode (See Browser)
```bash
npm run test:e2e:headed
```

### Specific Test File
```bash
npx playwright test tests/visual/homepage.spec.ts
```

### Specific Browser
```bash
npx playwright test --project=chromium-desktop
```

## Test Types

### Visual Regression Tests
- Captures screenshots of pages across devices
- Compares against baseline screenshots
- Detects unintended visual changes

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

## Updating Baselines

When UI changes are intentional:

```bash
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

## System Dependencies (WSL/Linux)

If browsers fail to launch, install system dependencies:

```bash
sudo npx playwright install-deps
```

## Debugging

### Visual Debugging
```bash
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

## Best Practices

1. **Keep tests independent** - Each test should work in isolation
2. **Use meaningful test names** - Describe what's being tested
3. **Wait for stability** - Use `waitForLoadState('networkidle')`
4. **Avoid hardcoded waits** - Use Playwright's auto-waiting
5. **Mock external services** - Don't rely on real Web3 providers

## Resources

- [Playwright Documentation](https://playwright.dev/)
- [Testing Library Queries](https://testing-library.com/docs/queries/about/)
- [axe-core Rules](https://github.com/dequelabs/axe-core/blob/develop/doc/rule-descriptions.md)
