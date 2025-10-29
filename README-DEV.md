# Developer quickstart (PowerShell)

This file lists the common commands to run tests, format code, and debug pre-commit issues on Windows (PowerShell).

## Prerequisites

- Node.js and npm installed (v18+ recommended)
- Run `npm ci` to install dev dependencies (husky, lint-staged, playwright, etc.)

## Formatting

Format entire workspace (Prettier):

## Developer quickstart (PowerShell)

This file lists the common commands to run tests, format code, and debug pre-commit issues on Windows (PowerShell).


## Prerequisites

- Node.js and npm installed (v18+ recommended)

- Run `npm ci` to install dev dependencies (husky, lint-staged, playwright, etc.)


## Formatting

Format entire workspace (Prettier):

```powershell
npm run format
```

Check formatting only:

# Developer quickstart (PowerShell)

This is a short, focused quickstart for running the common developer commands on Windows PowerShell.

Prerequisites

- Node.js (v18+) and npm installed and available on PATH
- Run `npm ci` to install dependencies

Formatting

Format the whole repo (Prettier):

```powershell
npm run format
```

Check formatting only:

```powershell
npm run format:check
```

Pre-commit helper

If a commit fails due to formatting/lint-staged, run this to format and stage changes:

```powershell
npm run format
git add -A
```

Playwright (visual/e2e) examples

Run a focused test with test helpers enabled:

```powershell
npx cross-env NEXT_PUBLIC_TEST_HELPERS=1 npx playwright test tests/e2e/labs/wallet-connection.spec.ts --project=chromium-desktop -g "Mint NFT Flow"
```

Run the visual homepage test:

```powershell
npx cross-env NEXT_PUBLIC_TEST_HELPERS=1 npx playwright test tests/visual/homepage.spec.ts --project=chromium-desktop
```

Run the full suite (CI-like):

```powershell
npx cross-env NEXT_PUBLIC_TEST_HELPERS=1 npx playwright test --project=chromium-desktop
```

Dev server (with test helpers enabled):

```powershell
npx cross-env NEXT_PUBLIC_TEST_HELPERS=1 npm run dev
```

If `npx` is unavailable, use local binaries from `node_modules\.bin` (PowerShell):

```powershell
.\node_modules\.bin\cross-env NEXT_PUBLIC_TEST_HELPERS=1 .\node_modules\.bin\playwright test
```

Visual diffs

- Playwright saves diff artifacts under `test-results/.../compare` when snapshots differ.
- If a visual change is intentional, update the snapshot baseline and commit.
- If it's a regression, inspect the diff and open a PR with the relevant screenshots.

If things still fail, paste the failing terminal output and I'll help triage.
