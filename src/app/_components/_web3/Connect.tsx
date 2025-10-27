"use client";

import * as React from "react";
import { useAccount, useConnect, useDisconnect } from "wagmi";

export function Connect() {
  const { connector, isConnected } = useAccount();
  const { connect, connectors, error } = useConnect();
  const { disconnect } = useDisconnect();
  const [pendingId, setPendingId] = React.useState<string | null>(null);
  const cs: any[] = connectors as any[];

  // clear pending state when connection status changes
  React.useEffect(() => {
    if (isConnected) setPendingId(null);
  }, [isConnected]);

  return (
    <div>
      <div>
        {isConnected && (
          <button onClick={() => disconnect()}>
            Disconnect from {connector?.name}
          </button>
        )}

        {cs.filter((x) => x.ready && x.id !== connector?.id).map((x) => (
          <button
            key={x.id}
            onClick={() => {
              setPendingId(x.id);
              connect({ connector: x });
            }}
            aria-busy={pendingId === x.id}
          >
            {x.name}
            {pendingId === x.id && " (connecting)"}
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
