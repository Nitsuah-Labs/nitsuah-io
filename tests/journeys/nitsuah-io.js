// Journey fixture: the screenshot suite's deterministic page setup
// (tests/visual/fixture.js) wired into the journey helpers. Every journey
// starts from a blocked-network, frozen-clock, seeded-random page.
const { test: base, expect, step } = require("./journey");
const { prepare, open, settle } = require("../visual/fixture");

const test = base.extend({
  page: async ({ page }, use) => {
    await prepare(page);
    await use(page);
  },
});

module.exports = { test, expect, step, open, settle };
