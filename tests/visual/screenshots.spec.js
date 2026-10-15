// Screenshot suite: one PNG per page of the site, written to
// docs/screenshots/<id>.png (desktop 1440x900, full page) and
// docs/screenshots/<id>-mobile.png (390x844) by `toHaveScreenshot`.
// Run by .github/workflows/visual-docs.yml in the Playwright image that matches
// @playwright/test; regenerate locally with the same image (never on the host:
// font rendering differs).
const { test, expect } = require("@playwright/test");
const { pages } = require("./pages");
const { prepare, open, expandForCapture } = require("./fixture");

test.beforeEach(async ({ page }) => {
  await prepare(page);
});

for (const p of pages) {
  test(`page ${p.path}`, async ({ page }, testInfo) => {
    const mobile = testInfo.project.name === "screenshots-mobile";
    test.skip(mobile && !p.mobile, "desktop-only page");
    await open(page, p.path);
    await expandForCapture(page);
    await expect(page).toHaveScreenshot(
      `${p.id}${mobile ? "-mobile" : ""}.png`,
      {
        fullPage: true,
      },
    );
  });
}
