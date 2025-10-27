'use client';

import { useState } from 'react';
import { useWaitForTransactionReceipt } from 'wagmi';
import { useSimulateWagmiMintExampleMint, useWriteWagmiMintExampleMint } from '../../../generated';

export function MintNFT() {
  const [tokenId, setTokenId] = useState('');

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
        onChange={e => setTokenId(e.target.value)}
        placeholder="Token ID (optional)"
        value={tokenId}
      />
      <button disabled={!simulation?.request || isWriting || isConfirming} onClick={handleMint}>
        {isWriting ? 'Minting...' : isConfirming ? 'Confirming...' : 'Mint'}
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
