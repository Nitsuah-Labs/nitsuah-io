import { defineChain } from "viem";
import { createConfig, http } from "wagmi";
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

// Support mainnet/polygon prod + testnets (Sepolia, Amoy, and legacy Mumbai)
export const config = createConfig({
  chains: [mainnet, polygon, sepolia, polygonAmoy, polygonMumbai],
  connectors: [
    injected(),
    walletConnect({
      projectId: walletConnectProjectId,
      showQrModal: true,
      qrModalOptions: {
        themeMode: "dark",
      },
    }),
    metaMask(),
    safe(),
  ],
  transports: {
    [mainnet.id]: http(),
    [polygon.id]: http(),
    [sepolia.id]: http(),
    [polygonAmoy.id]: http(),
    [polygonMumbai.id]: http(),
  },
});
