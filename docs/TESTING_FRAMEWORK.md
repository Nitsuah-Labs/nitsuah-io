# Testing Framework - Phase 3.1

Comprehensive testing strategy for visual and functional validation across all pages.

## Overview

This framework provides systematic testing for:

1. **Visual Regression** - Ensure UI consistency across changes
2. **Functional Testing** - Verify features work correctly (wallet, NFTs, navigation)
3. **Accessibility Testing** - WCAG 2.1 AA compliance
4. **Responsive Testing** - Mobile, tablet, desktop breakpoints
5. **Performance Testing** - Core Web Vitals monitoring

---

## Test Matrix

### Pages to Test (14 total)

| Page            | Route            | Key Features                                     | Priority |
| --------------- | ---------------- | ------------------------------------------------ | -------- |
| Homepage        | `/`              | Spline 3D, nav, footer, featured projects        | High     |
| About           | `/about`         | Spline 3D, bio content                           | High     |
| Projects        | `/projects`      | Featured repos + portfolio grid cards            | High     |
| Crypto          | `/crypto`        | NFT/POAP cards                                   | Medium   |
| Labs Hub        | `/labs`          | Overview, navigation grid                        | High     |
| Register Domain | `/labs/register` | Wallet connect, Mumbai testnet, ENS registration | High     |
| Mint NFT        | `/labs/mint`     | Wallet connect, NFT minting                      | High     |
| Domains         | `/labs/domains`  | Domain management                                | Medium   |
| Lookup          | `/labs/lookup`   | ENS lookup                                       | Low      |
| Stake           | `/labs/stake`    | Token staking UI                                 | Low      |
| Token           | `/labs/token`    | Token interface                                  | Low      |
| DAO             | `/labs/dao`      | DAO governance                                   | Low      |
| AI Lab          | `/labs/ai`       | AI experiments                                   | Low      |
| 404 Page        | `/nonexistent`   | Error handling                                   | Low      |

### Breakpoints to Test

- **Mobile**: `< 768px` (iPhone SE, iPhone 12/13, Pixel 5)
- **Tablet**: `768px - 1024px` (iPad, iPad Pro)
- **Desktop**: `> 1024px` (1920x1080, 2560x1440)

---

## 1. Manual Testing Checklist

### Visual Tests (All Pages)

- [ ] Header renders correctly (logo, nav links)
- [ ] Footer renders correctly (links, position)
- [ ] Content doesn't overlap with fixed header/footer
- [ ] Spline 3D components load (homepage, about)
- [ ] Images load correctly (no broken images)
- [ ] Cards render with proper spacing
- [ ] Typography is readable and properly sized
- [ ] Colors match design system
- [ ] Hover states work on interactive elements
- [ ] Animations/transitions are smooth

### Functional Tests (Labs Pages)

#### Wallet Connection (`/labs/register`, `/labs/mint`)

- [ ] "Connect Wallet" button appears when disconnected
- [ ] MetaMask connection works
- [ ] WalletConnect works (mobile)
- [ ] Connected state shows address
- [ ] Disconnect button works
- [ ] Connection persists on page refresh

#### Network Switching (`/labs/register`)

- [ ] Mumbai testnet option appears
- [ ] Network switch prompt works
- [ ] Correct network indicator shows
- [ ] Warning shows if on wrong network

#### ENS Registration (`/labs/register`)

- [ ] Domain input field works
- [ ] Validation shows for invalid domains
- [ ] Register button is disabled when invalid
- [ ] Transaction flow works (approve, confirm)
- [ ] Success/error messages show

#### NFT Minting (`/labs/mint`)

- [ ] Mint form fields work
- [ ] Image upload/preview works
- [ ] Mint button triggers transaction
- [ ] Loading states show during minting
- [ ] Success message shows with link to OpenSea
- [ ] Error handling works

### Responsive Tests

#### Mobile (`< 768px`)

