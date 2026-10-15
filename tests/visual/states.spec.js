// Screenshots of interactive states a plain page load can't show: the light
// theme, and a connected (mock) wallet. Written to docs/screenshots/<id>.png.
// Desktop project only; the mock connector is the one test-helper mode
// src/wagmi.ts registers for ?testHelpers=1.
const { test, expect } = require("@playwright/test");
const { prepare, open, settle } = require("./fixture");

test.beforeEach(async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "screenshots-desktop", "desktop only");
  await prepare(page);
});

test("light theme", async ({ page }) => {
  await open(page, "/");
  await page.getByRole("button", { name: "Switch to light mode" }).click();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
  await settle(page);
  await expect(page).toHaveScreenshot("theme-toggle.png");
});

test("mock wallet connected on the mint portal", async ({ page }) => {
  await open(page, "/labs/mint?testHelpers=1");
  await page.getByTestId("connector-mock").click();
  await expect(
    page.getByRole("button", { name: /Disconnect from Mock Connector/i }),
  ).toBeVisible();
  await settle(page);
  await expect(page).toHaveScreenshot("wallet-connection.png");

  // The fixed footer would sit on top of the cards below.
  await page.addStyleTag({
    content: '[data-testid="labs-footer"] { visibility: hidden !important; }',
  });
  // The cards below the fold: NFT minting form and the chain switcher.
  const card = (title) =>
    page.locator(".labs-card", {
      has: page.getByRole("heading", { name: title, exact: true }),
    });
  await expect(card("Mint NFT")).toHaveScreenshot("nft-minting.png");
  await expect(card("Network Settings")).toHaveScreenshot(
    "network-switching.png",
  );
});

test("mock wallet connected on the profile page", async ({ page }) => {
  await open(page, "/profile?testHelpers=1");
  await page.getByTestId("connector-mock").click();
  await expect(page.getByText(/0x1234.*5678/).first()).toBeVisible();
  // The balance card appears once the (mocked) eth_getBalance call returns.
  await expect(page.getByText("1.25")).toBeVisible();
  await settle(page);
  // The fixed site footer would sit on top of the Actions card.
  await page.addStyleTag({
    content: "footer { visibility: hidden !important; }",
  });
  await expect(page).toHaveScreenshot("wallet-dashboard.png", {
    fullPage: true,
  });
});
