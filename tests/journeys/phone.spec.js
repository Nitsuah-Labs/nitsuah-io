// The phone layout gets its own journey (390x844, touch).
const { test, expect, step, open, settle } = require("./nitsuah-io");

test.use({
  viewport: { width: 390, height: 844 },
  isMobile: true,
  hasTouch: true,
});

test(
  "visitor on a phone opens the menu and goes to Projects",
  { tag: ["@feature:responsive-design"] },
  async ({ page }) => {
    await step(page, "open the home page on a phone", async () => {
      await open(page, "/");
      await expect(
        page.getByRole("button", { name: "open navigation" }),
      ).toBeVisible();
    });
    await step(page, "open the navigation menu", async () => {
      await page.getByRole("button", { name: "open navigation" }).click();
      await expect(page.getByRole("menuitem").first()).toBeVisible();
    });
    await step(page, "go to Projects", async () => {
      await page
        .getByRole("menuitem", { name: /projects/i })
        .first()
        .click();
      await expect(page).toHaveURL(/\/projects/);
      await settle(page);
      await expect(
        page.getByRole("heading", { name: "PROJECTS" }),
      ).toBeVisible();
    });
  },
);
