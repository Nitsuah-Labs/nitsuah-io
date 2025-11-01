// Blockchain explorer URLs by chain ID
export const EXPLORER_URLS: Record<number, string> = {
  1: "https://etherscan.io",
  137: "https://polygonscan.com",
  11155111: "https://sepolia.etherscan.io",
  80002: "https://amoy.polygonscan.com",
  80001: "https://mumbai.polygonscan.com",
};

export function getExplorerLink(
  address: string,
  chainId: number,
): string | null {
  const baseUrl = EXPLORER_URLS[chainId];
  return baseUrl ? `${baseUrl}/address/${address}` : null;
}
