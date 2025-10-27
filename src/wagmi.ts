import { createConfig, http } from "wagmi";
import { mainnet, polygon } from "wagmi/chains";
import { injected, metaMask, safe, walletConnect } from "wagmi/connectors";

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
