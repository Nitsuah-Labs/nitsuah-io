/**
 * Smoke tests — fast critical checks that every page renders
 * and key content is present. No screenshots, no axe, no wagmi.
 * Target: <3 min in CI.
 */
import { expect, test } from "@playwright/test";
import { gotoAndWaitForHydration } from "./utils/wait-for-hydration";

test("homepage renders with header, footer, and hero", async ({ page }) => {
  await gotoAndWaitForHydration(page, "/");
  await expect(page.locator("header")).toBeVisible();
  await expect(page.locator("footer")).toBeVisible();
  await expect(page.locator("h1")).toBeVisible();
});

test("homepage navigation links are present", async ({ page }) => {
  await gotoAndWaitForHydration(page, "/");
  await expect(
    page.getByRole("link", { name: /about/i }).first()
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: /resume/i }).first()
  ).toBeVisible();
  await expect(
    page.getByRole("button", { name: /portfolio/i }).first()
  ).toBeVisible();
});

test("about page renders", async ({ page }) => {
  await gotoAndWaitForHydration(page, "/about");
  await expect(page.locator("main")).toBeVisible();
  await expect(page.locator("header")).toBeVisible();
});

test("resume page renders with all sections", async ({ page }) => {
  await gotoAndWaitForHydration(page, "/resume");
  await page.locator("#basics").waitFor({ state: "visible", timeout: 15000 });
  await expect(page.locator("#work")).toBeVisible();
  await expect(page.locator("#skills")).toBeVisible();
  await expect(page.locator("#education")).toBeVisible();
  await expect(page.locator("#languages")).toBeVisible();
});

test("resume page has PDF export button with aria-label", async ({ page }) => {
  await gotoAndWaitForHydration(page, "/resume");
  await page.locator("#basics").waitFor({ state: "visible", timeout: 15000 });
  const pdfButton = page
    .getByRole("button", { name: /Export resume as PDF/i })
    .first();
  await expect(pdfButton).toBeVisible();
  await expect(pdfButton).toHaveAttribute("aria-label");
});

test("resume work experience section is expandable", async ({ page }) => {
  await gotoAndWaitForHydration(page, "/resume");
  await page.waitForSelector("#work", { timeout: 10000 });
  const firstWorkHeader = page.locator(".work-header").first();
  await expect(firstWorkHeader).toBeVisible({ timeout: 10000 });
  await firstWorkHeader.click();
  await expect(page.locator(".work-details").first()).toBeVisible();
});

test("projects page shows featured button and project cards", async ({
  page,
}) => {
  await gotoAndWaitForHydration(page, "/projects");
  await expect(page.getByRole("button", { name: /⭐/ })).toBeVisible();
  const projectCards = page
    .locator("[class*='card']")
    .filter({ has: page.locator("h3") });
  await expect(projectCards.first()).toBeVisible();
});

test("labs hub renders", async ({ page }) => {
  await gotoAndWaitForHydration(page, "/labs");
  await expect(page.locator("main")).toBeVisible();
  await expect(page.locator("header")).toBeVisible();
});

test("server returns HTTP 200 for key pages", async ({ request }) => {
  const paths = ["/", "/about", "/resume", "/projects", "/labs"];
  for (const path of paths) {
    const response = await request.get(path);
    expect(response.status(), `${path} should return 200`).toBe(200);
  }
});
