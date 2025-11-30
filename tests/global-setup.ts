// tests/global-setup.ts
import { chromium, FullConfig } from "@playwright/test";

async function globalSetup(config: FullConfig) {
  console.log("🔧 Running global setup...");
  
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
  
  console.log("✅ Global setup complete - webServer handles warmup");
}

export default globalSetup;
