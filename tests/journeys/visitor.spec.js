// Happy paths a visitor takes on nitsuah.io. Each journey does what its title
// says and asserts the result; tags are promo/spots.json feature ids.
const { test, expect, step, open, settle } = require("./nitsuah-io");

test(
  "visitor lands on the home page and meets the featured projects",
  { tag: ["@feature:featured-projects-landing-page"] },
  async ({ page }) => {
    await step(page, "open the landing page", async () => {
      await open(page, "/");
      await expect(page.getByRole("heading", { level: 1 })).toContainText(
        "Austin J. Hardy",
      );
      await expect(page.getByRole("heading", { level: 1 })).toContainText(
        "Senior Platform & AI Engineer",
      );
    });
    await step(page, "see the featured project cards", async () => {
      for (const name of [
        "Vigil",
        "motor-pool",
        "ats-fill",
        "fire",
        "VHS Box",
      ]) {
        await expect(
          page.getByRole("heading", { name, exact: true }),
        ).toBeVisible();
      }
      await expect(page.getByText("View All Projects")).toBeVisible();
    });
  },
);

test(
  "visitor narrows the project gallery to Web3 projects",
  { tag: ["@feature:project-gallery"] },
  async ({ page }) => {
    const cards = page.getByTestId("projects-section").locator("> *");
    let all = 0;
    await step(page, "open the project gallery", async () => {
      await open(page, "/projects");
      await expect(
        page.getByRole("heading", { name: "PROJECTS" }),
      ).toBeVisible();
      all = await cards.count();
      expect(all).toBeGreaterThan(10);
    });
    await step(page, "pick the Web3 category", async () => {
      await page.getByRole("button", { name: "Web3", exact: true }).click();
      await settle(page);
      await expect(cards).not.toHaveCount(all);
      await expect(page.getByRole("heading", { name: "/labs" })).toBeVisible();
      await expect(page.getByRole("heading", { name: "Vigil" })).toHaveCount(0);
    });
    await step(page, "go back to all projects", async () => {
      await page.getByRole("button", { name: "all", exact: true }).click();
      await settle(page);
      await expect(cards).toHaveCount(all);
    });
  },
);

test(
  "visitor opens a blog post from the blog list",
  { tag: ["@feature:blog-platform"] },
  async ({ page }) => {
    await step(page, "open the blog list", async () => {
      await open(page, "/projects/blogs");
      await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
      await expect(
        page.getByText(
          "Building a Portfolio: Netlify, Docker & Modern Deployment",
        ),
      ).toBeVisible();
    });
    await step(page, "read the post", async () => {
      await page
        .getByRole("heading", {
          name: "Building a Portfolio: Netlify, Docker & Modern Deployment",
        })
        .click();
      await expect(page).toHaveURL(
        /\/projects\/blogs\/portfolio-netlify-docker$/,
      );
      await settle(page);
      await expect(page.getByRole("heading", { level: 1 })).toContainText(
        "Building a Portfolio",
      );
      await expect(
        page.getByRole("heading", { name: "Why This Stack?" }),
      ).toBeVisible();
    });
  },
);

test(
  "visitor reads the resume",
  { tag: ["@feature:professional-resume"] },
  async ({ page }) => {
    await step(page, "open the resume", async () => {
      await open(page, "/resume");
      await expect(
        page.getByRole("heading", { name: "Austin J. Hardy" }),
      ).toBeVisible();
      await expect(page.getByRole("heading", { name: "About" })).toBeVisible();
    });
    await step(page, "scan the work history", async () => {
      await expect(page.getByText("Work Experience")).toBeVisible();
      await expect(page.getByText("Nov 2023 - Mar 2026")).toBeVisible();
    });
  },
);

test(
  "visitor reads the about page",
  { tag: ["@feature:about-page"] },
  async ({ page }) => {
    await step(page, "open the about page", async () => {
      await open(page, "/about");
      await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    });
  },
);

test(
  "visitor switches to light mode and it survives a reload",
  { tag: ["@feature:theme-toggle", "@feature:localstorage-persistence"] },
  async ({ page }) => {
    await step(page, "start in dark mode", async () => {
      await open(page, "/");
      await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
    });
    await step(page, "switch to light mode", async () => {
      await page.getByRole("button", { name: "Switch to light mode" }).click();
      await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
      await expect(
        page.getByRole("button", { name: "Switch to dark mode" }),
      ).toBeVisible();
    });
    await step(page, "reload and stay in light mode", async () => {
      await page.reload();
      await settle(page);
      await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
    });
  },
);

test(
  "visitor connects the mock wallet in Labs and disconnects again",
  { tag: ["@feature:wallet-connection"] },
  async ({ page }) => {
    const mock = page.getByTestId("connector-mock");
    await step(page, "open the mint portal disconnected", async () => {
      await open(page, "/labs/mint?testHelpers=1");
      await expect(
        page.getByRole("region", { name: "Wallet connection controls" }),
      ).toBeVisible();
      await expect(mock).toBeEnabled();
    });
    await step(page, "connect the mock wallet", async () => {
      await mock.click();
      await expect(
        page.getByRole("button", { name: /Disconnect from Mock Connector/i }),
      ).toBeVisible();
      await expect(page.getByText(/0x1234.*5678/)).toBeVisible();
    });
    await step(page, "disconnect", async () => {
      await page
        .getByRole("button", { name: /Disconnect from Mock Connector/i })
        .click();
      await expect(mock).toBeVisible();
    });
  },
);
