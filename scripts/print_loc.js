const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..", "src");
const exts = new Set([".ts", ".tsx", ".js", ".jsx"]);
const ignorePatterns = ["node_modules", ".next", "coverage", ".git"];

function shouldIgnore(p) {
  return ignorePatterns.some((pat) => p.includes(path.sep + pat + path.sep));
}

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir, { withFileTypes: true });
  for (const dirent of list) {
    const full = path.join(dir, dirent.name);
    if (shouldIgnore(full)) continue;
    if (dirent.isDirectory()) {
      results = results.concat(walk(full));
    } else if (dirent.isFile()) {
      if (exts.has(path.extname(dirent.name))) {
        results.push(full);
      }
    }
  }
  return results;
}

function lineCount(file) {
  try {
    const data = fs.readFileSync(file, "utf8");
    // normalize line endings
    const lines = data.split(/\r?\n/).length;
    return lines;
  } catch (e) {
    return 0;
  }
}

const files = walk(root);
const stats = files.map((f) => ({
  path: path.relative(process.cwd(), f),
  lines: lineCount(f),
}));
stats.sort((a, b) => b.lines - a.lines);

console.log("Top 20 source files by LOC (under src/)");
console.log("Lines\tPath");
stats.slice(0, 20).forEach((s) => {
  console.log(`${s.lines}\t${s.path}`);
});

// also print top 10 nicely
console.log("\nTop 10:");
stats.slice(0, 10).forEach((s, i) => {
  console.log(`${i + 1}. ${s.path} — ${s.lines} lines`);
});
