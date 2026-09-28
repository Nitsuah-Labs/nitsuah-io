/**
 * @jest-environment node
 */
// Runtime smoke tests for the places a Node major upgrade actually changes
// behaviour. Each check runs in a child process on the same `node` binary
// that runs Jest (process.execPath), outside Jest's module sandbox, so it
// sees the real runtime globals and native addon loading.
//
// Covered:
// - Web Storage: Node 25+ defines a global `localStorage` accessor that
//   returns undefined (with an ExperimentalWarning) instead of throwing,
//   which broke zustand <5.0.14's server-side fallback.
// - Native/platform packages whose install scripts npm 11 skips unless
//   allow-listed (`npm warn install-scripts ...`): they must still load
//   their prebuilt binaries rather than silently falling back or failing.
const { spawnSync } = require("child_process");
const fs = require("fs");
const os = require("os");
const path = require("path");
const { pathToFileURL } = require("url");

const REPO_ROOT = path.resolve(__dirname, "..", "..");
const LOCKFILE = require(path.join(REPO_ROOT, "package-lock.json"));

function runModule(source, env = {}) {
  const result = spawnSync(
    process.execPath,
    ["--input-type=module", "--eval", source],
    {
      cwd: REPO_ROOT,
      encoding: "utf8",
      timeout: 60_000,
      env: { ...process.env, ...env },
    },
  );
  return {
    status: result.status,
    stdout: result.stdout.trim(),
    stderr: result.stderr,
    json: () => JSON.parse(result.stdout.trim().split("\n").pop()),
  };
}

function expectClean(result) {
  expect({ status: result.status, stderr: result.stderr }).toEqual({
    status: 0,
    stderr: expect.not.stringMatching(/Error|localStorage is not available/),
  });
}

// Every installed copy of a package, taken from the lockfile so a new
// transitive copy is covered automatically.
function installedCopies(name) {
  return Object.keys(LOCKFILE.packages)
    .filter(
      (key) =>
        key === `node_modules/${name}` || key.endsWith(`/node_modules/${name}`),
    )
    .map((key) => ({
      key,
      dir: path.join(REPO_ROOT, key),
      version: LOCKFILE.packages[key].version,
    }))
    .filter(({ dir }) => fs.existsSync(dir));
}

describe("server-side Web Storage", () => {
  it("exposes no usable localStorage without a browser", () => {
    const result = runModule(
      "console.log(JSON.stringify({ type: typeof globalThis.localStorage, usable: !!globalThis.localStorage }))",
    );
    expect(result.status).toBe(0);
    // Node 22: absent. Node 25+: present as an accessor returning undefined.
    // Either way, code must guard on the value, never on `"localStorage" in globalThis`.
    expect(result.json()).toEqual({ type: "undefined", usable: false });
  });
});

describe("zustand persist on the server", () => {
  const copies = installedCopies("zustand");

  it("is installed", () => {
    expect(copies.length).toBeGreaterThan(0);
  });

  it.each(copies.map((c) => [`${c.key}@${c.version}`, c]))(
    "%s falls back instead of throwing when state changes",
    (_label, { dir }) => {
      const vanilla = pathToFileURL(path.join(dir, "esm", "vanilla.mjs"));
      const middleware = pathToFileURL(path.join(dir, "esm", "middleware.mjs"));
      const result = runModule(`
        import { createStore } from ${JSON.stringify(vanilla.href)};
        import { persist } from ${JSON.stringify(middleware.href)};
        const store = createStore(
          persist((set) => ({ n: 0, inc: () => set((s) => ({ n: s.n + 1 })) }), { name: "probe" }),
        );
        store.getState().inc();
        console.log(JSON.stringify({ n: store.getState().n }));
      `);
      expect(result.status).toBe(0);
      expect(result.json()).toEqual({ n: 1 });
      expect(result.stderr).not.toMatch(/localStorage is not available/);
    },
  );
});

