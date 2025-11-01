"use client";

import * as React from "react";
import toast from "react-hot-toast";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import { WALLET_CONNECT_ID } from "../../../lib/constants/wallets";
import { WalletConnectIcon } from "./_assets/wallets/WalletIcons";

// Map connector IDs to their icons
const walletIcons: Record<string, React.FC> = {
  walletConnect: WalletConnectIcon,
};

export function Connect() {
  const { connector, isConnected, address } = useAccount();
  const { connect, connectors, error } = useConnect();
  const { disconnect } = useDisconnect();
  const [pendingId, setPendingId] = React.useState<string | null>(null);
  const [wasConnected, setWasConnected] = React.useState(false);
  const cs: any[] = connectors as any[];

  // Show toast on connection/disconnection
  React.useEffect(() => {
    if (isConnected && !wasConnected && address) {
      toast.success(`Connected to ${connector?.name || "wallet"}`, {
        icon: "🔗",
      });
      setWasConnected(true);
      setPendingId(null);
    } else if (!isConnected && wasConnected) {
      toast("Wallet disconnected", { icon: "👋" });
      setWasConnected(false);
    }
  }, [isConnected, address, connector?.name, wasConnected]);

  // Show error toast
  React.useEffect(() => {
    if (error) {
      toast.error(
        (error as any)?.shortMessage ||
          (error as any)?.message ||
          "Failed to connect",
      );
      setPendingId(null);
    }
  }, [error]);

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
        .filter((x) => x.id !== connector?.id && x.id === WALLET_CONNECT_ID)
        .map((x) => {
          const IconComponent = walletIcons[x.id] || WalletConnectIcon;
          const isReady = x.ready || x.id === WALLET_CONNECT_ID;
          const isPending = pendingId === x.id;

          return (
            <button
              key={x.id}
              onClick={() => {
                if (isReady) {
                  setPendingId(x.id);
                  connect({ connector: x });
                }
              }}
              aria-busy={isPending}
              aria-label={`Connect to ${x.name} wallet`}
              data-testid={`connector-${x.id}`}
              className="labs-btn labs-btn-primary"
              disabled={!isReady || isPending}
              title={!isReady ? `${x.name} not available` : undefined}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                justifyContent: "center",
                position: "relative",
                opacity: !isReady ? 0.5 : 1,
              }}
            >
              {!isPending && (
                <span style={{ display: "flex", alignItems: "center" }}>
                  <IconComponent />
                </span>
              )}
              {isPending && (
                <span
                  style={{
                    display: "inline-block",
                    width: "16px",
                    height: "16px",
                    border: "2px solid rgba(255,255,255,0.3)",
                    borderTop: "2px solid #fff",
                    borderRadius: "50%",
                    animation: "spin 0.6s linear infinite",
                  }}
                />
              )}
              <span>
                {x.name}
                {isPending && " (connecting...)"}
                {!isReady && " (not available)"}
              </span>
            </button>
          );
        })}

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
