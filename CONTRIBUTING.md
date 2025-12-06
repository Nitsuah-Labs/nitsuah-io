# Contributing to nitsuah.io

Thanks for your interest in contributing! This portfolio site is a personal project, but improvements and suggestions are welcome.

## Quick Start

```bash
# Clone the repo
git clone https://github.com/Nitsuah-Labs/nitsuah-io.git
cd nitsuah-io

# Install dependencies
npm ci

# Copy environment template
cp .env.example .env.local

# Start development server
npm run dev
```

## Daily Development Workflow

```bash
# Make your changes
# ...

# Quick commit (auto-formats + fast checks: ~3s)
npm run commit:safe

# Push (production build check: ~1min)
git push

# CI runs full test suite automatically
```

### For Pull Requests

1. **Fork & Clone**: Fork the repository and clone your fork
2. **Branch**: Create a feature branch (`git checkout -b feature/your-feature`)
3. **Develop**: Make your changes with clear, focused commits
4. **Test**: Ensure the build succeeds (`npm run build`)
5. **Push**: Push to your fork (`git push origin feature/your-feature`)
6. **PR**: Open a pull request with a clear description

## Environment Setup

### Configuration Files

**Main configs in `config/` directory:**

- `config/jest.config.ts` - Testing
- `config/tsconfig.json` - TypeScript
- `config/wagmi.config.ts` - Web3 codegen
- `config/prettier.config.json` - Formatting

**Root configs:**

- `tsconfig.json` - Editor/Next.js TypeScript
- `next.config.js` - Next.js build
- `package.json` - Scripts and dependencies

**Note:** The canonical config files used by CI and the project's scripts live in the `config/` directory. Editors may also read the root `tsconfig.json` but prefer `config/` when running CLI tooling.

### Git Hooks (Optimized)

Husky pre-commit hooks run `lint-staged` to automatically format staged files.

**Pre-commit (~3 seconds):**

- TypeScript type checking
- Auto-format staged files
- Jest unit tests

**Pre-push (~1 minute):**

- Production build only

**CI (Full Suite):**

- Accessibility tests
- Visual regression tests
- E2E wallet flows
- Lighthouse performance
- Cross-browser testing

**Philosophy:** Fast checks locally, comprehensive checks in CI.

## Skip Hooks (When Safe)

```bash
# Skip all validation (WIP commits, docs-only changes)
npm run commit:quick
# OR
git commit --no-verify
```

**Safe to skip for:**

- Documentation changes
- JSON/config tweaks
- Minor CSS you've manually verified

**NOT safe to skip for:**

- TypeScript changes (will break CI)
- Component/logic changes (tests will fail)

## Code Standards

### TypeScript

- Use strict TypeScript (no `any` unless absolutely necessary)
- Follow existing type patterns in `src/types/`
- Leverage path aliases (`@/components`, `@/lib`, etc.)
- Run `npm run typecheck` for TypeScript errors

### React/Next.js

- Use functional components with hooks
- Keep components small and focused
- Use Next.js 16 App Router conventions
- Leverage server components when appropriate

### Styling

- CSS modules or component-scoped styles preferred
- Follow existing color schemes and spacing
- Ensure responsive design (mobile-first)
- Maintain accessibility (WCAG 2.1 AA)

### Formatting

- ESLint and Prettier are configured - they run on save
- Run `npm run lint` to check for issues
- Run `npm run format` to format all files

## Project Structure

```bash
src/
├── app/              # Next.js App Router pages
│   ├── _components/  # React components
│   └── _styles/      # CSS files
├── lib/              # Utilities and data
│   └── data/         # Static data (projects, etc.)
└── types/            # TypeScript definitions
```

## Adding Content

### New Project

1. Edit `src/lib/data/projects.ts`
2. Add project with all required fields
3. Set `featured: true` to show on homepage
4. Add project assets to `public/assets/`

### New Page

