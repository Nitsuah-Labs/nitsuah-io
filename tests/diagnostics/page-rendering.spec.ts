/**
 * Diagnostic test to check if pages are rendering at all in CI
 * This test should help identify WHY pages are blank
 */
import { test, expect } from "@playwright/test";

test.describe("Page Rendering Diagnostics", () => {
  test("homepage - check if ANY HTML is rendered", async ({ page }) => {
    console.log("=== DIAGNOSTIC: Homepage rendering ===");
    
    await page.goto("/");
    
    // Wait for page to load
    await page.waitForLoadState("networkidle");
    
    // Get the entire HTML content
    const html = await page.content();
    console.log("HTML length:", html.length);
    console.log("HTML preview (first 500 chars):", html.substring(0, 500));
    
    // Check if we got ANY HTML at all
    expect(html.length).toBeGreaterThan(100);
    expect(html).toContain("<html");
    expect(html).toContain("</html>");
    
    // Check for React root
    const bodyHTML = await page.locator("body").innerHTML();
    console.log("Body HTML length:", bodyHTML.length);
    console.log("Body HTML preview (first 500 chars):", bodyHTML.substring(0, 500));
    
    // Check if Next.js rendered anything
    const hasNextRoot = await page.locator("#__next, [id^='__next']").count();
    console.log("Has Next.js root:", hasNextRoot);
    
    // Check for any content at all
    const bodyText = await page.locator("body").textContent();
    console.log("Body text content length:", bodyText?.length || 0);
    console.log("Body text preview:", bodyText?.substring(0, 200));
    
    // Check for specific elements
    const hasMain = await page.locator("main").count();
    const hasHeader = await page.locator("header").count();
    const hasFooter = await page.locator("footer").count();
    console.log("Element counts - main:", hasMain, "header:", hasHeader, "footer:", hasFooter);
    
    // Check console errors
    const consoleMessages: string[] = [];
    page.on("console", (msg) => {
      if (msg.type() === "error") {
        consoleMessages.push(`ERROR: ${msg.text()}`);
      }
    });
    
    // Check for hydration errors
    const pageErrors: string[] = [];
    page.on("pageerror", (error) => {
      pageErrors.push(error.message);
    });
    
    console.log("Console errors:", consoleMessages);
    console.log("Page errors:", pageErrors);
    
    // Basic assertions - page should have at least SOME content
    expect(bodyHTML.length).toBeGreaterThan(50);
  });
  
  test("check if env variables are set", async ({ page }) => {
    await page.goto("/");
    
    // Check if test helpers are enabled
    const hasTestHelpersClass = await page.locator("body.test-helpers").count();
    console.log("Has test-helpers class:", hasTestHelpersClass > 0);
    
    // Check if test helper CSS exists
    const testHelperStyles = await page.locator('style[data-testid="test-helpers-inline"]').count();
    console.log("Has test helper styles:", testHelperStyles > 0);
  });
  
  test("check if server is actually serving content", async ({ request }) => {
    const response = await request.get("/");
    console.log("Response status:", response.status());
    console.log("Response headers:", JSON.stringify(await response.allHeaders(), null, 2));
    
    const html = await response.text();
    console.log("Response HTML length:", html.length);
    console.log("Response HTML preview:", html.substring(0, 500));
    
    expect(response.status()).toBe(200);
    expect(html.length).toBeGreaterThan(100);
    expect(html).toContain("<!DOCTYPE html>");
  });
});
