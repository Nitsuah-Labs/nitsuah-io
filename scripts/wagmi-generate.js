#!/usr/bin/env node
const { execSync } = require("child_process");

const etherscanKey = process.env.ETHERSCAN_API_KEY;
const alchemyKey = process.env.NEXT_PUBLIC_ALCHEMY_API_KEY;

if (!etherscanKey && !alchemyKey) {
  // When running in PR builds on Netlify, secure env vars are not exposed.
  // Exiting successfully avoids failing the build for forks/PRs.
  // eslint-disable-next-line no-console
  console.warn(
    'Skipping "wagmi generate": ETHERSCAN_API_KEY and NEXT_PUBLIC_ALCHEMY_API_KEY are not set.'
  );
  process.exit(0);
}

try {
  // Run the generator and stream output to the console.
  execSync("npx wagmi generate", { stdio: "inherit" });
} catch (err) {
  // eslint-disable-next-line no-console
  console.error(
    "wagmi generate failed: ",
    err && err.message ? err.message : err
  );
  process.exit(1);
}
