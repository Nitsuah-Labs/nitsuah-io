 
import {
  useNetwork,
  useChainId,
  useContractRead,
  UseContractReadConfig,
  useContractWrite,
  Address,
  UseContractWriteConfig,
  usePrepareContractWrite,
  UsePrepareContractWriteConfig,
  useContractEvent,
  UseContractEventConfig,
} from 'wagmi'
import {
  ReadContractResult,
  WriteContractMode,
  PrepareWriteContractResult,
} from 'wagmi/actions'

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// WagmiMintExample
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2)
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2)
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x94b40dDa4ACfDe42c7B334A60f25a0f86CE163d8)
 */
export const wagmiMintExampleABI = [
  { stateMutability: 'nonpayable', type: 'constructor', inputs: [] },
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
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'approve',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'owner', internalType: 'address', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'getApproved',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'operator', internalType: 'address', type: 'address' },
    ],
    name: 'isApprovedForAll',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [],
    name: 'mint',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'mint',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'name',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'ownerOf',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'safeTransferFrom',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
      { name: '_data', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'safeTransferFrom',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'operator', internalType: 'address', type: 'address' },
      { name: 'approved', internalType: 'bool', type: 'bool' },
    ],
    name: 'setApprovalForAll',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'interfaceId', internalType: 'bytes4', type: 'bytes4' }],
    name: 'supportsInterface',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'symbol',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
  },
  {
    stateMutability: 'pure',
    type: 'function',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'tokenURI',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'totalSupply',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transferFrom',
    outputs: [],
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
  abi: wagmiMintExampleABI,
} as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// React
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link wagmiMintExampleABI}__.
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2)
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2)
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x94b40dDa4ACfDe42c7B334A60f25a0f86CE163d8)
 */
export function useWagmiMintExampleRead<
  TFunctionName extends string,
  TSelectData = ReadContractResult<typeof wagmiMintExampleABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<
      typeof wagmiMintExampleABI,
      TFunctionName,
      TSelectData
    >,
    'abi' | 'address'
  > & { chainId?: keyof typeof wagmiMintExampleAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractRead({
    abi: wagmiMintExampleABI,
    address:
      wagmiMintExampleAddress[chainId as keyof typeof wagmiMintExampleAddress],
    ...config,
  } as UseContractReadConfig<
    typeof wagmiMintExampleABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link wagmiMintExampleABI}__ and `functionName` set to `"balanceOf"`.
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2)
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2)
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x94b40dDa4ACfDe42c7B334A60f25a0f86CE163d8)
 */
export function useWagmiMintExampleBalanceOf<
  TFunctionName extends 'balanceOf',
  TSelectData = ReadContractResult<typeof wagmiMintExampleABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<
      typeof wagmiMintExampleABI,
      TFunctionName,
      TSelectData
    >,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof wagmiMintExampleAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractRead({
    abi: wagmiMintExampleABI,
    address:
      wagmiMintExampleAddress[chainId as keyof typeof wagmiMintExampleAddress],
    functionName: 'balanceOf',
    ...config,
  } as UseContractReadConfig<
    typeof wagmiMintExampleABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link wagmiMintExampleABI}__ and `functionName` set to `"getApproved"`.
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2)
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2)
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x94b40dDa4ACfDe42c7B334A60f25a0f86CE163d8)
 */
export function useWagmiMintExampleGetApproved<
  TFunctionName extends 'getApproved',
  TSelectData = ReadContractResult<typeof wagmiMintExampleABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<
      typeof wagmiMintExampleABI,
      TFunctionName,
      TSelectData
    >,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof wagmiMintExampleAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractRead({
    abi: wagmiMintExampleABI,
    address:
      wagmiMintExampleAddress[chainId as keyof typeof wagmiMintExampleAddress],
    functionName: 'getApproved',
    ...config,
  } as UseContractReadConfig<
    typeof wagmiMintExampleABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link wagmiMintExampleABI}__ and `functionName` set to `"isApprovedForAll"`.
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2)
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2)
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x94b40dDa4ACfDe42c7B334A60f25a0f86CE163d8)
 */
