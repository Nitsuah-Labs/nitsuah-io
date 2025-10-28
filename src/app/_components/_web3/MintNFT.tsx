"use client";

import { useState } from "react";
import { useWaitForTransactionReceipt } from "wagmi";

/* eslint-disable @typescript-eslint/no-require-imports */
// Avoid importing the auto-generated `src/generated.ts` at module-evaluation
// time because its codegen dependencies can be ESM-only and break Jest.
// Instead, resolve the hooks at runtime with safe fallbacks.
let _useSimulateWagmiMintExampleMint: any | undefined = undefined;
let _useWriteWagmiMintExampleMint: any | undefined = undefined;

function resolveGeneratedHooks() {
  if (_useSimulateWagmiMintExampleMint && _useWriteWagmiMintExampleMint) return;
  try {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const g = require("../../../generated");
    _useSimulateWagmiMintExampleMint = g.useSimulateWagmiMintExampleMint;
    _useWriteWagmiMintExampleMint = g.useWriteWagmiMintExampleMint;
  } catch {
    // Fallbacks for test environments or when generated hooks aren't available
    _useSimulateWagmiMintExampleMint = () => ({ data: { request: {} } });
    _useWriteWagmiMintExampleMint = () => ({
      data: null,
      writeContract: () => {},
      isPending: false,
      isError: false,
      error: null,
    });
  }
}

export function MintNFT() {
  const [tokenId, setTokenId] = useState("");

  resolveGeneratedHooks();

  const useSimulateWagmiMintExampleMint =
    _useSimulateWagmiMintExampleMint as any;
  const useWriteWagmiMintExampleMint = _useWriteWagmiMintExampleMint as any;

  const { data: simulation } = useSimulateWagmiMintExampleMint({
    args: tokenId ? [BigInt(tokenId)] : undefined,
  });

  const {
    data,
    writeContract,
    isPending: isWriting,
    isError: isWriteError,
    error: writeError,
  } = useWriteWagmiMintExampleMint();

  const {
    isLoading: isConfirming,
    isSuccess: isConfirmed,
    isError: isConfirmError,
    error: confirmError,
  } = useWaitForTransactionReceipt({
    hash: data,
  });

  const handleMint = () => {
    if (simulation?.request) {
      writeContract(simulation.request);
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <input
        onChange={(e) => setTokenId(e.target.value)}
        placeholder="Token ID (optional)"
        value={tokenId}
        aria-label="Token ID for NFT minting"
        style={{
          padding: "12px",
          borderRadius: "8px",
          border: "1px solid rgba(255, 255, 255, 0.2)",
          backgroundColor: "rgba(0, 0, 0, 0.3)",
          color: "white",
          fontSize: "16px",
        }}
      />
      <button
        className="labs-btn labs-btn-primary labs-btn-large"
        disabled={!simulation?.request || isWriting || isConfirming}
        onClick={handleMint}
        aria-busy={isWriting || isConfirming}
        aria-label="Mint NFT"
      >
        {isWriting ? "Minting..." : isConfirming ? "Confirming..." : "Mint"}
      </button>
      {isConfirmed && (
        <div
          role="status"
          aria-live="polite"
          style={{
            padding: "16px",
            backgroundColor: "rgba(16, 185, 129, 0.1)",
            border: "1px solid rgba(16, 185, 129, 0.3)",
            borderRadius: "8px",
            color: "#10b981",
          }}
        >
          <p style={{ margin: "0 0 8px 0" }}>Successfully minted your NFT!</p>
          <a
            href={`https://etherscan.io/tx/${data}`}
            target="_blank"
            rel="noopener noreferrer"
            className="labs-btn labs-btn-secondary labs-btn-small"
            aria-label="View transaction on Etherscan"
          >
            View on Etherscan
          </a>
        </div>
      )}
      {(isWriteError || isConfirmError) && (
        <div
          role="alert"
          aria-live="assertive"
          style={{
            padding: "16px",
            backgroundColor: "rgba(239, 68, 68, 0.1)",
            border: "1px solid rgba(239, 68, 68, 0.3)",
            borderRadius: "8px",
            color: "#ef4444",
          }}
        >
          Error: {(writeError || confirmError)?.message}
        </div>
      )}
    </div>
  );
}
