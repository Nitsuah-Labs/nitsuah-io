import {
  createUseReadContract,
  createUseWriteContract,
  createUseSimulateContract,
  createUseWatchContractEvent,
} from 'wagmi/codegen'

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// WagmiMintExample
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2)
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2)
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x94b40dDa4ACfDe42c7B334A60f25a0f86CE163d8)
 */
export const wagmiMintExampleAbi = [
  { type: 'constructor', inputs: [], stateMutability: 'nonpayable' },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'approved',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'tokenId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
    ],
    name: 'Approval',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'operator',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      { name: 'approved', internalType: 'bool', type: 'bool', indexed: false },
    ],
    name: 'ApprovalForAll',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'tokenId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
    ],
    name: 'Transfer',
  },
  {
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'approve',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'owner', internalType: 'address', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'getApproved',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'operator', internalType: 'address', type: 'address' },
    ],
    name: 'isApprovedForAll',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'mint',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'mint',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'name',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'ownerOf',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'safeTransferFrom',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
      { name: '_data', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'safeTransferFrom',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'operator', internalType: 'address', type: 'address' },
      { name: 'approved', internalType: 'bool', type: 'bool' },
    ],
    name: 'setApprovalForAll',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'interfaceId', internalType: 'bytes4', type: 'bytes4' }],
    name: 'supportsInterface',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'symbol',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'tokenURI',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'pure',
  },
  {
    type: 'function',
    inputs: [],
    name: 'totalSupply',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transferFrom',
    outputs: [],
    stateMutability: 'nonpayable',
  },
] as const

/**
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2)
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2)
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x94b40dDa4ACfDe42c7B334A60f25a0f86CE163d8)
 */
export const wagmiMintExampleAddress = {
  1: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2',
  5: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2',
  80001: '0x94b40dDa4ACfDe42c7B334A60f25a0f86CE163d8',
} as const

/**
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2)
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2)
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x94b40dDa4ACfDe42c7B334A60f25a0f86CE163d8)
 */
export const wagmiMintExampleConfig = {
  address: wagmiMintExampleAddress,
  abi: wagmiMintExampleAbi,
} as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// React
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link wagmiMintExampleAbi}__
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2)
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2)
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x94b40dDa4ACfDe42c7B334A60f25a0f86CE163d8)
 */
export const useReadWagmiMintExample = /*#__PURE__*/ createUseReadContract({
  abi: wagmiMintExampleAbi,
  address: wagmiMintExampleAddress,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link wagmiMintExampleAbi}__ and `functionName` set to `"balanceOf"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2)
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2)
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x94b40dDa4ACfDe42c7B334A60f25a0f86CE163d8)
 */
export const useReadWagmiMintExampleBalanceOf =
  /*#__PURE__*/ createUseReadContract({
    abi: wagmiMintExampleAbi,
    address: wagmiMintExampleAddress,
    functionName: 'balanceOf',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link wagmiMintExampleAbi}__ and `functionName` set to `"getApproved"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2)
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2)
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x94b40dDa4ACfDe42c7B334A60f25a0f86CE163d8)
 */
export const useReadWagmiMintExampleGetApproved =
  /*#__PURE__*/ createUseReadContract({
    abi: wagmiMintExampleAbi,
    address: wagmiMintExampleAddress,
    functionName: 'getApproved',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link wagmiMintExampleAbi}__ and `functionName` set to `"isApprovedForAll"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2)
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2)
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x94b40dDa4ACfDe42c7B334A60f25a0f86CE163d8)
 */
export const useReadWagmiMintExampleIsApprovedForAll =
  /*#__PURE__*/ createUseReadContract({
    abi: wagmiMintExampleAbi,
    address: wagmiMintExampleAddress,
    functionName: 'isApprovedForAll',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link wagmiMintExampleAbi}__ and `functionName` set to `"name"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2)
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2)
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x94b40dDa4ACfDe42c7B334A60f25a0f86CE163d8)
 */
