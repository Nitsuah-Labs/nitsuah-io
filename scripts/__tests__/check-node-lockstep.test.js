const fs = require("fs");
const path = require("path");
const {
  BASELINE_MARKER,
  parseNvmrc,
  extractNodeImageVersions,
  extractNetlifyNodeVersion,
  extractWorkflowNodeVersions,
  check,
  readFiles,
} = require("../check-node-lockstep");

function alignedFiles(version) {
  return {
    "config/Dockerfile.unit": `FROM node:${version}-slim\nWORKDIR /app\n`,
    "config/Dockerfile.test":
      `FROM node:${version}-slim AS node\n` +
      `FROM mcr.microsoft.com/playwright:v1.63.0-noble\n`,
    "config/docker-compose.yml": `services:\n  app:\n    image: node:${version}-slim\n`,
    ".husky/pre-push": `docker run --rm node:${version}-slim sh -c "npm test"\n`,
    "netlify.toml": `[build.environment]\n  NODE_VERSION = "${version}"\n`,
    ".github/workflows/ci.yml":
      `      - uses: actions/setup-node@v4\n` +
      `        with:\n          node-version-file: .nvmrc\n`,
  };
}

describe("parseNvmrc", () => {
  it("accepts an exact version with or without a leading v", () => {
    expect(parseNvmrc("26.10.0\n")).toBe("26.10.0");
    expect(parseNvmrc("v26.10.0")).toBe("26.10.0");
  });

  it("rejects ranges, majors and aliases", () => {
    expect(parseNvmrc("26")).toBeNull();
    expect(parseNvmrc("lts/*")).toBeNull();
    expect(parseNvmrc("26.x")).toBeNull();
  });
});

describe("extractNodeImageVersions", () => {
  it("reads every node image tag and drops the variant suffix", () => {
    expect(
      extractNodeImageVersions(
        "FROM node:26.10.0-slim AS node\nimage: node:22-bookworm\n",
      ),
    ).toEqual(["26.10.0", "22"]);
  });

  it("ignores non-node images", () => {
    expect(
      extractNodeImageVersions("FROM mcr.microsoft.com/playwright:v1.63.0\n"),
    ).toEqual([]);
  });
});

describe("extractNetlifyNodeVersion", () => {
  it("reads NODE_VERSION", () => {
    expect(extractNetlifyNodeVersion('  NODE_VERSION = "26.10.0"\n')).toBe(
      "26.10.0",
    );
  });

  it("returns null when NODE_VERSION is unset", () => {
    expect(extractNetlifyNodeVersion("[build]\n")).toBeNull();
  });
});

describe("extractWorkflowNodeVersions", () => {
  it("collects scalar and inline-list literals", () => {
    expect(
      extractWorkflowNodeVersions(
        "  node-version: 22.x\n  node-version: ['22.x', \"24.x\"]\n",
      ),
    ).toEqual(["22.x", "22.x", "24.x"]);
  });

  it("skips expressions, node-version-file and baseline-marked lines", () => {
    expect(
      extractWorkflowNodeVersions(
        "  node-version: ${{ matrix.node-version }}\n" +
          "  node-version-file: .nvmrc\n" +
          `  - node-version: "22.x" # ${BASELINE_MARKER}\n` +
          '  node-version: ""\n',
      ),
    ).toEqual([]);
  });
});

describe("check", () => {
  it("passes when every pin matches .nvmrc", () => {
    const result = check({
      nvmrc: "26.10.0\n",
      files: alignedFiles("26.10.0"),
    });
    expect(result).toEqual({ ok: true, expected: "26.10.0", problems: [] });
  });

  it("flags a one-sided Dockerfile bump", () => {
    const files = alignedFiles("22.13.0");
    files["config/Dockerfile.unit"] = "FROM node:26.10.0-slim\n";
    const result = check({ nvmrc: "22.13.0", files });
    expect(result.ok).toBe(false);
    expect(result.problems).toEqual([
      "config/Dockerfile.unit: found Node 26.10.0, expected 22.13.0",
    ]);
  });

  it("flags a floating major tag as drift", () => {
    const files = alignedFiles("26.10.0");
    files["config/docker-compose.yml"] = "image: node:26-slim\n";
    expect(check({ nvmrc: "26.10.0", files }).problems).toEqual([
      "config/docker-compose.yml: found Node 26, expected 26.10.0",
    ]);
  });

  it("flags the Playwright image when it lacks the Node overlay stage", () => {
    const files = alignedFiles("26.10.0");
    files["config/Dockerfile.test"] =
      "FROM mcr.microsoft.com/playwright:v1.63.0-noble\n";
    expect(check({ nvmrc: "26.10.0", files }).problems).toEqual([
      "config/Dockerfile.test: no node:<version> image found",
    ]);
  });

  it("flags Netlify and workflow drift", () => {
    const files = alignedFiles("26.10.0");
    files["netlify.toml"] = '  NODE_VERSION = "22"\n';
    files[".github/workflows/nightly.yml"] = "  node-version: 22.x\n";
    expect(check({ nvmrc: "26.10.0", files }).problems).toEqual([
      "netlify.toml: found Node 22, expected 26.10.0",
      ".github/workflows/nightly.yml: found Node 22.x, expected 26.10.0",
    ]);
  });

  it("flags an unset Netlify NODE_VERSION", () => {
    const files = alignedFiles("26.10.0");
    files["netlify.toml"] = "[build]\n";
    expect(check({ nvmrc: "26.10.0", files }).problems).toEqual([
      "netlify.toml: found Node (unset), expected 26.10.0",
    ]);
  });

  it("fails on an unusable .nvmrc", () => {
    const result = check({ nvmrc: "lts/*", files: alignedFiles("26.10.0") });
    expect(result.ok).toBe(false);
    expect(result.problems[0]).toMatch(/exact x\.y\.z/);
  });
});

describe("repository", () => {
  // Guards the real repo, so a drifted pin also fails `npm test` (and the
  // husky hooks that run it), not just the dedicated CI step.
  it("keeps every Node pin in lockstep with .nvmrc", () => {
    const nvmrc = fs.readFileSync(
      path.resolve(__dirname, "..", "..", ".nvmrc"),
      "utf8",
    );
    expect(check({ nvmrc, files: readFiles() }).problems).toEqual([]);
  });
});
