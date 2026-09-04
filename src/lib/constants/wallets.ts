// Wagmi connector ID constants.
// WalletConnect and the mock (test-mode) connector work without a browser
// extension, so they are always "ready" regardless of what's installed.
export const WALLET_CONNECT_ID = "walletConnect";
export const METAMASK_ID = "metaMask";
export const INJECTED_ID = "injected";
export const SAFE_ID = "safe";
// Mock wallet connector used only when NEXT_PUBLIC_TEST_HELPERS=1 (see
// src/wagmi.ts). Lets Playwright exercise the full connect/disconnect flow
// without a real browser wallet extension.
export const MOCK_WALLET_ID = "mock";

// Connectors that don't require a browser extension to be installed, and are
// therefore always safe to treat as "ready" / connectable.
export const EXTENSION_FREE_CONNECTOR_IDS: readonly string[] = [
  WALLET_CONNECT_ID,
  MOCK_WALLET_ID,
];

// Connector ids that represent an in-browser extension (injected provider).
// Used to decide whether to surface the "no extension detected, use a
// fallback provider" hint.
export const EXTENSION_CONNECTOR_IDS: readonly string[] = [
  METAMASK_ID,
  INJECTED_ID,
];
