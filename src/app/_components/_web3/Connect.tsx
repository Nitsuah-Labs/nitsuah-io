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
    <div
      aria-label="Connect to wallet"
      style={{ display: "flex", flexDirection: "column", gap: "12px" }}
    >
      {isConnected && (
        <button
          onClick={() => disconnect()}
          className="labs-btn labs-btn-danger"
          aria-label={`Disconnect from ${connector?.name || "wallet"}`}
        >
          Disconnect from {connector?.name}
        </button>
      )}

      {cs
        // Show all connectors to surface options like Coinbase Wallet even when
        // the injected provider isn't marked `ready`. Disable connectors that
        // aren't ready but still render them so users know about available
        // options and tests can target them deterministically.
        .filter((x) => x.id !== connector?.id)
        .map((x) => (
          <button
            key={x.id}
            onClick={() => {
              setPendingId(x.id);
              connect({ connector: x });
            }}
            aria-busy={pendingId === x.id}
            aria-label={`Connect to ${x.name} wallet`}
            data-testid={`connector-${x.id}`}
            className="labs-btn labs-btn-primary"
            disabled={!x.ready || pendingId === x.id}
            title={!x.ready ? `${x.name} not available` : undefined}
          >
            {x.name}
            {pendingId === x.id && " (connecting...)"}
            {!x.ready && " (not available)"}
          </button>
        ))}

      {error && (
        <div
          role="alert"
          aria-live="polite"
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
