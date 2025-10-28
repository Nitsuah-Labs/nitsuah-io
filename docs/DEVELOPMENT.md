# Development Guide

Complete guide for developing nitsuah-io locally and in CI/CD environments.

---

## Quick Start

```bash
# Install dependencies
npm ci

# Start dev server (fast - no wagmi generation)
npm run dev

# After contract changes (regenerates wagmi hooks)
npm run dev:wagmi
```

---

## Configuration Files

### Canonical Config Locations

All major configs centralized in `config/` directory:

- **`config/jest.config.ts`** - Jest/testing configuration
- **`config/jest.setup.ts`** - Jest setup helpers and mocks
- **`config/tsconfig.json`** - TypeScript config for typecheck script
- **`config/wagmi.config.ts`** - Wagmi codegen configuration
- **`config/prettier.config.json`** - Prettier formatting rules

### Root Level Configs

- **`jest.config.cjs`** - CommonJS shim that loads TS config
- **`tsconfig.json`** - Primary tsconfig for editors and Next.js
- **`next.config.js`** - Next.js configuration
- **`netlify.toml`** - Netlify deployment settings
- **`package.json`** - Dependencies and scripts

**Note:** Keep both `config/jest.config.ts` and root `jest.config.cjs` - they serve different runtimes.

---

## Wagmi Code Generation

### How It Works

- `npm run wagmi` generates hooks in `src/generated.ts`
- Requires API keys: `ETHERSCAN_API_KEY` or `NEXT_PUBLIC_ALCHEMY_API_KEY`
- Safe for CI: skips generation if keys missing (uses committed file)

### Local Development

```bash
# Normal dev (uses existing generated.ts)
npm run dev

# Regenerate after contract changes
npm run wagmi:generate
npm run dev:wagmi
```

### CI/CD Behavior

**Netlify Deploys:**

- Preview builds: Skips generation if no API keys
- Production builds: Uses committed `src/generated.ts`
- Add `ETHERSCAN_API_KEY` to Netlify env vars to enable regeneration

**Script Logic:**

`scripts/wagmi-generate.js` checks for API keys and:
- ✅ Skips generation if keys missing (preview/fork builds)
- ✅ Uses committed file for build
- ❌ Fails on protected branches if keys missing

---

## Performance Optimization

### Dev Server Speed

**Problem:** Slow startup (~15-20 seconds)

**Quick Fixes Applied:**

1. **Conditional wagmi generation**

   ```bash
   npm run dev           # Fast - no regeneration
   npm run dev:wagmi     # Regenerates hooks first
   ```

2. **Lazy load heavy components**

   ```typescript
   // Spline 3D loads on demand, not at startup
   const SplineScene = dynamic(
     () => import('./_components/_spline/spline-home'),
     { ssr: false, loading: () => <div>Loading...</div> }
   )
   ```

3. **TypeScript incremental builds**

   ```json
   // tsconfig.json
   {
     "compilerOptions": {
       "incremental": true,
       "skipLibCheck": true
     }
   }
   ```

**Expected Performance:**

- Cold start: ~8-12 seconds (40% faster)
- Hot reload: ~1-2 seconds (60% faster)
- Build time: ~30-40 seconds (33% faster)

### Bundle Optimization

```bash
# Analyze bundle size
npm run build
# Check .next/analyze/ output
```

**Tips:**

- Use Next.js `Image` component for all images
- Dynamic imports for heavy components (Spline, Charts)
- Tree-shake unused Material-UI components

---

## Environment Variables

### Required for Local Development

Create `.env.local` (gitignored):

```bash
# Optional - for wagmi generation
ETHERSCAN_API_KEY=your_key_here
# OR
NEXT_PUBLIC_ALCHEMY_API_KEY=your_key_here

# Optional - analytics
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

### Production (Netlify)

Add these in Netlify UI:

- `ETHERSCAN_API_KEY` or `NEXT_PUBLIC_ALCHEMY_API_KEY`
- `NEXT_PUBLIC_GA_ID` (if using analytics)

**Security:** Never commit `.env.local` - already in `.gitignore`

---

## Pre-Commit Hook

Husky pre-commit hook automatically runs `lint-staged` which:

1. Formats staged files with Prettier
2. Ensures code consistency before commit

The hook runs locally using your installed Node.js.

**Setup:**

```bash
npm ci  # Install dependencies (includes husky setup)
```

**Usage:**

```bash
# Commit normally - formatting runs automatically
git commit -m "feat: add feature"

# Manually format all files
npm run format

# Check formatting without changing files
npm run format:check
```

---

## Testing

### Run Tests

```bash
# All tests
npm test

# Watch mode
npm test -- --watch

# Coverage
npm test -- --coverage

# Specific file
npm test Connect.test.tsx
```

### Current Test Status

- ✅ 3/3 test suites passing
- `Connect.test.tsx` - Wallet connection component
- `MintNFT.test.tsx` - NFT minting component
- `sanity.test.ts` - Basic sanity checks

### Writing Tests

```typescript
// Component test example
import { render, screen } from '@testing-library/react'
import { Connect } from './Connect'

test('renders connect button', () => {
  render(<Connect />)
  expect(screen.getByText(/connect/i)).toBeInTheDocument()
})
```

---

## Build & Deploy

### Local Build

```bash
# Production build
npm run build

# Preview production build
npm run start
```

### Netlify Deploy

**Build Settings:**

- Build command: `next build`
- Publish directory: `.next`
- Node version: 22.x LTS

**Deployment:**

- Push to `main` → Production deploy
- Pull request → Preview deploy
- Preview builds skip wagmi generation if no keys

---

## Common Issues

### Slow Dev Server

**Solution:** Use `npm run dev` (not `dev:wagmi`) for normal development

### Wagmi Generation Fails

**Solution:** Check API keys in `.env.local` or use committed `src/generated.ts`

### TypeScript Errors

**Solution:**

```bash
npm run typecheck  # Check errors
npm run format     # Fix formatting
```

### Pre-Commit Hook Fails

**Solution:**

```bash
# Ensure dependencies are installed
npm ci

# Or skip hook (not recommended)
git commit --no-verify
```

---

## Scripts Reference

```bash
# Development
npm run dev              # Start dev server (fast)
npm run dev:wagmi        # Regenerate hooks + dev server
npm run build            # Production build
npm run start            # Preview production build

# Code Quality
npm run typecheck        # TypeScript validation
npm run lint             # ESLint check
npm run format           # Format all files
npm run format:check     # Check formatting

# Wagmi
npm run wagmi:generate   # Regenerate hooks (needs API keys)

# Testing
npm test                 # Run all tests
npm run test:watch       # Watch mode
```

---

## Next Steps

- See **ARCHITECTURE.md** for tech stack overview
- See **CONTRIBUTING.md** for contribution guidelines
- See **PERFORMANCE_CHECKLIST.md** for testing checklist
- See **TODO.md** for roadmap (gitignored)