- [ ] Navigation collapses to hamburger menu
- [ ] Buttons are full-width
- [ ] Touch targets are at least 44x44px
- [ ] Grid layouts stack vertically
- [ ] Text is readable (no overflow)
- [ ] Spline 3D loads on mobile
- [ ] Footer doesn't overlap content

#### Tablet (`768px - 1024px`)

- [ ] Grid layouts show 2-3 columns
- [ ] Navigation shows all links
- [ ] Spacing is appropriate
- [ ] Cards have proper proportions

#### Desktop (`> 1024px`)

- [ ] Grid layouts show 3-6 columns
- [ ] Max-width constrains content
- [ ] All features fully visible

### Accessibility Tests

- [ ] All images have alt text
- [ ] Buttons have aria-labels
- [ ] Form inputs have labels
- [ ] Keyboard navigation works (Tab, Enter, Escape)
- [ ] Focus indicators are visible
- [ ] Screen reader can navigate page
- [ ] Color contrast meets WCAG AA (4.5:1 for text)
- [ ] No keyboard traps
- [ ] Live regions announce dynamic content

---

## 2. Automated Testing Setup

### Playwright Installation

```bash
npm install -D @playwright/test
npx playwright install
```

### Test Structure

```
tests/
├── e2e/
│   ├── homepage.spec.ts
│   ├── projects.spec.ts
│   ├── crypto.spec.ts
│   ├── labs/
│   │   ├── register.spec.ts
│   │   ├── mint.spec.ts
│   │   └── navigation.spec.ts
├── visual/
│   ├── homepage.visual.spec.ts
│   ├── responsive.visual.spec.ts
├── accessibility/
│   ├── all-pages.a11y.spec.ts
└── utils/
    ├── wallet-mock.ts
    └── test-helpers.ts
```

### Example Visual Regression Test

```typescript
// tests/visual/homepage.visual.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Homepage Visual Tests', () => {
  test('homepage renders correctly on desktop', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Wait for Spline to load
    await page.waitForTimeout(3000);
    
    await expect(page).toHaveScreenshot('homepage-desktop.png', {
      fullPage: true,
      maxDiffPixels: 100,
    });
  });

  test('homepage renders correctly on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    await expect(page).toHaveScreenshot('homepage-mobile.png', {
      fullPage: true,
      maxDiffPixels: 100,
    });
  });
});
```

### Example Functional Test

```typescript
// tests/e2e/labs/register.spec.ts
import { test, expect } from '@playwright/test';

test.describe('ENS Registration', () => {
  test('shows connect wallet button when disconnected', async ({ page }) => {
    await page.goto('/labs/register');
    
    const connectButton = page.getByRole('button', { name: /connect wallet/i });
    await expect(connectButton).toBeVisible();
  });

  test('validates domain input', async ({ page }) => {
    await page.goto('/labs/register');
    
    // Mock wallet connection
    // ... wallet mock setup ...
    
    const domainInput = page.getByLabel(/domain name/i);
    await domainInput.fill('invalid..domain');
    
    const errorMessage = page.getByText(/invalid domain/i);
    await expect(errorMessage).toBeVisible();
  });
});
```

### Example Accessibility Test

```typescript
// tests/accessibility/all-pages.a11y.spec.ts
import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const pages = [
  '/',
  '/about',
  '/projects',
  '/crypto',
  '/labs',
  '/labs/register',
  '/labs/mint',
];

for (const route of pages) {
  test(`${route} has no accessibility violations`, async ({ page }) => {
    await page.goto(route);
    await page.waitForLoadState('networkidle');
    
    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .analyze();
    
    expect(results.violations).toEqual([]);
  });
}
```

### Playwright Config

```typescript
// playwright.config.ts
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },

  projects: [
    // Desktop browsers
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
    
    // Mobile browsers
    {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 5'] },
    },
    {
      name: 'Mobile Safari',
      use: { ...devices['iPhone 12'] },
    },
    
    // Tablet
    {
      name: 'iPad',
      use: { ...devices['iPad Pro'] },
    },
  ],

  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
  },
});
```

