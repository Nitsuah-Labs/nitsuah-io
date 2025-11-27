const { chromium } = require("playwright");

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
    console.log("document length", html.length);
    const hasBasics = await page.$("#basics");
    console.log("#basics present?", !!hasBasics);
    if (hasBasics) {
      const outer = await hasBasics.evaluate((n) => n.outerHTML.slice(0, 1000));
      console.log("#basics outerHTML snippet:\n", outer);
    }
  } catch (e) {
    console.error("eval error", e);
  }
  await browser.close();
})();
