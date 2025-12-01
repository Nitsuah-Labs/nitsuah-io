/**
 * Diagnostic test to check if pages are rendering at all in CI
 * This test should help identify WHY pages are blank
 */
import { test, expect } from "@playwright/test";

test.describe("Page Rendering Diagnostics", () => {
  test("homepage - check if ANY HTML is rendered", async ({ page }) => {
    console.log("=== DIAGNOSTIC: Homepage rendering ===");
    
    // Just navigate and see what we get (no hydration wait)
    const response = await page.goto("/", { waitUntil: "commit" });
    console.log("Response status:", response?.status());
    console.log("Response URL:", response?.url());
    
    // Get the HTML immediately (before any JS runs)
    const html = await page.content();
    console.log("HTML length:", html.length);
    console.log("HTML preview (first 1000 chars):", html.substring(0, 1000));
    
    // Basic check - we got HTML
    expect(html.length).toBeGreaterThan(1000);
    expect(html).toContain("<!DOCTYPE html>");
    expect(html).toContain("<html");
    
    console.log("✅ Page loaded with HTML!");
  });
  
  test("check if server is actually serving content via HTTP", async ({ request }) => {
    const response = await request.get("/");
    console.log("Response status:", response.status());
    
    const html = await response.text();
    console.log("Response HTML length:", html.length);
    console.log("Response HTML preview:", html.substring(0, 500));
    
    expect(response.status()).toBe(200);
    expect(html.length).toBeGreaterThan(1000);
    expect(html).toContain("<!DOCTYPE html>");
  });
});
