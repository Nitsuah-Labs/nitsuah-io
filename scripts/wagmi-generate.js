#!/usr/bin/env node
const { execSync } = require("child_process");

const etherscanKey = process.env.ETHERSCAN_API_KEY;
const alchemyKey = process.env.NEXT_PUBLIC_ALCHEMY_API_KEY;

const isNetlify = process.env.NETLIFY === "true" || !!process.env.NETLIFY;
const netlifyContext =
  process.env.CONTEXT || process.env.NETLIFY_BUILD_CONTEXT || "";
const isNetlifyPreview = isNetlify && netlifyContext === "deploy-preview";

const isGithubActions =
  process.env.GITHUB_ACTIONS === "true" || !!process.env.GITHUB_ACTIONS;
const ghaEvent = process.env.GITHUB_EVENT_NAME || "";

if (!etherscanKey && !alchemyKey) {
  // Skip safely on preview/fork builds where secrets are not available.
  if (isNetlifyPreview) {
    // eslint-disable-next-line no-console
    console.warn(
      'Skipping "wagmi generate": running on Netlify deploy-preview and ETHERSCAN_API_KEY / NEXT_PUBLIC_ALCHEMY_API_KEY are not set.'
    );
    process.exit(0);
  }

  if (isGithubActions && ghaEvent === "pull_request") {
    // eslint-disable-next-line no-console
    console.warn(
      'Skipping "wagmi generate": running on GitHub Actions pull_request and ETHERSCAN_API_KEY / NEXT_PUBLIC_ALCHEMY_API_KEY are not set.'
    );
    process.exit(0);
  }

  // For other builds (e.g. main/protected branches) require an API key.
  // eslint-disable-next-line no-console
  console.error(
    "ETHERSCAN_API_KEY and NEXT_PUBLIC_ALCHEMY_API_KEY are not set. Codegen requires one of these to resolve contracts."
  );
  process.exit(1);
}

try {
  // Run the generator and stream output to the console. Explicitly pass
  // the config so CI behaves the same as local development.
  execSync("npx wagmi generate -c config/wagmi.config.ts", {
    stdio: "inherit",
  });
} catch (err) {
  // eslint-disable-next-line no-console
  console.error(
    "wagmi generate failed: ",
    err && err.message ? err.message : err
  );
  process.exit(1);
}