export const useReadWagmiMintExampleName = /*#__PURE__*/ createUseReadContract({
  abi: wagmiMintExampleAbi,
  address: wagmiMintExampleAddress,
  functionName: 'name',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link wagmiMintExampleAbi}__ and `functionName` set to `"ownerOf"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2)
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2)
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x94b40dDa4ACfDe42c7B334A60f25a0f86CE163d8)
 */
export const useReadWagmiMintExampleOwnerOf =
  /*#__PURE__*/ createUseReadContract({
    abi: wagmiMintExampleAbi,
    address: wagmiMintExampleAddress,
    functionName: 'ownerOf',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link wagmiMintExampleAbi}__ and `functionName` set to `"supportsInterface"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2)
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2)
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x94b40dDa4ACfDe42c7B334A60f25a0f86CE163d8)
 */
export const useReadWagmiMintExampleSupportsInterface =
  /*#__PURE__*/ createUseReadContract({
    abi: wagmiMintExampleAbi,
    address: wagmiMintExampleAddress,
    functionName: 'supportsInterface',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link wagmiMintExampleAbi}__ and `functionName` set to `"symbol"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2)
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2)
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x94b40dDa4ACfDe42c7B334A60f25a0f86CE163d8)
 */
export const useReadWagmiMintExampleSymbol =
  /*#__PURE__*/ createUseReadContract({
    abi: wagmiMintExampleAbi,
    address: wagmiMintExampleAddress,
    functionName: 'symbol',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link wagmiMintExampleAbi}__ and `functionName` set to `"tokenURI"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2)
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2)
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x94b40dDa4ACfDe42c7B334A60f25a0f86CE163d8)
 */
export const useReadWagmiMintExampleTokenUri =
  /*#__PURE__*/ createUseReadContract({
    abi: wagmiMintExampleAbi,
    address: wagmiMintExampleAddress,
    functionName: 'tokenURI',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link wagmiMintExampleAbi}__ and `functionName` set to `"totalSupply"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2)
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2)
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x94b40dDa4ACfDe42c7B334A60f25a0f86CE163d8)
 */
export const useReadWagmiMintExampleTotalSupply =
  /*#__PURE__*/ createUseReadContract({
    abi: wagmiMintExampleAbi,
    address: wagmiMintExampleAddress,
    functionName: 'totalSupply',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link wagmiMintExampleAbi}__
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2)
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2)
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x94b40dDa4ACfDe42c7B334A60f25a0f86CE163d8)
 */
export const useWriteWagmiMintExample = /*#__PURE__*/ createUseWriteContract({
  abi: wagmiMintExampleAbi,
  address: wagmiMintExampleAddress,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link wagmiMintExampleAbi}__ and `functionName` set to `"approve"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2)
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2)
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x94b40dDa4ACfDe42c7B334A60f25a0f86CE163d8)
 */
export const useWriteWagmiMintExampleApprove =
  /*#__PURE__*/ createUseWriteContract({
    abi: wagmiMintExampleAbi,
    address: wagmiMintExampleAddress,
    functionName: 'approve',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link wagmiMintExampleAbi}__ and `functionName` set to `"mint"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2)
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2)
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x94b40dDa4ACfDe42c7B334A60f25a0f86CE163d8)
 */
export const useWriteWagmiMintExampleMint =
  /*#__PURE__*/ createUseWriteContract({
    abi: wagmiMintExampleAbi,
    address: wagmiMintExampleAddress,
    functionName: 'mint',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link wagmiMintExampleAbi}__ and `functionName` set to `"safeTransferFrom"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2)
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2)
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x94b40dDa4ACfDe42c7B334A60f25a0f86CE163d8)
 */
export const useWriteWagmiMintExampleSafeTransferFrom =
  /*#__PURE__*/ createUseWriteContract({
    abi: wagmiMintExampleAbi,
    address: wagmiMintExampleAddress,
    functionName: 'safeTransferFrom',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link wagmiMintExampleAbi}__ and `functionName` set to `"setApprovalForAll"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2)
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2)
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x94b40dDa4ACfDe42c7B334A60f25a0f86CE163d8)
 */
export const useWriteWagmiMintExampleSetApprovalForAll =
  /*#__PURE__*/ createUseWriteContract({
    abi: wagmiMintExampleAbi,
    address: wagmiMintExampleAddress,
    functionName: 'setApprovalForAll',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link wagmiMintExampleAbi}__ and `functionName` set to `"transferFrom"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2)
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2)
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x94b40dDa4ACfDe42c7B334A60f25a0f86CE163d8)
 */