1. Create in `src/app/your-page/page.tsx`
2. Update sitemap in `src/app/sitemap.ts`
3. Add to navigation if needed

## Environment Variables

**Local (`.env.local`):**

```bash
# Optional - for wagmi generation
ETHERSCAN_API_KEY=your_key
# OR
NEXT_PUBLIC_ALCHEMY_API_KEY=your_key

# Optional - analytics
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

# WalletConnect Project ID (hardcoded in wagmi.ts, can be moved here)
# NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_project_id
```

**Netlify:** Add same vars in Netlify UI for production builds.

## Web3 Development

### Wagmi Code Generation

```bash
# Normal dev (uses existing generated.ts)
npm run dev

# Regenerate after contract changes
npm run wagmi
npm run dev:wagmi
```

**Requires API keys in `.env.local`** (see above)

**CI behavior:** Skips generation if no keys (uses committed file).

### Web3 Features

- `/profile` - Wallet dashboard (address, ENS, balance, copy, disconnect)
- Labs header - Shows connected wallet (click to copy)
- Connect component - Wallet logos, loading states, install prompts

## Testing

### Unit Tests (Jest)

**Current Coverage:** 98% statements | 81% branches | 82% functions
**Test Count:** 213 tests across 16 suites

```bash
npm test                           # All unit tests
npm test -- --watch               # Watch mode
npm test -- --coverage            # Coverage report
npm test -- Connect.test.tsx      # Specific test file
```

### E2E & Accessibility Tests (Playwright)

**Test Count:** 59 Playwright tests (20 accessibility, 6 visual, 33 E2E)

```bash
# Quick local testing
npm run test:e2e                  # All Playwright tests
npm run test:a11y                 # Accessibility suite
npm run test:a11y:quick          # Homepage, About, Projects only
npm run test:visual              # Visual regression tests only

# Specific test suites
npx playwright test tests/visual/projects.spec.ts
npx playwright test tests/accessibility/all-pages.spec.ts --grep="Homepage"

# UI mode for debugging
npm run test:e2e:ui
```

### Visual Regression Testing

Visual regression tests capture screenshots and compare them against baseline images to detect unintended visual changes.

#### Running Visual Tests

```bash
# Run visual regression tests
npm run test:visual

# View test report with diffs
npx playwright show-report
```

#### Updating Baselines

When you make **intentional** visual changes (colors, layouts, fonts), update the baseline screenshots:

```bash
# Local update (fast, for development iteration)
npm run test:visual:update

# Docker update (CI-matched, use before committing)
npm run test:visual:update:docker

# Update specific test only
./scripts/update-visual-baselines.sh --docker --test homepage
```

**Important:** Always use Docker mode (`npm run test:visual:update:docker`) before committing to ensure baselines match CI exactly.

#### When to Update Baselines

✅ **Do update** when you've made intentional changes to:
- Colors, fonts, or styling
- Layouts or component positioning  
- UI elements (added/removed/modified)
- Images or icons

❌ **Don't update** for:
- Unintended regressions (fix the code instead!)
- Random differences (investigate root cause)
- CI failures without understanding why

#### Best Practices

- **Review diffs**: Always check `npx playwright show-report` before committing baselines
- **Use Docker**: Run `npm run test:visual:update:docker` before final commit
- **Mask dynamic content**: Canvas, animations, and timestamps should be masked
- **Document changes**: Include visual changes in commit messages

**Full Documentation:** See `docs/VISUAL_REGRESSION.md` for complete guide and troubleshooting.

### Docker Testing (CI-Consistent Environment)

**Why Docker?** Ensures tests match CI environment exactly.

```bash
# Build image (first time or after dependency changes)
npm run test:e2e:docker:build

# Run tests in Docker (matches CI environment exactly)
npm run test:e2e:docker

# Run specific test file in Docker
docker-compose -f docker-compose.test.yml run --rm playwright npx playwright test tests/accessibility/all-pages.spec.ts
```

