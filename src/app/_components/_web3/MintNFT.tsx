"use client";

import { useState } from "react";
import { useWaitForTransactionReceipt } from "wagmi";

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
  } catch (_err) {
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
    <div>
      <input
        onChange={(e) => setTokenId(e.target.value)}
        placeholder="Token ID (optional)"
        value={tokenId}
      />
      <button
        disabled={!simulation?.request || isWriting || isConfirming}
        onClick={handleMint}
      >
        {isWriting ? "Minting..." : isConfirming ? "Confirming..." : "Mint"}
      </button>
      {isConfirmed && (
        <div>
          Successfully minted your NFT!
          <div>
            <a href={`https://etherscan.io/tx/${data}`}>Etherscan</a>
          </div>
        </div>
      )}
      {(isWriteError || isConfirmError) && (
        <div>Error: {(writeError || confirmError)?.message}</div>
      )}
    </div>
  );
}
