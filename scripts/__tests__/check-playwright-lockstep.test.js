const {
  extractDockerImageVersion,
  extractLockfileVersion,
  check,
} = require("../check-playwright-lockstep");

function dockerfileWith(version) {
  return `FROM mcr.microsoft.com/playwright:v${version}-noble\nWORKDIR /app\n`;
}

function lockfileWith(version) {
  return {
    packages: {
      "node_modules/@playwright/test": { version },
    },
  };
}

describe("extractDockerImageVersion", () => {
  it("reads the version out of the FROM line", () => {
    expect(extractDockerImageVersion(dockerfileWith("1.63.0"))).toBe("1.63.0");
  });

  it("returns null when there is no playwright image", () => {
    expect(extractDockerImageVersion("FROM node:22-slim\n")).toBeNull();
  });
});

describe("extractLockfileVersion", () => {
  it("reads the installed @playwright/test version", () => {
    expect(extractLockfileVersion(lockfileWith("1.63.0"))).toBe("1.63.0");
  });

  it("returns null when @playwright/test is not installed", () => {
    expect(extractLockfileVersion({ packages: {} })).toBeNull();
  });
});

describe("check", () => {
  it("passes when the docker image and lockfile versions match", () => {
    const result = check({
      dockerfileContent: dockerfileWith("1.63.0"),
      lockfileJson: lockfileWith("1.63.0"),
    });
    expect(result.ok).toBe(true);
  });

  it("fails when the docker image and lockfile versions differ", () => {
    const result = check({
      dockerfileContent: dockerfileWith("1.62.1"),
      lockfileJson: lockfileWith("1.63.0"),
    });
    expect(result.ok).toBe(false);
    expect(result.message).toMatch(/version drift/i);
  });

  it("fails when the Dockerfile has no playwright image", () => {
    const result = check({
      dockerfileContent: "FROM node:22-slim\n",
      lockfileJson: lockfileWith("1.63.0"),
    });
    expect(result.ok).toBe(false);
    expect(result.message).toMatch(/Could not find/i);
  });

  it("fails when the lockfile has no @playwright/test entry", () => {
    const result = check({
      dockerfileContent: dockerfileWith("1.63.0"),
      lockfileJson: { packages: {} },
    });
    expect(result.ok).toBe(false);
    expect(result.message).toMatch(/Could not find/i);
  });
});
