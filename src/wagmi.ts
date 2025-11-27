import { defineChain } from "viem";
import { createConfig, http } from "wagmi";
import type { Chain } from "wagmi/chains";
import { mainnet, polygon, polygonAmoy, sepolia } from "wagmi/chains";
// Import connectors from the standalone package to ensure the bundler
// resolves the correct ESM exports instead of a possibly-misaligned
// internal path.
import { injected, metaMask, safe, walletConnect } from "@wagmi/connectors";

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

  const connectors = [] as any[];
  // injected connector is lightweight and can be created client or server-side
  connectors.push(injected());

  if (isClient) {
    connectors.push(
      walletConnect({
        projectId: walletConnectProjectId,
        showQrModal: true,
        qrModalOptions: {
          themeMode: "dark",
        },
      }),
    );
    connectors.push(metaMask());
    connectors.push(safe());
  }
  // Don't add connectors on server-side at all to avoid initialization errors

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
