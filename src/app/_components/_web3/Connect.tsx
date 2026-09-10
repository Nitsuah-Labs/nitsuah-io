"use client";

import * as React from "react";
import toast from "react-hot-toast";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import {
  EXTENSION_CONNECTOR_IDS,
  EXTENSION_FREE_CONNECTOR_IDS,
} from "../../../lib/constants/wallets";
import {
  InjectedIcon,
  MetaMaskIcon,
  SafeWalletIcon,
  WalletConnectIcon,
} from "./_assets/wallets/WalletIcons";
import styles from "./Connect.module.css";

// Map connector IDs to their icons. Connectors without a specific entry
// (e.g. the test-only "mock" connector) fall back to a generic icon.
const walletIcons: Record<string, React.FC> = {
  walletConnect: WalletConnectIcon,
  metaMask: MetaMaskIcon,
  injected: InjectedIcon,
  safe: SafeWalletIcon,
  mock: InjectedIcon,
};

// Preferred display order: browser-extension wallets first, then
// extension-free fallbacks (WalletConnect / the test-mode mock provider).
const CONNECTOR_ORDER = [
  "metaMask",
  "injected",
  "safe",
  "walletConnect",
  "mock",
];

function connectorSortIndex(id: string): number {
  const idx = CONNECTOR_ORDER.indexOf(id);
  return idx === -1 ? CONNECTOR_ORDER.length : idx;
}

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

  // Show every configured connector (MetaMask, injected, Safe, WalletConnect,
  // and the test-mode mock provider), not just WalletConnect — previously a
  // stray filter here hid every wallet except WalletConnect, so MetaMask
  // (and any other installed extension) could never be connected to.
  const availableConnectors = cs
    .filter((x) => x.id !== connector?.id)
    .sort((a, b) => connectorSortIndex(a.id) - connectorSortIndex(b.id));

  // Extension-based connectors (MetaMask, generic injected) only work if the
  // browser extension is actually installed. If none are ready, surface a
  // fallback provider hint pointing at an extension-free option instead of
  // just leaving disabled, unexplained buttons.
  const hasExtensionConnector = cs.some((x) =>
    EXTENSION_CONNECTOR_IDS.includes(x.id),
  );
  const hasReadyExtensionConnector = cs.some(
    (x) => EXTENSION_CONNECTOR_IDS.includes(x.id) && x.ready,
  );
  const fallbackConnector = cs.find((x) =>
    EXTENSION_FREE_CONNECTOR_IDS.includes(x.id),
  );
  const showFallbackHint =
    !isConnected &&
    hasExtensionConnector &&
    !hasReadyExtensionConnector &&
    Boolean(fallbackConnector);

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

      {showFallbackHint && (
        <p className={styles.fallbackNote} role="status">
          No browser wallet extension detected — connect with{" "}
          {fallbackConnector?.name} instead.
        </p>
      )}

      {availableConnectors.map((x) => {
        const IconComponent = walletIcons[x.id] || WalletConnectIcon;
        const isReady =
          EXTENSION_FREE_CONNECTOR_IDS.includes(x.id) || Boolean(x.ready);
        const isPending = pendingId === x.id;
        const isFallback = showFallbackHint && x.id === fallbackConnector?.id;

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
            className={`labs-btn labs-btn-primary ${styles.button} ${
              isFallback ? styles.recommended : ""
            }`}
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