export const useWriteWagmiMintExampleTransferFrom =
  /*#__PURE__*/ createUseWriteContract({
    abi: wagmiMintExampleAbi,
    address: wagmiMintExampleAddress,
    functionName: 'transferFrom',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link wagmiMintExampleAbi}__
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2)
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2)
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x94b40dDa4ACfDe42c7B334A60f25a0f86CE163d8)
 */
export const useSimulateWagmiMintExample =
  /*#__PURE__*/ createUseSimulateContract({
    abi: wagmiMintExampleAbi,
    address: wagmiMintExampleAddress,
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link wagmiMintExampleAbi}__ and `functionName` set to `"approve"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2)
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2)
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x94b40dDa4ACfDe42c7B334A60f25a0f86CE163d8)
 */
export const useSimulateWagmiMintExampleApprove =
  /*#__PURE__*/ createUseSimulateContract({
    abi: wagmiMintExampleAbi,
    address: wagmiMintExampleAddress,
    functionName: 'approve',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link wagmiMintExampleAbi}__ and `functionName` set to `"mint"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2)
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2)
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x94b40dDa4ACfDe42c7B334A60f25a0f86CE163d8)
 */
export const useSimulateWagmiMintExampleMint =
  /*#__PURE__*/ createUseSimulateContract({
    abi: wagmiMintExampleAbi,
    address: wagmiMintExampleAddress,
    functionName: 'mint',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link wagmiMintExampleAbi}__ and `functionName` set to `"safeTransferFrom"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2)
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2)
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x94b40dDa4ACfDe42c7B334A60f25a0f86CE163d8)
 */
export const useSimulateWagmiMintExampleSafeTransferFrom =
  /*#__PURE__*/ createUseSimulateContract({
    abi: wagmiMintExampleAbi,
    address: wagmiMintExampleAddress,
    functionName: 'safeTransferFrom',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link wagmiMintExampleAbi}__ and `functionName` set to `"setApprovalForAll"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2)
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2)
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x94b40dDa4ACfDe42c7B334A60f25a0f86CE163d8)
 */
export const useSimulateWagmiMintExampleSetApprovalForAll =
  /*#__PURE__*/ createUseSimulateContract({
    abi: wagmiMintExampleAbi,
    address: wagmiMintExampleAddress,
    functionName: 'setApprovalForAll',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link wagmiMintExampleAbi}__ and `functionName` set to `"transferFrom"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2)
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2)
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x94b40dDa4ACfDe42c7B334A60f25a0f86CE163d8)
 */
export const useSimulateWagmiMintExampleTransferFrom =
  /*#__PURE__*/ createUseSimulateContract({
    abi: wagmiMintExampleAbi,
    address: wagmiMintExampleAddress,
    functionName: 'transferFrom',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link wagmiMintExampleAbi}__
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2)
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2)
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x94b40dDa4ACfDe42c7B334A60f25a0f86CE163d8)
 */
export const useWatchWagmiMintExampleEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: wagmiMintExampleAbi,
    address: wagmiMintExampleAddress,
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link wagmiMintExampleAbi}__ and `eventName` set to `"Approval"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2)
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2)
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x94b40dDa4ACfDe42c7B334A60f25a0f86CE163d8)
 */
export const useWatchWagmiMintExampleApprovalEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: wagmiMintExampleAbi,
    address: wagmiMintExampleAddress,
    eventName: 'Approval',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link wagmiMintExampleAbi}__ and `eventName` set to `"ApprovalForAll"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2)
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2)
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x94b40dDa4ACfDe42c7B334A60f25a0f86CE163d8)
 */
export const useWatchWagmiMintExampleApprovalForAllEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: wagmiMintExampleAbi,
    address: wagmiMintExampleAddress,
    eventName: 'ApprovalForAll',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link wagmiMintExampleAbi}__ and `eventName` set to `"Transfer"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2)
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2)
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x94b40dDa4ACfDe42c7B334A60f25a0f86CE163d8)
 */
export const useWatchWagmiMintExampleTransferEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: wagmiMintExampleAbi,
    address: wagmiMintExampleAddress,
    eventName: 'Transfer',
  })