describe("wagmi config during SSR", () => {
  it("creates, updates and reads state with SSR-safe storage", () => {
    const result = runModule(`
      import { createConfig, http } from "@wagmi/core";
      import { mainnet, polygonAmoy } from "@wagmi/core/chains";
      const config = createConfig({
        chains: [mainnet, polygonAmoy],
        transports: { [mainnet.id]: http(), [polygonAmoy.id]: http() },
      });
      config.setState((state) => ({ ...state, chainId: polygonAmoy.id }));
      const stored = await config.storage?.getItem("recentConnectorId");
      console.log(JSON.stringify({ chainId: config.state.chainId, stored: stored ?? null }));
    `);
    expectClean(result);
    expect(result.json()).toEqual({ chainId: 80002, stored: null });
  });
});

describe("native dependencies npm 11 no longer runs install scripts for", () => {
  it("sharp encodes the AVIF and WebP formats next/image serves", () => {
    const result = runModule(`
      import sharp from "sharp";
      const source = sharp({ create: { width: 8, height: 8, channels: 3, background: "#0af" } });
      const formats = {};
      for (const format of ["avif", "webp"]) {
        const buffer = await source.clone().toFormat(format).toBuffer();
        formats[format] = (await sharp(buffer).metadata()).format;
      }
      console.log(JSON.stringify(formats));
    `);
    expectClean(result);
    expect(result.json()).toEqual({ avif: "heif", webp: "webp" });
  });

  it.each(
    installedCopies("bufferutil")
      .concat(installedCopies("utf-8-validate"))
      .map((c) => [`${c.key}@${c.version}`, c]),
  )("%s loads its native prebuild, not the JS fallback", (_label, { dir }) => {
    const loaded = require(dir);
    const fallback = require(path.join(dir, "fallback.js"));
    expect(loaded).not.toBe(fallback);
  });

  it.each(installedCopies("esbuild").map((c) => [`${c.key}@${c.version}`, c]))(
    "%s transforms TypeScript",
    (_label, { dir }) => {
      const result = runModule(`
        import { createRequire } from "module";
        const esbuild = createRequire(import.meta.url)(${JSON.stringify(dir)});
        const { code } = await esbuild.transform("const n: number = 1", { loader: "ts" });
        console.log(JSON.stringify({ code: code.trim() }));
      `);
      expectClean(result);
      expect(result.json()).toEqual({ code: "const n = 1;" });
    },
  );

  it("@parcel/watcher (Jest's file watcher) loads its native binding", async () => {
    const watcher = require("@parcel/watcher");
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), "watcher-"));
    const snapshot = path.join(dir, "snapshot");
    try {
      await watcher.writeSnapshot(dir, snapshot);
      fs.writeFileSync(path.join(dir, "changed.txt"), "x");
      const events = await watcher.getEventsSince(dir, snapshot);
      expect(events.map((e) => path.basename(e.path))).toContain("changed.txt");
    } finally {
      fs.rmSync(dir, { recursive: true, force: true });
    }
  });

  it("unrs-resolver (Jest's resolver) resolves packages", () => {
    const { ResolverFactory } = require("unrs-resolver");
    const resolved = new ResolverFactory({}).sync(REPO_ROOT, "react");
    expect(resolved.error).toBeUndefined();
    expect(resolved.path).toContain(path.join("node_modules", "react"));
  });
});

describe("wagmi codegen config (`npm run wagmi`)", () => {
  // @wagmi/cli loads config/wagmi.config.ts through bundle-require + esbuild
  // 0.25, a loader path sensitive to Node's ESM/CJS interop changes.
  const loadConfig = `
    import { bundleRequire } from "bundle-require";
    const { mod } = await bundleRequire({ filepath: "config/wagmi.config.ts" });
    let config = mod.default ?? mod;
    if (typeof config === "function") config = await config();
    console.log(JSON.stringify({ out: config.out, plugins: config.plugins.map((p) => p.name) }));
  `;

  it("loads with the etherscan plugin when a key is set", () => {
    const result = runModule(loadConfig, { ETHERSCAN_API_KEY: "test-key" });
    expectClean(result);
    expect(result.json()).toEqual({
      out: "src/generated.ts",
      plugins: ["Etherscan", "React"],
    });
  });

  it("skips etherscan without a key instead of failing", () => {
    const result = runModule(loadConfig, { ETHERSCAN_API_KEY: "" });
    expect(result.status).toBe(0);
    expect(result.json()).toEqual({
      out: "src/generated.ts",
      plugins: ["React"],
    });
  });
});