**When to use Docker:**
- Before committing visual baseline updates
- Before pushing changes to visual components
- After updating dependencies
- When local tests pass but CI fails
- To regenerate visual snapshots consistently

### Test Writing Best Practices

#### Use Stable Selectors

```typescript
// ✅ Good: data-testid for test-specific elements
await page.waitForSelector("[data-testid='projects-section']");

// ✅ Good: Semantic selectors
const button = page.getByRole("button", { name: /featured/i });

// ❌ Bad: Fragile CSS selectors
const button = page.locator(".css-module-hash-button");
```

#### Add Proper Wait Conditions

```typescript
// ✅ Good: Wait for specific element
await page.waitForSelector("[data-testid='content']", { timeout: 10000 });

// ❌ Bad: Arbitrary timeout
await page.waitForTimeout(5000);
```

#### Scope Locators Appropriately

```typescript
// ✅ Good: Scoped to specific region
const links = page.locator("[class*='cardActions']").getByRole("link");

// ❌ Bad: Too broad, matches unrelated elements
const links = page.getByRole("link");
```

## Performance Targets

| Stage      | Time  | What Runs                 |
| ---------- | ----- | ------------------------- |
| Pre-commit | ~3s   | Typecheck + format + jest |
| Pre-push   | ~1min | Production build          |
| CI         | ~5min | Full test suite           |

## Common Tasks

```bash
# Format all files
npm run format

# Type check
npm run typecheck

# Build locally
npm run build

# Analyze bundle size
npm run build
# Check .next/analyze/
```

## Commit Messages

Use conventional commits format:

- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation changes
- `style:` Code style changes (formatting)
- `refactor:` Code refactoring
- `test:` Adding or updating tests
- `chore:` Maintenance tasks

Example: `feat: add dark mode toggle to navigation`

## Pull Request Guidelines

### Before Submitting

- [ ] Code builds successfully (`npm run build`)
- [ ] All tests pass (`npm test`)
- [ ] No TypeScript errors (`npm run typecheck`)
- [ ] No linting errors (`npm run lint`)
- [ ] Follows existing code style
- [ ] Includes tests for new features
- [ ] Visual baselines updated with Docker if UI changed (`npm run test:visual:update:docker`)

### PR Description Should Include

- Clear description of changes
- Motivation/context for the change
- Screenshots for UI changes
- Breaking changes (if any)
- Related issues
## Areas That Need Help

- 🧪 **Testing**: E2E tests for wallet flows
- 🔗 **Web3**: Contract debugging, Mumbai → Amoy migration
- 📱 **Mobile**: Wallet connection optimization
- 🚀 **Performance**: Bundle size optimization
- 📸 **Visual Assets**: Product screenshots for crypto and client demo pages

## Documentation

- **Architecture**: `docs/ARCH.md` - Project structure and architecture
- **Visual Testing**: `docs/VISUAL_REGRESSION.md` - Complete visual regression testing guide
- **Screenshots**: `docs/SCREENSHOTS.md` - Required visual assets
- **Feedback**: `FEEDBACK.md` - Known issues and improvement ideas
- 🚀 **Performance**: Bundle size optimization

## Troubleshooting

### "npx: command not found"

Node.js not in PATH. Fix:

```powershell
# PowerShell (permanent)
[Environment]::SetEnvironmentVariable("PATH", "C:\Program Files\nodejs;$env:PATH", "User")
```

### Pre-commit too slow?

Use quick commit script:

```bash
npm run commit:safe
```

### CI failing but local passed?

Expected! Local is lightweight. Check CI logs for specifics.

## Questions?

- Open an issue for bugs or feature requests
- Check `ARCHITECTURE.md` for project overview
- Check `FEEDBACK.md` for known UI/UX issues
- Discussions for general questions
- Check existing issues before creating new ones

## License

By contributing, you agree that your contributions will be licensed under the same license as the project.

---

**Note**: This is a personal portfolio, so not all contributions may be accepted. The maintainer reserves the right to decline PRs that don't align with the project's goals.
