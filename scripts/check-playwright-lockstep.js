#!/usr/bin/env node
// Fails when config/Dockerfile.test's Playwright image tag doesn't match the
// @playwright/test version actually installed from package-lock.json. A
// mismatch here means `npm run precheck:docker` runs the npm-installed
// Playwright client against browsers baked into a differently-versioned
// image, which breaks in ways that are easy to miss until Docker smoke
// tests fail.
"use strict";

const fs = require("node:fs");
const path = require("node:path");

const REPO_ROOT = path.resolve(__dirname, "..");
const DOCKERFILE_PATH = path.join(REPO_ROOT, "config", "Dockerfile.test");
const LOCKFILE_PATH = path.join(REPO_ROOT, "package-lock.json");

function getDockerImageVersion(dockerfileContents) {
  const match = dockerfileContents.match(
    /^FROM\s+mcr\.microsoft\.com\/playwright:v(\d+\.\d+\.\d+)(?:-\S+)?/m,
  );
  if (!match) {
    throw new Error(
      `Could not find a "mcr.microsoft.com/playwright:vX.Y.Z" image in ${DOCKERFILE_PATH}`,
    );
  }
  return match[1];
}

function getInstalledPlaywrightVersion(lockfileContents) {
  const lockfile = JSON.parse(lockfileContents);
  const pkg =
    lockfile.packages && lockfile.packages["node_modules/@playwright/test"];
  if (!pkg || !pkg.version) {
    throw new Error(
      `Could not find "@playwright/test" under packages["node_modules/@playwright/test"] in ${LOCKFILE_PATH}`,
    );
  }
  return pkg.version;
}

function checkLockstep(dockerfileContents, lockfileContents) {
  const dockerVersion = getDockerImageVersion(dockerfileContents);
  const npmVersion = getInstalledPlaywrightVersion(lockfileContents);
  return { dockerVersion, npmVersion, inSync: dockerVersion === npmVersion };
}

function main() {
  const dockerfileContents = fs.readFileSync(DOCKERFILE_PATH, "utf8");
  const lockfileContents = fs.readFileSync(LOCKFILE_PATH, "utf8");
  const { dockerVersion, npmVersion, inSync } = checkLockstep(
    dockerfileContents,
    lockfileContents,
  );

  if (!inSync) {
    console.error(
      [
        "Playwright version mismatch:",
        `  Dockerfile.test image: v${dockerVersion} (config/Dockerfile.test)`,
        `  @playwright/test:      v${npmVersion} (package-lock.json)`,
        "",
        'Update config/Dockerfile.test\'s "mcr.microsoft.com/playwright" image tag to',
        'match "@playwright/test" whenever you bump one of them, or Docker smoke runs',
        "(npm run precheck:docker) will use mismatched browsers and fail.",
      ].join("\n"),
    );
    process.exitCode = 1;
    return;
  }

  console.log(
    `Playwright versions are in lockstep: Dockerfile.test image and @playwright/test are both v${dockerVersion}.`,
  );
}

module.exports = {
  getDockerImageVersion,
  getInstalledPlaywrightVersion,
  checkLockstep,
};

if (require.main === module) {
  main();
}
