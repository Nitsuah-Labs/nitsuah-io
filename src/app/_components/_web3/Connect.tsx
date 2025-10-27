"use client";

import { BaseError } from "viem";
import { useAccount, useConnect, useDisconnect } from "wagmi";

export function Connect() {
  const { connector, isConnected } = useAccount();
  const { connect, connectors, error, isPending } = useConnect();
  const { disconnect } = useDisconnect();

  return (
    <div>
      <div>
        {isConnected && (
          <button onClick={() => disconnect()}>
            Disconnect from {connector?.name}
          </button>
        )}

        {connectors
          .filter((x) => x.ready && x.id !== connector?.id)
          .map((x) => (
            <button key={x.id} onClick={() => connect({ connector: x })}>
              {x.name}
              {isPending && " (connecting)"}
            </button>
          ))}
      </div>

      {error && <div>{(error as BaseError).shortMessage}</div>}
    </div>
  );
}
