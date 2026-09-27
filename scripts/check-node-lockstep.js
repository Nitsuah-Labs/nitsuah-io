#!/usr/bin/env node
// Fails the build if any place that pins a Node version drifts from .nvmrc.
// .nvmrc is the single source of truth; every other pin must match it exactly
// so dev, hooks, unit/E2E Docker images, CI and Netlify all run the same Node.
// A one-sided bump (e.g. a Dependabot PR that only touches config/Dockerfile.unit)
// fails here instead of silently splitting the stack across Node majors.
const fs = require("fs");
const path = require("path");

const REPO_ROOT = path.resolve(__dirname, "..");
const NVMRC_PATH = ".nvmrc";

// Files whose `node:<version>-slim` image tags must all equal .nvmrc.
const DOCKER_IMAGE_FILES = [
  "config/Dockerfile.unit",
  "config/Dockerfile.test",
  "config/docker-compose.yml",
  ".husky/pre-commit",
  ".husky/pre-push",
];
const NETLIFY_PATH = "netlify.toml";
const WORKFLOW_DIR = ".github/workflows";
// Trailing marker that allows a workflow `node-version:` literal to differ from
// .nvmrc, e.g. a temporary comparison leg while soaking a new Node major.
const BASELINE_MARKER = "node-lockstep: baseline";

function parseNvmrc(content) {
  const version = content.trim().replace(/^v/, "");
  return /^\d+\.\d+\.\d+$/.test(version) ? version : null;
}

function extractNodeImageVersions(content) {
  // Variant suffixes (-slim, -bookworm, ...) are dropped; the version itself
  // must be an exact pin, so `node:26-slim` counts as drift from 26.10.0.
  return [...content.matchAll(/\bnode:([0-9][^\s"'@]*)/g)].map(
    (m) => m[1].split("-")[0],
  );
}

function extractNetlifyNodeVersion(content) {
  const match = content.match(/^\s*NODE_VERSION\s*=\s*"([^"]+)"/m);
  return match ? match[1] : null;
}

// Returns every literal `node-version:` value in a workflow, skipping
// expressions (`${{ matrix.* }}`) and lines tagged with BASELINE_MARKER.
// `node-version-file: .nvmrc` is the preferred form and isn't matched here.
function extractWorkflowNodeVersions(content) {
  const versions = [];
  for (const line of content.split("\n")) {
    const match = line.match(/^\s*-?\s*node-version:\s*(.+?)\s*$/);
    if (!match) continue;
    const [value, ...comment] = match[1].split("#");
    if (comment.join("#").includes(BASELINE_MARKER)) continue;
    const trimmed = value.trim().replace(/^["']|["']$/g, "");
    if (!trimmed || trimmed.startsWith("${{")) continue;
    if (trimmed.startsWith("[")) {
      versions.push(
        ...trimmed
          .slice(1, -1)
          .split(",")
          .map((v) => v.trim().replace(/^["']|["']$/g, ""))
          .filter(Boolean),
      );
    } else {
      versions.push(trimmed);
    }
  }
  return versions;
}

function check({ nvmrc, files }) {
  const expected = parseNvmrc(nvmrc ?? "");
  if (!expected) {
    return {
      ok: false,
      problems: [
        `${NVMRC_PATH} must contain an exact x.y.z Node version, got "${(nvmrc ?? "").trim()}".`,
      ],
    };
  }

  const problems = [];
  const mismatch = (file, found) =>
    problems.push(`${file}: found Node ${found}, expected ${expected}`);

  for (const file of DOCKER_IMAGE_FILES) {
    const content = files[file];
    if (content === undefined) continue;
    const versions = extractNodeImageVersions(content);
    if (versions.length === 0) {
      problems.push(`${file}: no node:<version> image found`);
    }
    versions.filter((v) => v !== expected).forEach((v) => mismatch(file, v));
  }

  const netlify = files[NETLIFY_PATH];
  if (netlify !== undefined) {
    const version = extractNetlifyNodeVersion(netlify);
    if (version !== expected) mismatch(NETLIFY_PATH, version ?? "(unset)");
  }

  for (const [file, content] of Object.entries(files)) {
    if (!file.startsWith(WORKFLOW_DIR)) continue;
    extractWorkflowNodeVersions(content)
      .filter((v) => v !== expected)
      .forEach((v) => mismatch(file, v));
  }

  return { ok: problems.length === 0, expected, problems };
}

// Missing files are skipped rather than fatal: Docker build contexts exclude
// .github (see .dockerignore), and the dedicated CI step still covers it.
function readFiles() {
  const files = {};
  const read = (rel) => {
    const abs = path.join(REPO_ROOT, rel);
    if (fs.existsSync(abs)) files[rel] = fs.readFileSync(abs, "utf8");
  };
  DOCKER_IMAGE_FILES.forEach(read);
  read(NETLIFY_PATH);
  const workflowDir = path.join(REPO_ROOT, WORKFLOW_DIR);
  if (fs.existsSync(workflowDir)) {
    fs.readdirSync(workflowDir)
      .filter((f) => /\.ya?ml$/.test(f))
      .forEach((f) => read(`${WORKFLOW_DIR}/${f}`));
  }
  return files;
}

function main() {
  const nvmrc = fs.readFileSync(path.join(REPO_ROOT, NVMRC_PATH), "utf8");
  const result = check({ nvmrc, files: readFiles() });

  if (result.ok) {
    console.log(
      `[check-node-lockstep] All Node pins match .nvmrc (${result.expected}).`,
    );
    process.exit(0);
  }
  console.error(
    `[check-node-lockstep] Node version drift detected:\n` +
      result.problems.map((p) => `  ${p}`).join("\n") +
      `\nBump .nvmrc and every pin above together so the stack stays on one Node version.`,
  );
  process.exit(1);
}

if (require.main === module) {
  main();
}

module.exports = {
  BASELINE_MARKER,
  parseNvmrc,
  extractNodeImageVersions,
  extractNetlifyNodeVersion,
  extractWorkflowNodeVersions,
  check,
  readFiles,
};
