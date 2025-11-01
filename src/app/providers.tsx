"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import * as React from "react";
import { WagmiProvider } from "wagmi";

// Import a client-only getter for config so WalletConnect is only created on the client
import { getWagmiConfig } from "../wagmi";
import { ToastProvider } from "./_components/_web3/ToastProvider";

// Create singleton instances to prevent multiple initializations
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
});

export function Providers({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = React.useState(false);
  const [clientConfig, setClientConfig] = React.useState<any | null>(null);

  React.useEffect(() => {
    setMounted(true);
    // Only create the Wagmi config on the client
    const cfg = getWagmiConfig();
    setClientConfig(cfg);
  }, []);

  if (!mounted || !clientConfig) return null;

  return (
    <WagmiProvider config={clientConfig}>
      <QueryClientProvider client={queryClient}>
        <ToastProvider />
        {children}
      </QueryClientProvider>
    </WagmiProvider>
  );
}
