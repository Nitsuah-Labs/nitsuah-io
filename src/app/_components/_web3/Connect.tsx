"use client";

import * as React from "react";
import toast from "react-hot-toast";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import { WALLET_CONNECT_ID } from "../../../lib/constants/wallets";
import { WalletConnectIcon } from "./_assets/wallets/WalletIcons";
import styles from "./Connect.module.css";

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
  const [mounted, setMounted] = React.useState(false);
  const cs: any[] = connectors as any[];

  // Prevent hydration mismatch
  React.useEffect(() => {
    setMounted(true);
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

  if (!mounted) {
    return (
      <div
        role="region"
        aria-label="Wallet connection controls"
        className={styles.container}
      />
    );
  }

  return (
    <div
      role="region"
      aria-label="Wallet connection controls"
      className={styles.container}
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
              className={`labs-btn labs-btn-primary ${styles.button}`}
              disabled={!isReady || isPending}
              title={!isReady ? `${x.name} not available` : undefined}
            >
              {!isPending && (
                <span className={styles.iconWrapper}>
                  <IconComponent />
                </span>
              )}
              {isPending && <span className={styles.spinner} />}
              <span>
                {x.name}
                {isPending && " (connecting...)"}
                {!isReady && " (not available)"}
              </span>
            </button>
          );
        })}

      {error && (
        <div role="alert" aria-live="polite" className={styles.errorAlert}>
          {(error as any)?.shortMessage ??
            (error as any)?.message ??
            `${error}`}
        </div>
      )}
    </div>
  );
}
