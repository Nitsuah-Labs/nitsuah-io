# nitsuah.io portfolio

This is a [Next.js](https://nextjs.org) + [wagmi](https://wagmi.sh) + [@wagmi/cli](https://wagmi.sh/cli) project bootstrapped with [`create-wagmi`](https://github.com/wagmi-dev/wagmi/tree/main/packages/create-wagmi)

This template demonstrates usage of the [`@wagmi/cli` Etherscan Plugin](https://wagmi.sh/cli/plugins/etherscan).

## Getting Started

Run `npm run dev` in your terminal, and then open [localhost:3000](http://localhost:3000) in your browser.

This command will also generate React Hooks from the Wagmi Mint Example Etherscan contract (e.g. `useWagmiMintExampleTotalSupply`, `useWagmiMintExampleBalanceOf`, etc) for you to use in your project.

Once the webpage has loaded, changes made to files inside the `src/` directory (e.g. `src/pages/index.tsx`) will automatically update the webpage.

### Using this Repo

- Deploy contract & update "src/pages/labs/utils/contractABI.json" file
- Update CONTRACT_ADDRESS in "src/pages/labs/domainsite.jsx"
- Commit & Push, or Merge to dev & main branches to publish <https://nitsuah.io> automatically like <https://dev.nitsuah.io>
- Run `npm run dev` locally to get started
- [![Netlify Status](https://api.netlify.com/api/v1/badges/b018ed24-0ef6-4846-9549-cccfc84e29b4/deploy-status)](https://app.netlify.com/sites/nitsuah-io/deploys)

### Learn more

To learn more about [Next.js](https://nextjs.org) or [wagmi](https://wagmi.sh), check out the following resources:

- [wagmi Documentation](https://wagmi.sh) – learn about wagmi Hooks and API.
- [wagmi Examples](https://wagmi.sh/examples/connect-wallet) – a suite of simple examples using wagmi.
- [@wagmi/cli Documentation](https://wagmi.sh/cli) – learn more about the wagmi CLI.
- [Next.js Documentation](https://nextjs.org/docs) learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
