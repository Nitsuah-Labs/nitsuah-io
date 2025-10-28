#!/usr/bin/env node
// Load local environment when present to support local dev (.env.local).
// Try a set of candidate locations so WSL runs can pick up the Windows
// workspace .env.local when developers work on Windows and run inside WSL.
try {
  // eslint-disable-next-line global-require, import/no-extraneous-dependencies
  const dotenv = require("dotenv");
  const fs = require("fs");
  const path = require("path");

  const candidates = [
    path.resolve(process.cwd(), ".env.local"),
    path.resolve(__dirname, "..", ".env.local"),
    // Common Windows mount for WSL users (adjusted for this repo's user path)
    "/mnt/c/Users/ajhar/code/nitsuah-io/.env.local",
  ];

  const found = candidates.find((p) => fs.existsSync(p));
  if (found) {
    // eslint-disable-next-line no-console
    console.log(`Loading environment from ${found}`);
    dotenv.config({ path: found });
  }
} catch (err) {
  // noop if dotenv/fs/path aren't available in the environment.
}

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
    // If this PR is from a fork we don't have secrets available — skip.
    const eventPath = process.env.GITHUB_EVENT_PATH;
    try {
      if (eventPath) {
        // eslint-disable-next-line node/no-sync
        const payload = JSON.parse(
          require("fs").readFileSync(eventPath, "utf8")
        );
        const headRepo = payload?.pull_request?.head?.repo?.full_name;
        const baseRepo = payload?.pull_request?.base?.repo?.full_name;
        if (headRepo && baseRepo && headRepo !== baseRepo) {
          // eslint-disable-next-line no-console
          console.warn(
            'Skipping "wagmi generate": pull_request comes from a fork and secrets are not available.'
          );
          process.exit(0);
        }
      }
    } catch (e) {
      // If we can't read the event payload, fall back to skipping to be safe.
      // eslint-disable-next-line no-console
      console.warn(
        "Unable to inspect GITHUB_EVENT_PATH, skipping wagmi generate as a precaution."
      );
      process.exit(0);
    }
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
  // Use the package executable name explicitly (works better in some npx setups)
  execSync("npx --yes @wagmi/cli generate -c config/wagmi.config.ts", {
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
