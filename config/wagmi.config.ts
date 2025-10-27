import { defineConfig, loadEnv } from '@wagmi/cli'
import { etherscan, react } from '@wagmi/cli/plugins'
import * as chains from 'wagmi/chains'

export default defineConfig(() => {
  const env = loadEnv({
    mode: process.env.NODE_ENV,
    envDir: process.cwd(),
  })
  const plugins = [] as any[];

  // Only add the etherscan plugin when an API key is provided. On CI (e.g.
  // Netlify preview builds) the API key may not be set which caused the
  // generator to exit with an error. Guarding prevents the build from failing
  // unexpectedly. If you need the plugin in CI, set ETHERSCAN_API_KEY in the
  // environment.
  if (process.env.ETHERSCAN_API_KEY) {
    plugins.push(
      etherscan({
        apiKey: process.env.ETHERSCAN_API_KEY,
        chainId: chains.mainnet.id,
        contracts: [
          {
            name: 'WagmiMintExample',
            address: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2',
          },
        ],
      })
    );
  } else {
    // eslint-disable-next-line no-console
    console.warn(
      '[wagmi] ETHERSCAN_API_KEY is not set — skipping etherscan plugin for codegen.'
    );
  }

  // Always include the react plugin to generate hooks for local development.
  plugins.push(react());

  return {
    out: 'src/generated.ts',
    contracts: [],
    plugins,
  };
})
