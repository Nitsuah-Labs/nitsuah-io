# Docker Testing Setup

## Why Docker for Tests?

**Problem**: Tests behave differently in dev vs CI due to:
- Different Node.js versions
- Different OS (Windows/Linux/macOS)
- Different browser rendering
- Different build modes (dev vs production)
- Next.js hydration differences between environments

**Solution**: Docker provides a consistent, isolated environment that matches CI exactly.

## Quick Start

### Option 1: Local Testing (Fast, but may have env differences)
```bash
npm run test:e2e
```

### Option 2: Docker Testing (Consistent with CI)
```bash
# Build the Docker image (first time only)
npm run test:e2e:docker:build

# Run tests in Docker
npm run test:e2e:docker
```

## Docker Commands

### Run all tests
```bash
docker-compose -f docker-compose.test.yml run --rm playwright
```

### Run specific test file
```bash
docker-compose -f docker-compose.test.yml run --rm playwright npx playwright test tests/accessibility/all-pages.spec.ts
```

### Run with UI (requires X11 forwarding on Linux/Mac)
```bash
docker-compose -f docker-compose.test.yml run --rm playwright npx playwright test --ui
```

### Build fresh image (after dependency changes)
```bash
docker-compose -f docker-compose.test.yml build --no-cache
```

### Clean up Docker resources
```bash
docker-compose -f docker-compose.test.yml down -v
```

## Troubleshooting

### Tests pass locally but fail in CI
→ Use Docker! Run `npm run test:e2e:docker` to match CI environment

### "Address already in use" error
→ Stop any running Next.js dev servers: `Stop-Process -Name node -Force`

### Visual tests have pixel differences
→ Snapshots are platform-specific. Regenerate in Docker:
```bash
docker-compose -f docker-compose.test.yml run --rm playwright npx playwright test --update-snapshots
```

### Out of memory errors
→ Increase Docker memory: Docker Desktop → Settings → Resources → Memory → 4GB+

## CI Integration

The CI workflow already uses a Playwright Docker image. Local Docker testing ensures your changes will pass CI.

### Current CI Setup
- Uses `mcr.microsoft.com/playwright:v1.49.1-noble`
- Runs production build (`npm run build:ci && npm run start`)
- Port 3000 (must match `playwright.config.ts`)

## Known Issues & Solutions

### Issue: Accessibility tests fail with "document.head is null"
**Root Cause**: Next.js 16 + React 19 strict hydration + Providers returning null

**Short-term Fix**: Tests run against dev server locally (where hydration is more forgiving)

**Long-term Fix**: Refactor `src/app/providers.tsx` to avoid returning null during mount

### Issue: Visual tests fail due to font rendering differences
**Solution**: Docker ensures consistent fonts across all environments

## Best Practices

1. **Always test in Docker before pushing** if you changed:
   - Visual components
   - Layout/CSS
   - Dependencies
   - Next.js config

2. **Update snapshots carefully**:
   ```bash
   # Review changes first
   git diff tests/**/*.png
   
   # If intentional, commit updated snapshots
   git add tests/**/*.png
   ```

3. **Use focused tests during development**:
   ```bash
   # Fast local iteration
   npx playwright test tests/accessibility/all-pages.spec.ts --grep="Homepage"
   
   # Final check in Docker before commit
   npm run test:e2e:docker
   ```

## Performance Tips

- **Mount volumes**: `docker-compose.test.yml` mounts your code, so you don't need to rebuild for code changes
- **Reuse containers**: Add `--detach` to keep container running between test runs
- **Parallel workers**: Docker compose scales workers based on available CPU

## Maintenance

- Update Playwright version in `Dockerfile.test` when upgrading locally
- Keep `playwright.config.ts` port in sync with Docker setup (port 3000)
- Periodically prune Docker images: `docker system prune -a`
