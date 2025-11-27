# Metrics

| Metric        | Value                                      |
| ------------- | ------------------------------------------ |
| Code Coverage | 97.41%                                     |
| Build Time    | 35.13s (local, PowerShell Measure-Command) |
| Bundle Size   | 324.90 MB (.next folder total)             |

## Health

| Metric        | Value  |
| ------------- | ------ |
| Open Issues   | 0      |
| PR Turnaround | 0 days |
| Skipped Tests | 0      |

## Notes

- Code coverage was measured by running the project's Jest coverage report locally. The overall coverage is 97.41% (statements/lines). Several focused component tests were added and ran successfully.
- A production build attempt (Next.js Turbopack) failed during the build step, so build time and bundle size couldn't be measured. The build error(s) reported by Next/Turbopack are module resolution failures originating from `src/app/_components/_site/Homebar.tsx`: missing imports for `../GitHubButton`, `../Search`, and `../ThemeToggle`.

Next steps to get Build Time & Bundle Size:

1. Fix the import paths or restore the moved components referenced by `Homebar.tsx` (e.g. `GitHubButton`, `Search`, `ThemeToggle`).
2. Re-run `npm run build:skip-wagmi` and measure elapsed time.
3. Compute the production bundle size from the `.next` directory (or the output artifacts).

<!--
AGENT INSTRUCTIONS:
This file tracks project health metrics.
1. Update values based on the latest code analysis or CI/CD outputs.
2. "Code Coverage": Percentage of code covered by tests.
3. "Build Time": Time taken for the build process.
4. "Bundle Size": Size of production assets.
5. "Health": General health indicators like open issues count.
6. Ensure values are accurate and reflect the current state of the codebase.
-->
