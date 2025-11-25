const { chromium } = require("playwright");
const fs = require("fs");

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  const url = "http://localhost:3001/?testHelpers=1";
  console.log("navigating to", url);
  try {
    await page.goto(url, { waitUntil: "domcontentloaded", timeout: 30000 });
  } catch (err) {
    console.error("page.goto failed:", err);
    await browser.close();
    process.exit(1);
  }

  // report some DOM/frame info
  const iframes = page.frames().map((f) => ({ name: f.name(), url: f.url() }));
  console.log("frames:", JSON.stringify(iframes, null, 2));

  const iframeCount = await page
    .evaluate(() => document.querySelectorAll("iframe").length)
    .catch(() => -1);
  console.log("iframeCount:", iframeCount);

  const overlaySelectors = [
    "[data-nextjs-dev-overlay]",
    "nextjs-portal",
    "[data-nextjs-devtools]",
    "#__next_dev_overlay",
    ".next-dev-overlay",
    ".react-dev-overlay",
    "#next-overlay",
    ".overseer",
    '[data-testid="overseer"]',
  ];

  const overlaysFound = await page
    .evaluate((selectors) => {
      const found = {};
      for (const s of selectors) {
        try {
          found[s] = document.querySelectorAll(s).length;
        } catch (e) {
          found[s] = "error";
        }
      }
      return found;
    }, overlaySelectors)
    .catch(() => null);

  console.log("overlaysFound:", overlaysFound);

  // Inject axe using same fallbacks as tests
  try {
    try {
      await page.addScriptTag({ path: require.resolve("axe-core/axe.min.js") });
      console.log("addScriptTag(path) succeeded");
    } catch (e) {
      console.log("addScriptTag(path) failed, falling back to read+inject");
      const content = fs.readFileSync(
        require.resolve("axe-core/axe.min.js"),
        "utf8"
      );
      try {
        await page.addScriptTag({ content });
        console.log("addScriptTag(content) succeeded");
      } catch (e2) {
        console.log("addScriptTag(content) failed, falling back to evaluate");
        await page.evaluate(content);
        console.log("evaluate(content) succeeded");
      }
    }

    // wait for axe
    await page.waitForFunction(() => !!window.axe, { timeout: 5000 });
    console.log(
      "window.axe available",
      await page.evaluate(() => (window.axe && window.axe.version) || null)
    );
  } catch (err) {
    console.error("axe injection/wait failed:", err);
  }

  // Try running axe.run and capture full error if it throws
  const runResult = await page
    .evaluate(async () => {
      try {
        const node =
          document.querySelector('main, [role="main"]') ||
          document.documentElement;
        const results = await window.axe.run(node);
        return { results };
      } catch (e) {
        return { error: String(e), stack: e && e.stack ? e.stack : null };
      }
    })
    .catch((e) => ({ error: String(e) }));

  console.log("axe.run result:", JSON.stringify(runResult, null, 2));

  await browser.close();
  process.exit(0);
})();
