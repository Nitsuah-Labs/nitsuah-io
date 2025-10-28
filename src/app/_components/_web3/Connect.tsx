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
    <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
      {isConnected && (
        <button
          onClick={() => disconnect()}
          className="labs-btn labs-btn-danger"
        >
          Disconnect from {connector?.name}
        </button>
      )}

      {cs
        .filter((x) => x.ready && x.id !== connector?.id)
        .map((x) => (
          <button
            key={x.id}
            onClick={() => {
              setPendingId(x.id);
              connect({ connector: x });
            }}
            aria-busy={pendingId === x.id}
            className="labs-btn labs-btn-primary"
            disabled={pendingId === x.id}
          >
            {x.name}
            {pendingId === x.id && " (connecting...)"}
          </button>
        ))}

      {error && (
        <div
          style={{
            padding: "12px",
            backgroundColor: "rgba(239, 68, 68, 0.1)",
            border: "1px solid rgba(239, 68, 68, 0.3)",
            borderRadius: "8px",
            color: "#ef4444",
            marginTop: "8px",
          }}
        >
          {(error as any)?.shortMessage ??
            (error as any)?.message ??
            `${error}`}
        </div>
      )}
    </div>
  );
}