---

## 3. CI/CD Integration

### GitHub Actions Workflow

```yaml
name: E2E Tests

on:
  push:
    branches: [main, phase-3]
  pull_request:
    branches: [main]

jobs:
  test:
    timeout-minutes: 60
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v4
      
      - uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Install Playwright Browsers
        run: npx playwright install --with-deps
      
      - name: Run Playwright tests
        run: npx playwright test
      
      - uses: actions/upload-artifact@v4
        if: always()
        with:
          name: playwright-report
          path: playwright-report/
          retention-days: 30
```

---

## 4. Performance Testing

### Lighthouse CI

```bash
npm install -D @lhci/cli
```

#### lighthouserc.json (already exists)

```json
{
  "ci": {
    "collect": {
      "url": ["http://localhost:3000/", "http://localhost:3000/projects"],
      "numberOfRuns": 3
    },
    "assert": {
      "preset": "lighthouse:recommended",
      "assertions": {
        "categories:performance": ["warn", { "minScore": 0.8 }],
        "categories:accessibility": ["error", { "minScore": 0.9 }],
        "first-contentful-paint": ["warn", { "maxNumericValue": 2000 }],
        "largest-contentful-paint": ["warn", { "maxNumericValue": 2500 }]
      }
    }
  }
}
```

#### Run Lighthouse

```bash
# Local
npm run dev
npx lhci autorun

# CI (add to GitHub Actions)
- name: Run Lighthouse CI
  run: |
    npm run build
    npm run start &
    npx lhci autorun
```

---

## 5. Test Maintenance

### When to Run Tests

- **Before Committing**: Run visual + accessibility tests on changed pages
- **Before PR**: Run full test suite
- **Before Merge**: CI runs full suite + Lighthouse
- **After Deploy**: Smoke tests on production

### Updating Baselines

When UI intentionally changes:

```bash
# Update visual regression baselines
npx playwright test --update-snapshots

# Review changes
git diff tests/**/*.png
```

### Test Coverage Goals

- **Visual**: 100% of public pages
- **Functional**: 100% of critical flows (wallet, NFT minting)
- **Accessibility**: 100% of pages (automated + manual)
- **Performance**: All main pages meet Core Web Vitals

---

## 6. Quick Start

### Day 1: Setup

1. Install Playwright: `npm install -D @playwright/test`
2. Install browsers: `npx playwright install`
3. Create basic test: Copy homepage.visual.spec.ts example above
4. Run test: `npx playwright test`

### Day 2: Visual Regression

1. Create tests for all 14 pages
2. Generate baseline screenshots
3. Run tests to verify baselines

### Day 3: Functional Tests

1. Create wallet mock utilities
2. Test ENS registration flow
3. Test NFT minting flow

### Day 4: Accessibility

1. Install axe-core: `npm install -D @axe-core/playwright`
2. Run accessibility scan on all pages
3. Fix any violations found

### Day 5: CI Integration

1. Add GitHub Actions workflow
2. Configure artifact uploads
3. Run full test suite on PR

---

## Resources

- [Playwright Documentation](https://playwright.dev/)
- [axe-core Playwright](https://github.com/dequelabs/axe-core-npm/tree/develop/packages/playwright)
- [Lighthouse CI](https://github.com/GoogleChrome/lighthouse-ci)
- [Web Vitals](https://web.dev/vitals/)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)

---

## Next Steps (Priority Order)

1. [ ] Install Playwright and dependencies
2. [ ] Create basic visual regression tests (homepage, projects)
3. [ ] Create functional tests for wallet connection
4. [ ] Create functional tests for ENS registration
5. [ ] Create functional tests for NFT minting
6. [ ] Add accessibility tests with axe-core
7. [ ] Add responsive tests (mobile/tablet/desktop)
8. [ ] Integrate with GitHub Actions CI
9. [ ] Add Lighthouse CI to measure performance
10. [ ] Document test results and establish baselines
