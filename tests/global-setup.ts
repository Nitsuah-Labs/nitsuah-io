// tests/global-setup.ts
import { chromium, FullConfig } from "@playwright/test";

async function globalSetup(config: FullConfig) {
  // Clear any cached browser state
  const browser = await chromium.launch();
  const context = await browser.newContext();

  // Clear localStorage and sessionStorage
  await context.addInitScript(() => {
    // Clear WalletConnect storage to prevent multiple initializations
    localStorage.clear();
    sessionStorage.clear();

    // Clear any existing WalletConnect instances
    if (window.localStorage) {
      window.localStorage.removeItem("walletconnect");
      window.localStorage.removeItem("@walletconnect/universal-provider");
    }
  });

  await context.close();
  await browser.close();
}

export default globalSetup;
