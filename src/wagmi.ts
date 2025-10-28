import { createConfig, http } from "wagmi";
import { mainnet, polygon } from "wagmi/chains";
// Import connectors from the standalone package to ensure the bundler
// resolves the correct ESM exports instead of a possibly-misaligned
// internal path.
import { injected, metaMask, safe, walletConnect } from "@wagmi/connectors";

const walletConnectProjectId = "732797c00bb7ff1ca10685d9b9415cb6";

export const config = createConfig({
  chains: [mainnet, polygon],
  connectors: [
    injected(),
    walletConnect({ projectId: walletConnectProjectId }),
    metaMask(),
    safe(),
  ],
  transports: {
    [mainnet.id]: http(),
    [polygon.id]: http(),
  },
});