export function useWagmiMintExampleIsApprovedForAll<
  TFunctionName extends 'isApprovedForAll',
  TSelectData = ReadContractResult<typeof wagmiMintExampleABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<
      typeof wagmiMintExampleABI,
      TFunctionName,
      TSelectData
    >,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof wagmiMintExampleAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractRead({
    abi: wagmiMintExampleABI,
    address:
      wagmiMintExampleAddress[chainId as keyof typeof wagmiMintExampleAddress],
    functionName: 'isApprovedForAll',
    ...config,
  } as UseContractReadConfig<
    typeof wagmiMintExampleABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link wagmiMintExampleABI}__ and `functionName` set to `"name"`.
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2)
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2)
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x94b40dDa4ACfDe42c7B334A60f25a0f86CE163d8)
 */
export function useWagmiMintExampleName<
  TFunctionName extends 'name',
  TSelectData = ReadContractResult<typeof wagmiMintExampleABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<
      typeof wagmiMintExampleABI,
      TFunctionName,
      TSelectData
    >,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof wagmiMintExampleAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractRead({
    abi: wagmiMintExampleABI,
    address:
      wagmiMintExampleAddress[chainId as keyof typeof wagmiMintExampleAddress],
    functionName: 'name',
    ...config,
  } as UseContractReadConfig<
    typeof wagmiMintExampleABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link wagmiMintExampleABI}__ and `functionName` set to `"ownerOf"`.
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2)
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2)
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x94b40dDa4ACfDe42c7B334A60f25a0f86CE163d8)
 */
export function useWagmiMintExampleOwnerOf<
  TFunctionName extends 'ownerOf',
  TSelectData = ReadContractResult<typeof wagmiMintExampleABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<
      typeof wagmiMintExampleABI,
      TFunctionName,
      TSelectData
    >,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof wagmiMintExampleAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractRead({
    abi: wagmiMintExampleABI,
    address:
      wagmiMintExampleAddress[chainId as keyof typeof wagmiMintExampleAddress],
    functionName: 'ownerOf',
    ...config,
  } as UseContractReadConfig<
    typeof wagmiMintExampleABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link wagmiMintExampleABI}__ and `functionName` set to `"supportsInterface"`.
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2)
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2)
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x94b40dDa4ACfDe42c7B334A60f25a0f86CE163d8)
 */
export function useWagmiMintExampleSupportsInterface<
  TFunctionName extends 'supportsInterface',
  TSelectData = ReadContractResult<typeof wagmiMintExampleABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<
      typeof wagmiMintExampleABI,
      TFunctionName,
      TSelectData
    >,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof wagmiMintExampleAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractRead({
    abi: wagmiMintExampleABI,
    address:
      wagmiMintExampleAddress[chainId as keyof typeof wagmiMintExampleAddress],
    functionName: 'supportsInterface',
    ...config,
  } as UseContractReadConfig<
    typeof wagmiMintExampleABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link wagmiMintExampleABI}__ and `functionName` set to `"symbol"`.
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2)
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2)
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x94b40dDa4ACfDe42c7B334A60f25a0f86CE163d8)
 */
export function useWagmiMintExampleSymbol<
  TFunctionName extends 'symbol',
  TSelectData = ReadContractResult<typeof wagmiMintExampleABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<
      typeof wagmiMintExampleABI,
      TFunctionName,
      TSelectData
    >,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof wagmiMintExampleAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractRead({
    abi: wagmiMintExampleABI,
    address:
      wagmiMintExampleAddress[chainId as keyof typeof wagmiMintExampleAddress],
    functionName: 'symbol',
    ...config,
  } as UseContractReadConfig<
    typeof wagmiMintExampleABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link wagmiMintExampleABI}__ and `functionName` set to `"tokenURI"`.
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2)
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2)
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x94b40dDa4ACfDe42c7B334A60f25a0f86CE163d8)
 */
export function useWagmiMintExampleTokenUri<
  TFunctionName extends 'tokenURI',
  TSelectData = ReadContractResult<typeof wagmiMintExampleABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<
      typeof wagmiMintExampleABI,
      TFunctionName,
      TSelectData
    >,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof wagmiMintExampleAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractRead({
    abi: wagmiMintExampleABI,
    address:
      wagmiMintExampleAddress[chainId as keyof typeof wagmiMintExampleAddress],
    functionName: 'tokenURI',
    ...config,
  } as UseContractReadConfig<
    typeof wagmiMintExampleABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link wagmiMintExampleABI}__ and `functionName` set to `"totalSupply"`.
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2)
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2)
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x94b40dDa4ACfDe42c7B334A60f25a0f86CE163d8)
 */
