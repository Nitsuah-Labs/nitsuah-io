"use client";

import { useAccount, useConnect, useDisconnect } from "wagmi";

export function Connect() {
  const { connector, isConnected } = useAccount();
  const { connect, connectors, error, pendingConnector } = useConnect();
  const { disconnect } = useDisconnect();

  return (
    <div>
      <div>
        {isConnected && (
          <button onClick={() => disconnect()}>
            Disconnect from {connector?.name}
          </button>
        )}

        {(connectors as any[])
          .filter((x) => x.ready && x.id !== connector?.id)
          .map((x) => (
            <button
              key={x.id}
              onClick={() => connect({ connector: x })}
              aria-busy={pendingConnector?.id === x.id}
            >
              {x.name}
              {pendingConnector?.id === x.id && " (connecting)"}
            </button>
          ))}
      </div>

      {error && (
        <div>
          {(error as any)?.shortMessage ??
            (error as any)?.message ??
            `${error}`}
        </div>
      )}
    </div>
  );
}
