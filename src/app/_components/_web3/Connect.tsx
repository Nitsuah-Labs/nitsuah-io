"use client";

import * as React from "react";
import toast from "react-hot-toast";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import { WALLET_CONNECT_ID } from "../../../lib/constants/wallets";
import {
  CoinbaseWalletIcon,
  InjectedIcon,
  MetaMaskIcon,
  SafeWalletIcon,
  WalletConnectIcon,
} from "./_assets/wallets/WalletIcons";

// Map connector IDs to their icons
const walletIcons: Record<string, React.FC> = {
  metaMask: MetaMaskIcon,
  metaMaskSDK: MetaMaskIcon,
  coinbaseWallet: CoinbaseWalletIcon,
  coinbaseWalletSDK: CoinbaseWalletIcon,
  walletConnect: WalletConnectIcon,
  safe: SafeWalletIcon,
  injected: InjectedIcon,
};

export function Connect() {
  const { connector, isConnected, address } = useAccount();
  const { connect, connectors, error } = useConnect();
  const { disconnect } = useDisconnect();
  const [pendingId, setPendingId] = React.useState<string | null>(null);
  const [hasInjected, setHasInjected] = React.useState(false);
  const [wasConnected, setWasConnected] = React.useState(false);
  const cs: any[] = connectors as any[];

  // Check for injected wallet on mount
  React.useEffect(() => {
    if (typeof window !== "undefined") {
      setHasInjected(!!window.ethereum);
    }
  }, []);

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

      {/* Show install prompt if no injected wallet detected */}
      {!hasInjected &&
        cs.some((x) => x.id === "injected" || x.id === "metaMask") && (
          <div
            style={{
              padding: "16px",
              backgroundColor: "rgba(192, 132, 252, 0.1)",
              border: "1px solid rgba(192, 132, 252, 0.3)",
              borderRadius: "8px",
              marginBottom: "8px",
            }}
          >
            <p style={{ margin: "0 0 12px", fontWeight: "600" }}>
              No wallet detected
            </p>
            <p
              style={{
                margin: "0 0 12px",
                fontSize: "0.9rem",
                color: "rgba(255, 255, 255, 0.7)",
              }}
            >
              Install a wallet extension to connect:
            </p>
            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
              <a
                href="https://metamask.io/download/"
                target="_blank"
                rel="noopener noreferrer"
                className="labs-btn labs-btn-secondary"
                style={{ textDecoration: "none", fontSize: "0.9rem" }}
              >
                Get MetaMask
              </a>
              <a
                href="https://www.coinbase.com/wallet/downloads"
                target="_blank"
                rel="noopener noreferrer"
                className="labs-btn labs-btn-secondary"
                style={{ textDecoration: "none", fontSize: "0.9rem" }}
              >
                Get Coinbase Wallet
              </a>
            </div>
          </div>
        )}

      {cs
        .filter((x) => x.id !== connector?.id)
        .map((x) => {
          const IconComponent = walletIcons[x.id] || InjectedIcon;
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