export function useWagmiMintExampleTotalSupply<
  TFunctionName extends 'totalSupply',
  TSelectData = ReadContractResult<typeof wagmiMintExampleABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<
      typeof wagmiMintExampleABI,
      TFunctionName,
      TSelectData
    >,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof wagmiMintExampleAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractRead({
    abi: wagmiMintExampleABI,
    address:
      wagmiMintExampleAddress[chainId as keyof typeof wagmiMintExampleAddress],
    functionName: 'totalSupply',
    ...config,
  } as UseContractReadConfig<
    typeof wagmiMintExampleABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link wagmiMintExampleABI}__.
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2)
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2)
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x94b40dDa4ACfDe42c7B334A60f25a0f86CE163d8)
 */
export function useWagmiMintExampleWrite<
  TFunctionName extends string,
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof wagmiMintExampleAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof wagmiMintExampleABI,
          string
        >['request']['abi'],
        TFunctionName,
        TMode
      > & { address?: Address; chainId?: TChainId }
    : UseContractWriteConfig<
        typeof wagmiMintExampleABI,
        TFunctionName,
        TMode
      > & {
        abi?: never
        address?: never
        chainId?: TChainId
      } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractWrite<typeof wagmiMintExampleABI, TFunctionName, TMode>({
    abi: wagmiMintExampleABI,
    address:
      wagmiMintExampleAddress[chainId as keyof typeof wagmiMintExampleAddress],
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link wagmiMintExampleABI}__ and `functionName` set to `"approve"`.
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2)
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2)
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x94b40dDa4ACfDe42c7B334A60f25a0f86CE163d8)
 */
export function useWagmiMintExampleApprove<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof wagmiMintExampleAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof wagmiMintExampleABI,
          'approve'
        >['request']['abi'],
        'approve',
        TMode
      > & { address?: Address; chainId?: TChainId; functionName?: 'approve' }
    : UseContractWriteConfig<typeof wagmiMintExampleABI, 'approve', TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'approve'
      } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractWrite<typeof wagmiMintExampleABI, 'approve', TMode>({
    abi: wagmiMintExampleABI,
    address:
      wagmiMintExampleAddress[chainId as keyof typeof wagmiMintExampleAddress],
    functionName: 'approve',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link wagmiMintExampleABI}__ and `functionName` set to `"mint"`.
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2)
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2)
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x94b40dDa4ACfDe42c7B334A60f25a0f86CE163d8)
 */
export function useWagmiMintExampleMint<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof wagmiMintExampleAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof wagmiMintExampleABI,
          'mint'
        >['request']['abi'],
        'mint',
        TMode
      > & { address?: Address; chainId?: TChainId; functionName?: 'mint' }
    : UseContractWriteConfig<typeof wagmiMintExampleABI, 'mint', TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'mint'
      } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractWrite<typeof wagmiMintExampleABI, 'mint', TMode>({
    abi: wagmiMintExampleABI,
    address:
      wagmiMintExampleAddress[chainId as keyof typeof wagmiMintExampleAddress],
    functionName: 'mint',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link wagmiMintExampleABI}__ and `functionName` set to `"safeTransferFrom"`.
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2)
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2)
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x94b40dDa4ACfDe42c7B334A60f25a0f86CE163d8)
 */
export function useWagmiMintExampleSafeTransferFrom<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof wagmiMintExampleAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof wagmiMintExampleABI,
          'safeTransferFrom'
        >['request']['abi'],
        'safeTransferFrom',
        TMode
      > & {
        address?: Address
        chainId?: TChainId
        functionName?: 'safeTransferFrom'
      }
    : UseContractWriteConfig<
        typeof wagmiMintExampleABI,
        'safeTransferFrom',
        TMode
      > & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'safeTransferFrom'
      } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractWrite<
    typeof wagmiMintExampleABI,
    'safeTransferFrom',
    TMode
  >({
    abi: wagmiMintExampleABI,
    address:
      wagmiMintExampleAddress[chainId as keyof typeof wagmiMintExampleAddress],
    functionName: 'safeTransferFrom',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link wagmiMintExampleABI}__ and `functionName` set to `"setApprovalForAll"`.
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2)
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2)
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x94b40dDa4ACfDe42c7B334A60f25a0f86CE163d8)
 */
