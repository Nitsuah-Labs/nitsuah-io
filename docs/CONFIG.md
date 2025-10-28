# Repository configuration overview

This file explains which configuration files live where and why. It is a short guide to avoid re-introducing duplicates.

Configs in `config/`

- `config/jest.config.ts` - the TypeScript Jest config used by Next's `next/jest` helper. Keeps TS types and can import Next config.
- `config/jest.setup.ts` - Jest setup helpers and mocks.
- `config/tsconfig.json` - Typecheck-specific tsconfig used by the `npm run typecheck` script. This allows tighter/noEmit compilation for CI.
- `config/wagmi.config.ts` - wagmi codegen config.
- `config/prettier.config.json` - canonical Prettier config used by `package.json` scripts.

Files at repo root

- `jest.config.cjs` - a CommonJS shim that loads the TS Jest config so `npx jest` works without transpiling the config.
- `tsconfig.json` - primary tsconfig used by editors/Next.js. Keep this for editor integration and Next build.
- `babel.config.js`, `next.config.js`, `netlify.toml`, `package.json` - standard project-level configs.

Notes and recommendations

- Keep both `config/jest.config.ts` and `jest.config.cjs` as-is. They serve different runtimes: the TS config is source-of-truth; the CJS file is a shim for CLI tooling. If you prefer one canonical config, consolidate and update scripts accordingly.
- `config/prettier.config.json` is used by `package.json` scripts. There was a duplicate `config/prettier.config.js` file; it has been removed to avoid confusion.
- Add `.env.local` to `.gitignore` (done) and never commit secrets. If secrets were committed (see `.env.local`), rotate them immediately.
- If you need to remove secrets from git history, use `git filter-repo` or the BFG repo cleaner. This is destructive and requires force-pushing; coordinate with collaborators.

Contact/authoring

- If you want me to run the safe git steps to untrack `.env.local` and commit the changes, say "Do it" and I'll prepare the commands or run them for you.
- 