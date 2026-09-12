/**
 * Unit tests for the hex chain-id -> network name map used by the labs
 * wallet-switch UI. Covers the Mumbai -> Amoy testnet migration (Mumbai,
 * hex 0x13881 / decimal 80001, is fully shut down; Amoy, hex 0x13882 /
 * decimal 80002, is its replacement). See docs/TASKS.md.
 */

import { networks } from "../networks";

describe("labs networks map", () => {
  it("maps the Polygon Amoy hex chain id to its display name", () => {
    expect(networks["0x13882"]).toBe("Polygon Amoy Testnet");
  });

  it("no longer maps the deprecated Mumbai hex chain id", () => {
    expect(networks["0x13881"]).toBeUndefined();
  });
});
