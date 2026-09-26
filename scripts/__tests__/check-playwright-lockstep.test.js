const {
  getDockerImageVersion,
  getInstalledPlaywrightVersion,
  checkLockstep,
} = require("../check-playwright-lockstep");

describe("check-playwright-lockstep", () => {
  describe("getDockerImageVersion", () => {
    it("extracts the version from a FROM line", () => {
      const dockerfile = "FROM mcr.microsoft.com/playwright:v1.63.0-noble\n";
      expect(getDockerImageVersion(dockerfile)).toBe("1.63.0");
    });

    it("throws when no matching FROM line is present", () => {
      expect(() => getDockerImageVersion("FROM node:22-slim\n")).toThrow(
        /Could not find a "mcr\.microsoft\.com\/playwright/,
      );
    });
  });

  describe("getInstalledPlaywrightVersion", () => {
    it("reads the resolved @playwright/test version from the lockfile", () => {
      const lockfile = JSON.stringify({
        packages: {
          "node_modules/@playwright/test": { version: "1.63.0" },
        },
      });
      expect(getInstalledPlaywrightVersion(lockfile)).toBe("1.63.0");
    });

    it("throws when @playwright/test is missing from the lockfile", () => {
      const lockfile = JSON.stringify({ packages: {} });
      expect(() => getInstalledPlaywrightVersion(lockfile)).toThrow(
        /Could not find "@playwright\/test"/,
      );
    });
  });

  describe("checkLockstep", () => {
    it("reports inSync=true when versions match", () => {
      const dockerfile = "FROM mcr.microsoft.com/playwright:v1.63.0-noble\n";
      const lockfile = JSON.stringify({
        packages: { "node_modules/@playwright/test": { version: "1.63.0" } },
      });
      expect(checkLockstep(dockerfile, lockfile)).toEqual({
        dockerVersion: "1.63.0",
        npmVersion: "1.63.0",
        inSync: true,
      });
    });

    it("reports inSync=false when versions differ", () => {
      const dockerfile = "FROM mcr.microsoft.com/playwright:v1.62.1-noble\n";
      const lockfile = JSON.stringify({
        packages: { "node_modules/@playwright/test": { version: "1.63.0" } },
      });
      expect(checkLockstep(dockerfile, lockfile).inSync).toBe(false);
    });
  });
});
