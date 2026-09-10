import { defineChain } from "viem";
import { createConfig, http } from "wagmi";
import type { Chain } from "wagmi/chains";
import { mainnet, polygon, polygonAmoy, sepolia } from "wagmi/chains";
// Import connectors from the standalone package to ensure the bundler
// resolves the correct ESM exports instead of a possibly-misaligned
// internal path.
import {
  injected,
  metaMask,
  mock,
  safe,
  walletConnect,
} from "@wagmi/connectors";

const walletConnectProjectId = "732797c00bb7ff1ca10685d9b9415cb6";

// Mumbai testnet (deprecated but contracts still deployed there)
// Define custom chain since it's removed from wagmi/chains
export const polygonMumbai = defineChain({
  id: 80001,
  name: "Polygon Mumbai Testnet",
  nativeCurrency: { name: "MATIC", symbol: "MATIC", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://rpc-mumbai.maticvigil.com"],
    },
  },
  blockExplorers: {
    default: {
      name: "PolygonScan",
      url: "https://mumbai.polygonscan.com",
    },
  },
  testnet: true,
});

// Create and cache the Wagmi config on first client access to avoid
// initializing WalletConnect/SignClient during SSR or multiple test imports.
let _clientConfig: ReturnType<typeof createConfig> | null = null;

export function getWagmiConfig() {
  if (_clientConfig) return _clientConfig;

  // Base chains
  const chains = [mainnet, polygon, sepolia, polygonAmoy, polygonMumbai];

  // createConfig expects a readonly tuple type; cast safely to the expected
  // readonly [Chain, ...Chain[]] to satisfy the signature while preserving
  // proper runtime values.
  const typedChains = chains as unknown as readonly [Chain, ...Chain[]];

  // Create connectors only on the client where window and Web APIs exist.
  // This prevents WalletConnect from initializing in SSR or test harnesses
  // where it can cause multiple SignClient initializations.
  const isClient = typeof window !== "undefined";
  // NEXT_PUBLIC_* env vars are inlined into the client bundle at *build*
  // time. config/Dockerfile.test (and Dockerfile.unit) only set
  // NEXT_PUBLIC_TEST_HELPERS=1 via `ENV` *after* `npm run build:skip-wagmi`
  // runs, so the built bundle never actually observes it as "1" — the same
  // reason mint/domains pages also fall back to a `?testHelpers=1` query
  // param detected at runtime (see src/app/labs/mint/page.tsx
  // `showTestHelpers`). Mirror that fallback here so the mock wallet
  // provider is reachable in that Docker image too.
  const hasTestHelpersParam =
    isClient &&
    (() => {
      try {
        return (
          new URLSearchParams(window.location.search).get("testHelpers") === "1"
        );
      } catch {
        return false;
      }
    })();
  const isTestMode =
    process.env.NEXT_PUBLIC_TEST_HELPERS === "1" || hasTestHelpersParam;

  const connectors = [] as any[];
  // injected connector is lightweight and can be created client or server-side
  connectors.push(injected());

  // Skip WalletConnect and other live connectors in test mode to prevent
  // crashes (they require API keys / real extensions), but provide a mock
  // wallet provider as a local testing fallback so wallet-connect UI and
  // E2E flows (connect -> account -> disconnect) can still be exercised
  // without a real wallet extension. See docs/TASKS.md P2: "Add a wallet
  // and MetaMask local testing path".
  if (isClient && isTestMode) {
    connectors.push(
      mock({
        // Verified EIP-55 checksummed test address (via viem's getAddress) —
        // wagmi's mock connector throws "Address is invalid" on anything
        // that doesn't pass checksum validation.
        accounts: ["0x1234567890AbcdEF1234567890aBcdef12345678"],
        features: { defaultConnected: false },
      }),
    );
  }

  if (isClient && !isTestMode) {
    connectors.push(
      walletConnect({
        projectId: walletConnectProjectId,
        showQrModal: true,
        qrModalOptions: {
          themeMode: "dark",
        },
      }),
    );
    connectors.push(
      metaMask({
        // Dapp identity shown on MetaMask's confirmation/pairing screens.
        // Also required for the SDK's mobile deeplink + relay flow: without
        // an explicit url the SDK falls back to window.location.hostname,
        // which can produce an unstable pairing session (deep link opens
        // MetaMask, then closes without completing the connection).
        dapp: {
          name: "nitsuah.io",
          url:
            (typeof window !== "undefined" && window.location.origin) ||
            "https://nitsuah.io",
        },
      }),
    );
    connectors.push(safe());
  }
  // Don't add live connectors on server-side to avoid initialization errors

  _clientConfig = createConfig({
    chains: typedChains,
    connectors,
    transports: {
      [mainnet.id]: http(),
      [polygon.id]: http(),
      [sepolia.id]: http(),
      [polygonAmoy.id]: http(),
      [polygonMumbai.id]: http(),
    },
  });

  return _clientConfig;
}
