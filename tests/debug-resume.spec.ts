import { test } from "@playwright/test";

test("debug resume page", async ({ page }) => {
  await page.goto("http://localhost:3000/resume");
  await page.waitForTimeout(5000);

  const html = await page.content();
  console.log("=== PAGE HTML (first 8000 chars) ===");
  console.log(html.substring(0, 8000));

  const bodyClasses = await page.evaluate(() => document.body.className);
  console.log("\n=== Body classes:", bodyClasses);

  const hasBasics = await page.locator("#basics").count();
  console.log("=== Has #basics:", hasBasics);

  const hasResumeContainer = await page
    .locator("main.resume-container")
    .count();
  console.log("=== Has main.resume-container:", hasResumeContainer);

  const hasOverseer = await page.locator("text=Overseer").count();
  console.log("=== Has Overseer text:", hasOverseer);

  const title = await page.title();
  console.log("=== Page title:", title);
});
