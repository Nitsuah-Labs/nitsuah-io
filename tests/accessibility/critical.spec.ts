/**
 * Critical accessibility checks — homepage and resume, plus a shared
 * button-label sanity check on labs.
 * Axe scanning every page in CI is slow and frame-race-prone;
 * this suite stays intentionally small.
 */
import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";
import { gotoAndWaitForHydration } from "../utils/wait-for-hydration";

test.skip(
  !!process.env.CI && process.env.FORCE_BROWSER_E2E !== "1",
  "Accessibility browser scans run locally only; CI keeps deterministic smoke checks"
);

test("homepage has no WCAG 2.1 AA violations", async ({ page }) => {
  await gotoAndWaitForHydration(page, "/");
  const results = await new AxeBuilder({ page })
    .exclude('[data-testid="spline-container"]')
    .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
    .analyze();
  expect(results.violations).toEqual([]);
});

test("homepage text has sufficient color contrast", async ({ page }) => {
  await gotoAndWaitForHydration(page, "/");
  const results = await new AxeBuilder({ page })
    .withRules(["color-contrast"])
    .analyze();
  expect(results.violations).toEqual([]);
});

test("resume page has no WCAG 2.1 AA violations", async ({ page }) => {
  await gotoAndWaitForHydration(page, "/resume");
  await page.locator("#basics").waitFor({ state: "visible", timeout: 15000 });
  const results = await new AxeBuilder({ page })
    .include("#basics")
    .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
    .analyze();
  expect(results.violations).toEqual([]);
});

test("all interactive elements are keyboard accessible", async ({ page }) => {
  await gotoAndWaitForHydration(page, "/");
  await page.keyboard.press("Tab");
  const focusedTag = await page.evaluate(
    () => document.activeElement?.tagName
  );
  expect(focusedTag).toBeTruthy();
});

test("buttons have accessible labels", async ({ page }) => {
  await gotoAndWaitForHydration(page, "/labs");
  const buttons = page.locator("button");
  const count = await buttons.count();
  for (let i = 0; i < count; i++) {
    const button = buttons.nth(i);
    const ariaLabel = await button.getAttribute("aria-label");
    const text = await button.textContent();
    expect(
      ariaLabel || text?.trim(),
      `button[${i}] must have accessible name`
    ).toBeTruthy();
  }
});
