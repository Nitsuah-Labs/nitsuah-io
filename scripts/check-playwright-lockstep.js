#!/usr/bin/env node
// Fails the build if the Playwright Docker image (config/Dockerfile.test) drifts
// out of lockstep with the installed @playwright/test version (package-lock.json).
// A mismatch means `npm run test:e2e:docker` installs one Playwright version
// into a browser image built for another, which breaks Docker smoke runs.
const fs = require("fs");
const path = require("path");

const REPO_ROOT = path.resolve(__dirname, "..");
const DOCKERFILE_PATH = path.join(REPO_ROOT, "config", "Dockerfile.test");
const LOCKFILE_PATH = path.join(REPO_ROOT, "package-lock.json");

function extractDockerImageVersion(dockerfileContent) {
  const match = dockerfileContent.match(
    /FROM\s+mcr\.microsoft\.com\/playwright:v?([0-9]+\.[0-9]+\.[0-9]+)/,
  );
  return match ? match[1] : null;
}

function extractLockfileVersion(lockfileJson) {
  const pkg = lockfileJson.packages?.["node_modules/@playwright/test"];
  return pkg ? pkg.version : null;
}

function check({ dockerfileContent, lockfileJson }) {
  const dockerVersion = extractDockerImageVersion(dockerfileContent);
  const lockVersion = extractLockfileVersion(lockfileJson);

  if (!dockerVersion) {
    return {
      ok: false,
      message: `Could not find a mcr.microsoft.com/playwright image tag in ${path.relative(REPO_ROOT, DOCKERFILE_PATH)}.`,
    };
  }

  if (!lockVersion) {
    return {
      ok: false,
      message: `Could not find an installed @playwright/test version in ${path.relative(REPO_ROOT, LOCKFILE_PATH)}.`,
    };
  }

  if (dockerVersion !== lockVersion) {
    return {
      ok: false,
      message:
        `Playwright version drift detected:\n` +
        `  Dockerfile.test image: mcr.microsoft.com/playwright:v${dockerVersion}\n` +
        `  @playwright/test (package-lock.json): ${lockVersion}\n` +
        `Update config/Dockerfile.test's FROM tag and package.json's @playwright/test ` +
        `together (then run npm install to refresh package-lock.json) so Docker smoke runs stay in sync.`,
    };
  }

  return {
    ok: true,
    message: `Playwright versions are in lockstep: Dockerfile.test image and @playwright/test both at ${dockerVersion}.`,
  };
}

function main() {
  const dockerfileContent = fs.readFileSync(DOCKERFILE_PATH, "utf8");
  const lockfileJson = JSON.parse(fs.readFileSync(LOCKFILE_PATH, "utf8"));

  const result = check({ dockerfileContent, lockfileJson });

  if (result.ok) {
    console.log(`[check-playwright-lockstep] ${result.message}`);
    process.exit(0);
  } else {
    console.error(`[check-playwright-lockstep] ${result.message}`);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

module.exports = { extractDockerImageVersion, extractLockfileVersion, check };
