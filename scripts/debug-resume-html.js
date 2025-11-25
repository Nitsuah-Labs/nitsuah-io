const { chromium } = require("playwright");
const fs = require("fs");

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  const url = "http://localhost:3001/resume?testHelpers=1";
  console.log("navigating to", url);
  const resp = await page.goto(url, {
    waitUntil: "domcontentloaded",
    timeout: 60000,
  });
  console.log("status", resp && resp.status());
  try {
    const html = await page.content();
    fs.writeFileSync("resume-page.html", html.slice(0, 200000));
    console.log("wrote resume-page.html, length", html.length);
    const idx = html.indexOf('id="basics"');
    console.log('indexOf id="basics" =', idx);
    if (idx !== -1) {
      console.log("snippet:", html.slice(Math.max(0, idx - 200), idx + 200));
    }
    const hasBasics = await page.$("#basics");
    console.log("#basics present via selector?", !!hasBasics);
  } catch (e) {
    console.error("eval error", e);
  }
  await browser.close();
})();