export function useWagmiMintExampleSetApprovalForAll<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof wagmiMintExampleAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof wagmiMintExampleABI,
          'setApprovalForAll'
        >['request']['abi'],
        'setApprovalForAll',
        TMode
      > & {
        address?: Address
        chainId?: TChainId
        functionName?: 'setApprovalForAll'
      }
    : UseContractWriteConfig<
        typeof wagmiMintExampleABI,
        'setApprovalForAll',
        TMode
      > & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'setApprovalForAll'
      } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractWrite<
    typeof wagmiMintExampleABI,
    'setApprovalForAll',
    TMode
  >({
    abi: wagmiMintExampleABI,
    address:
      wagmiMintExampleAddress[chainId as keyof typeof wagmiMintExampleAddress],
    functionName: 'setApprovalForAll',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link wagmiMintExampleABI}__ and `functionName` set to `"transferFrom"`.
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2)
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2)
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x94b40dDa4ACfDe42c7B334A60f25a0f86CE163d8)
 */
export function useWagmiMintExampleTransferFrom<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof wagmiMintExampleAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof wagmiMintExampleABI,
          'transferFrom'
        >['request']['abi'],
        'transferFrom',
        TMode
      > & {
        address?: Address
        chainId?: TChainId
        functionName?: 'transferFrom'
      }
    : UseContractWriteConfig<
        typeof wagmiMintExampleABI,
        'transferFrom',
        TMode
      > & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'transferFrom'
      } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractWrite<typeof wagmiMintExampleABI, 'transferFrom', TMode>({
    abi: wagmiMintExampleABI,
    address:
      wagmiMintExampleAddress[chainId as keyof typeof wagmiMintExampleAddress],
    functionName: 'transferFrom',
    ...config,
  } as any)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link wagmiMintExampleABI}__.
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2)
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2)
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x94b40dDa4ACfDe42c7B334A60f25a0f86CE163d8)
 */
export function usePrepareWagmiMintExampleWrite<TFunctionName extends string>(
  config: Omit<
    UsePrepareContractWriteConfig<typeof wagmiMintExampleABI, TFunctionName>,
    'abi' | 'address'
  > & { chainId?: keyof typeof wagmiMintExampleAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return usePrepareContractWrite({
    abi: wagmiMintExampleABI,
    address:
      wagmiMintExampleAddress[chainId as keyof typeof wagmiMintExampleAddress],
    ...config,
  } as UsePrepareContractWriteConfig<typeof wagmiMintExampleABI, TFunctionName>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link wagmiMintExampleABI}__ and `functionName` set to `"approve"`.
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2)
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2)
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x94b40dDa4ACfDe42c7B334A60f25a0f86CE163d8)
 */
export function usePrepareWagmiMintExampleApprove(
  config: Omit<
    UsePrepareContractWriteConfig<typeof wagmiMintExampleABI, 'approve'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof wagmiMintExampleAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return usePrepareContractWrite({
    abi: wagmiMintExampleABI,
    address:
      wagmiMintExampleAddress[chainId as keyof typeof wagmiMintExampleAddress],
    functionName: 'approve',
    ...config,
  } as UsePrepareContractWriteConfig<typeof wagmiMintExampleABI, 'approve'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link wagmiMintExampleABI}__ and `functionName` set to `"mint"`.
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2)
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2)
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x94b40dDa4ACfDe42c7B334A60f25a0f86CE163d8)
 */
export function usePrepareWagmiMintExampleMint(
  config: Omit<
    UsePrepareContractWriteConfig<typeof wagmiMintExampleABI, 'mint'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof wagmiMintExampleAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return usePrepareContractWrite({
    abi: wagmiMintExampleABI,
    address:
      wagmiMintExampleAddress[chainId as keyof typeof wagmiMintExampleAddress],
    functionName: 'mint',
    ...config,
  } as UsePrepareContractWriteConfig<typeof wagmiMintExampleABI, 'mint'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link wagmiMintExampleABI}__ and `functionName` set to `"safeTransferFrom"`.
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2)
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2)
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x94b40dDa4ACfDe42c7B334A60f25a0f86CE163d8)
 */
export function usePrepareWagmiMintExampleSafeTransferFrom(
  config: Omit<
    UsePrepareContractWriteConfig<
      typeof wagmiMintExampleABI,
      'safeTransferFrom'
    >,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof wagmiMintExampleAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return usePrepareContractWrite({
    abi: wagmiMintExampleABI,
    address:
      wagmiMintExampleAddress[chainId as keyof typeof wagmiMintExampleAddress],
    functionName: 'safeTransferFrom',
    ...config,
  } as UsePrepareContractWriteConfig<
    typeof wagmiMintExampleABI,
    'safeTransferFrom'
  >)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link wagmiMintExampleABI}__ and `functionName` set to `"setApprovalForAll"`.
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2)
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2)
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x94b40dDa4ACfDe42c7B334A60f25a0f86CE163d8)
 */
