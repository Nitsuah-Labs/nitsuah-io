Why `wagmi generate` failed on Netlify

Problem

- The `npm run build` step runs `npm run wagmi` which runs the wagmi code generator.
- The generator resolves contract metadata from block explorer APIs (Etherscan/Alchemy).
- On Netlify deploy-preview builds (and other CI/forked PRs) secure environment variables like `ETHERSCAN_API_KEY` are not exposed. When the generator tries to reach the API without keys it can fail and stop the build.

Safe behavior implemented in this repo

- We added `scripts/wagmi-generate.js` which checks for `ETHERSCAN_API_KEY` or `NEXT_PUBLIC_ALCHEMY_API_KEY`.
- If neither key is present the script will skip `wagmi generate` for preview/fork builds and exit 0 (success), allowing the site build to continue.
- For protected/main builds the script requires a key and will fail fast if neither key is present. This prevents forgetting to provide keys for production builds.

How to enable codegen in Netlify (production builds)

1. Go to your Netlify site: Site Settings → Build & deploy → Environment.
2. Add `ETHERSCAN_API_KEY` (or `NEXT_PUBLIC_ALCHEMY_API_KEY`) with a valid value.
3. Trigger a build on the protected branch (e.g., main). The codegen step will run and generate `src/generated.ts`.

Notes and alternatives

- Netlify does not expose secure env vars to forked PRs. This guard avoids failing preview deploys from forks.
- If you prefer to always have generated code available in PRs, consider committing `src/generated.ts` to the repo (trade-off: it can become stale).
- The wagmi Etherscan plugin displayed a deprecation message about Etherscan V1. Consider updating to any available API V2 option in the waffle/plugin if you want to avoid the deprecation warning.

Contact

If you want me to also modify the guard to only skip for forks (not all PRs), or to change behavior depending on branch, tell me which behavior you prefer and I will implement it.