"use client";

import { BaseError } from "viem";
import { useAccount, useSwitchChain } from "wagmi";

export function NetworkSwitcher() {
  const { chain } = useAccount();
  const { chains, error, isPending, switchChain } = useSwitchChain();

  return (
    <div>
      <div>Connected to {chain?.name ?? chain?.id}</div>

      {/* Test helper: reveal a simple network info element when test helpers are enabled */}
      {process.env.NEXT_PUBLIC_TEST_HELPERS === "1" && (
        <div data-testid="test-network-info" aria-label="test-network-info">
          Network: testnet
        </div>
      )}

      {switchChain && (
        <div>
          {chains.map((x) =>
            x.id === chain?.id ? null : (
              <button key={x.id} onClick={() => switchChain({ chainId: x.id })}>
                {x.name}
                {isPending && " (switching)"}
              </button>
            ),
          )}
        </div>
      )}

      <div>{error && (error as BaseError).shortMessage}</div>
    </div>
  );
}
