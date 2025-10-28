import { expect, test } from "@playwright/test";

/**
 * Mock wallet utilities for testing Web3 interactions
 * These tests simulate wallet behavior without requiring actual MetaMask
 */

test.describe("Wallet Connection Flow", () => {
  test.beforeEach(async ({ page }) => {
    // Mock MetaMask window.ethereum object
    await page.addInitScript(() => {
      (window as any).ethereum = {
        isMetaMask: true,
        request: async ({ method }: { method: string }) => {
          if (method === "eth_requestAccounts") {
            return ["0x1234567890123456789012345678901234567890"];
          }
          if (method === "eth_chainId") {
            return "0x1"; // Mainnet
          }
          return null;
        },
        on: () => {},
        removeListener: () => {},
      };
    });
  });

  test("shows connect wallet button when disconnected", async ({ page }) => {
    await page.goto("/labs/register");

    // Look for connect wallet button or setup section
    const connectButton = page.getByRole("button", {
      name: /connect wallet|setup wallet/i,
    });
    await expect(connectButton.first()).toBeVisible({ timeout: 10000 });
  });

  test("wallet connection section exists on register page", async ({
    page,
  }) => {
    await page.goto("/labs/register");

    // Check for wallet setup section
    const walletSection = page.locator("section, div").filter({
      hasText: /setup wallet|connect wallet/i,
    });
    await expect(walletSection.first()).toBeVisible();
  });

  test("network switcher appears on register page", async ({ page }) => {
    await page.goto("/labs/register");

    // Look for network-related text or components
    const networkSection = page.locator("text=/network|testnet|mainnet/i");

    // Should have some network-related content
    const count = await networkSection.count();
    expect(count).toBeGreaterThan(0);
  });

  test("register page has form inputs for domain registration", async ({
    page,
  }) => {
    await page.goto("/labs/register");

    // Look for input fields (even if disabled when wallet not connected)
    const inputs = page.locator(
      'input[type="text"], input[placeholder*="domain"]'
    );

    // Should have at least one input field
    const count = await inputs.count();
    expect(count).toBeGreaterThan(0);
  });
});

test.describe("Mint NFT Flow", () => {
  test("mint page shows wallet connection", async ({ page }) => {
    await page.goto("/labs/mint");

    // Look for connect wallet or account display
    const walletSection = page.locator("text=/connect|wallet|account/i");
    const count = await walletSection.count();
    expect(count).toBeGreaterThan(0);
  });

  test("mint page has network switcher", async ({ page }) => {
    await page.goto("/labs/mint");

    // Check for network-related components
    const networkText = page.locator("text=/network/i");
    const count = await networkText.count();
    expect(count).toBeGreaterThan(0);
  });

  test("mint page layout is consistent with design system", async ({
    page,
  }) => {
    await page.goto("/labs/mint");

    await page.waitForLoadState("networkidle");

    // Check for consistent header and footer
    await expect(page.locator("header")).toBeVisible();
    await expect(page.locator("footer")).toBeVisible();
  });
});

test.describe("Domains Page", () => {
  test("domains page renders correctly", async ({ page }) => {
    await page.goto("/labs/domains");

    await page.waitForLoadState("networkidle");

    await expect(page.locator("header")).toBeVisible();
    await expect(page.locator("footer")).toBeVisible();
  });

  test("domains page has wallet connection capability", async ({ page }) => {
    await page.goto("/labs/domains");

    // Look for wallet-related elements
    const walletElements = page.locator("text=/connect|wallet|account/i");
    const count = await walletElements.count();
    expect(count).toBeGreaterThan(0);
  });
});
