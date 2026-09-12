/**
 * Unit tests for the chain-id -> block explorer mapping.
 * Covers the Mumbai -> Amoy testnet migration (Polygon shut Mumbai down;
 * Amoy, chain id 80002, is its replacement). See docs/TASKS.md.
 */

import { EXPLORER_URLS, getExplorerLink } from "../networks";

describe("networks constants", () => {
  it("resolves the Polygon Amoy explorer for chain id 80002", () => {
    expect(EXPLORER_URLS[80002]).toBe("https://amoy.polygonscan.com");
    expect(getExplorerLink("0xabc", 80002)).toBe(
      "https://amoy.polygonscan.com/address/0xabc",
    );
  });

  it("no longer has an entry for the deprecated Mumbai testnet (chain id 80001)", () => {
    expect(EXPLORER_URLS[80001]).toBeUndefined();
    expect(getExplorerLink("0xabc", 80001)).toBeNull();
  });

  it("still resolves explorers for the other supported chains", () => {
    expect(getExplorerLink("0xabc", 1)).toBe(
      "https://etherscan.io/address/0xabc",
    );
    expect(getExplorerLink("0xabc", 137)).toBe(
      "https://polygonscan.com/address/0xabc",
    );
  });

  it("returns null for an unknown chain id", () => {
    expect(getExplorerLink("0xabc", 999999)).toBeNull();
  });
});
