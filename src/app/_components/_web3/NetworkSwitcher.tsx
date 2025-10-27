"use client";

import { BaseError } from "viem";
import { useAccount, useSwitchChain } from "wagmi";

export function NetworkSwitcher() {
  const { chain } = useAccount();
  const { chains, error, isPending, switchChain } = useSwitchChain();

  return (
    <div>
      <div>Connected to {chain?.name ?? chain?.id}</div>

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