export function usePrepareWagmiMintExampleSetApprovalForAll(
  config: Omit<
    UsePrepareContractWriteConfig<
      typeof wagmiMintExampleABI,
      'setApprovalForAll'
    >,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof wagmiMintExampleAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return usePrepareContractWrite({
    abi: wagmiMintExampleABI,
    address:
      wagmiMintExampleAddress[chainId as keyof typeof wagmiMintExampleAddress],
    functionName: 'setApprovalForAll',
    ...config,
  } as UsePrepareContractWriteConfig<
    typeof wagmiMintExampleABI,
    'setApprovalForAll'
  >)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link wagmiMintExampleABI}__ and `functionName` set to `"transferFrom"`.
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2)
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2)
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x94b40dDa4ACfDe42c7B334A60f25a0f86CE163d8)
 */
export function usePrepareWagmiMintExampleTransferFrom(
  config: Omit<
    UsePrepareContractWriteConfig<typeof wagmiMintExampleABI, 'transferFrom'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof wagmiMintExampleAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return usePrepareContractWrite({
    abi: wagmiMintExampleABI,
    address:
      wagmiMintExampleAddress[chainId as keyof typeof wagmiMintExampleAddress],
    functionName: 'transferFrom',
    ...config,
  } as UsePrepareContractWriteConfig<
    typeof wagmiMintExampleABI,
    'transferFrom'
  >)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link wagmiMintExampleABI}__.
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2)
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2)
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x94b40dDa4ACfDe42c7B334A60f25a0f86CE163d8)
 */
export function useWagmiMintExampleEvent<TEventName extends string>(
  config: Omit<
    UseContractEventConfig<typeof wagmiMintExampleABI, TEventName>,
    'abi' | 'address'
  > & { chainId?: keyof typeof wagmiMintExampleAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractEvent({
    abi: wagmiMintExampleABI,
    address:
      wagmiMintExampleAddress[chainId as keyof typeof wagmiMintExampleAddress],
    ...config,
  } as UseContractEventConfig<typeof wagmiMintExampleABI, TEventName>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link wagmiMintExampleABI}__ and `eventName` set to `"Approval"`.
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2)
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2)
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x94b40dDa4ACfDe42c7B334A60f25a0f86CE163d8)
 */
export function useWagmiMintExampleApprovalEvent(
  config: Omit<
    UseContractEventConfig<typeof wagmiMintExampleABI, 'Approval'>,
    'abi' | 'address' | 'eventName'
  > & { chainId?: keyof typeof wagmiMintExampleAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractEvent({
    abi: wagmiMintExampleABI,
    address:
      wagmiMintExampleAddress[chainId as keyof typeof wagmiMintExampleAddress],
    eventName: 'Approval',
    ...config,
  } as UseContractEventConfig<typeof wagmiMintExampleABI, 'Approval'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link wagmiMintExampleABI}__ and `eventName` set to `"ApprovalForAll"`.
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2)
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2)
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x94b40dDa4ACfDe42c7B334A60f25a0f86CE163d8)
 */
export function useWagmiMintExampleApprovalForAllEvent(
  config: Omit<
    UseContractEventConfig<typeof wagmiMintExampleABI, 'ApprovalForAll'>,
    'abi' | 'address' | 'eventName'
  > & { chainId?: keyof typeof wagmiMintExampleAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractEvent({
    abi: wagmiMintExampleABI,
    address:
      wagmiMintExampleAddress[chainId as keyof typeof wagmiMintExampleAddress],
    eventName: 'ApprovalForAll',
    ...config,
  } as UseContractEventConfig<typeof wagmiMintExampleABI, 'ApprovalForAll'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link wagmiMintExampleABI}__ and `eventName` set to `"Transfer"`.
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2)
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2)
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x94b40dDa4ACfDe42c7B334A60f25a0f86CE163d8)
 */
export function useWagmiMintExampleTransferEvent(
  config: Omit<
    UseContractEventConfig<typeof wagmiMintExampleABI, 'Transfer'>,
    'abi' | 'address' | 'eventName'
  > & { chainId?: keyof typeof wagmiMintExampleAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractEvent({
    abi: wagmiMintExampleABI,
    address:
      wagmiMintExampleAddress[chainId as keyof typeof wagmiMintExampleAddress],
    eventName: 'Transfer',
    ...config,
  } as UseContractEventConfig<typeof wagmiMintExampleABI, 'Transfer'>)
}
