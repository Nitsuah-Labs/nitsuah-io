const { chromium } = require("playwright");

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  const url = process.env.BASE_URL || "http://localhost:3000";
  try {
    console.log("Navigating to", `${url}/resume`);
    await page.goto(`${url}/resume`, { waitUntil: "networkidle" });
    const h1Count = await page.$$eval("h1", (els) => els.length);
    const h1Text = await page.$$eval("h1", (els) =>
      els.map((e) => e.textContent).join(" | ")
    );
    const iconCount = await page.$$eval(
      'i[aria-hidden="true"]',
      (els) => els.length
    );
    const sectionCount = await page.$$eval("section", (els) => els.length);
    console.log("h1Count =", h1Count);
    console.log("h1Text =", h1Text);
    console.log("iconCount =", iconCount);
    console.log("sectionCount =", sectionCount);
    const contentSample = await page.content();
    console.log("PAGE CONTENT SNIPPET:\n", contentSample.slice(0, 2000));
  } catch (err) {
    console.error("Error fetching page:", err);
    process.exitCode = 1;
  } finally {
    await browser.close();
  }
})();
