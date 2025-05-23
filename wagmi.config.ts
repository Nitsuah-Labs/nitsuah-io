import { defineConfig, loadEnv } from '@wagmi/cli'
import { etherscan, react } from '@wagmi/cli/plugins'
import * as chains from 'wagmi/chains'

export default defineConfig(() => {
  const env = loadEnv({
    mode: process.env.NODE_ENV,
    envDir: process.cwd(),
  })
  return {
    out: 'src/generated.ts',
    contracts: [],
    plugins: [
      etherscan({
        apiKey: process.env.ETHERSCAN_API_KEY!,
        chainId: chains.mainnet.id,
        contracts: [
          {
            name: 'WagmiMintExample',
            address: {
              [chains.mainnet.id]: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2',
              [chains.goerli.id]: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2',
              [chains.polygonMumbai.id]: '0x94b40dDa4ACfDe42c7B334A60f25a0f86CE163d8',
            },
          },
        ],
      }),
      react(),
    ],
  }
})
