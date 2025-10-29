# Developer Guide

Complete reference for developing nitsuah-io.

## Quick Start

```bash
npm ci                    # Install dependencies
npm run dev              # Start dev server
npm run commit:safe      # Quick commit with formatting
git push                 # Triggers production build check
```

## Daily Workflow

```bash
# Make changes
# ...

# Quick commit (auto-formats + fast checks: ~3s)
npm run commit:safe

# Push (production build check: ~1min)
git push

# CI runs full test suite automatically
```

## Git Hooks (Optimized)

### Pre-commit (~3 seconds)
- TypeScript type checking
- Auto-format staged files
- Jest unit tests

### Pre-push (~1 minute)
- Production build only

### CI (Full Suite)
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

## Configuration Files

**Main configs in `config/` directory:**
- `config/jest.config.ts` - Testing
- `config/tsconfig.json` - TypeScript
- `config/wagmi.config.ts` - Web3 codegen
- `config/prettier.config.json` - Formatting

**Root configs:**
- `tsconfig.json` - Editor/Next.js TypeScript
- `next.config.js` - Next.js build
- `package.json` - Scripts and dependencies

## Wagmi Code Generation

```bash
# Normal dev (uses existing generated.ts)
npm run dev

# Regenerate after contract changes
npm run wagmi
npm run dev:wagmi
```

**Requires API keys in `.env.local`:**
```bash
ETHERSCAN_API_KEY=your_key_here
# OR
NEXT_PUBLIC_ALCHEMY_API_KEY=your_key_here
```

**CI behavior:** Skips generation if no keys (uses committed file).

## Testing

```bash
npm test                           # Jest unit tests
npm run test:e2e                   # Playwright e2e tests
npm run test:a11y:quick           # Accessibility tests
```

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

## Performance Targets

| Stage      | Time  | What Runs                 |
| ---------- | ----- | ------------------------- |
| Pre-commit | ~3s   | Typecheck + format + jest |
| Pre-push   | ~1min | Production build          |
| CI         | ~5min | Full test suite           |

## Environment Variables

**Local (`.env.local`):**
```bash
# Optional - for wagmi generation
ETHERSCAN_API_KEY=your_key
# OR
NEXT_PUBLIC_ALCHEMY_API_KEY=your_key

# Optional - analytics
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

**Netlify:** Add same vars in Netlify UI for production builds.

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

# Run specific test
npm test -- Connect.test.tsx
```

## Need Help?

- Check `ARCHITECTURE.md` for project overview
- Check `FEEDBACK.md` for known UI/UX issues
- Open a GitHub issue for bugs/features
