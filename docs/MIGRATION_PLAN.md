# Web3 Stack Migration Plan: wagmi v2 + viem v2

This document outlines the steps to migrate the codebase from wagmi v1 and viem v1 to their respective v2 versions.

**Branch**: `web3/migrate-pilot` (and subsequent branches)
**Epic**: Upgrade Web3 stack to resolve security vulnerabilities and stay current.

---

## Phase 1: Repo Scan & Analysis (COMPLETE)

A repo-wide scan was performed to identify all files using wagmi v1 APIs.

---

## Phase 2: Migration Checklist

### Core Infrastructure
- [ ] **`package.json`**:
  - [ ] Bump `wagmi` to `^2.x`
  - [ ] Bump `viem` to `^2.x`
  - [ ] Bump `@wagmi/cli` to `^2.x`
  - [ ] Remove `wagmi/actions` if it's a separate dependency.
- [ ] **`wagmi.config.ts`**:
  - [ ] Update config to be compatible with `@wagmi/cli` v2. The structure and plugins might have changed.
- [ ] **`src/generated.ts`**:
  - [ ] Delete the old file.
  - [ ] Regenerate using the new `@wagmi/cli` v2. The new file will export different hooks (e.g., `useReadWagmiMintExample`, not `useWagmiMintExampleRead`).
- [ ] **`src/wagmi.ts`**:
  - [ ] Replace `createConfig` and `configureChains` from wagmi v1.
  - [ ] Implement new `createConfig` using `http` transports from viem.
  - [ ] Define chains (e.g., `mainnet`, `sepolia`) from `viem/chains`.
- [ ] **`src/app/providers.tsx`**:
  - [ ] Update the `WagmiProvider` component and pass the new v2 `config` object.
  - [ ] Add `QueryClientProvider` as it's now a required peer dependency for wagmi v2.

### Component Migration

- [ ] **`src/app/_components/_web3/MintNFT.tsx` (PILOT)**:
  - [ ] Replace `useWagmiMintExamplePrepareMint` with `useSimulateContract`.
  - [ ] Replace `useWagmiMintExampleMint` with `useWriteContract`.
  - [ ] Replace `useWaitForTransaction` with `useWaitForTransactionReceipt`.
  - [ ] Update hook arguments and return values based on v2 API.
- [ ] **`src/app/_components/_web3/Account.tsx`**:
  - [ ] `useAccount`: Check for breaking changes.
  - [ ] `useBalance`: Check for breaking changes.
  - [ ] `useEnsName`: Check for breaking changes.
- [ ] **`src/app/_components/_web3/Connect.tsx`**:
  - [ ] `useConnect`: Check for breaking changes, especially with `connectors`.
  - [ ] `useAccount`: Check for breaking changes.
- [ ] **`src/app/_components/_web3/Connected.tsx`**:
  - [ ] `useAccount`: Check for breaking changes.
  - [ ] `useDisconnect`: Check for breaking changes.
  - [ ] `useEnsAvatar`: Check for breaking changes.
  - [ ] `useEnsName`: Check for breaking changes.
- [ ] **`src/app/_components/_web3/NetworkSwitcher.tsx`**:
  - [ ] `useNetwork`: Check for breaking changes.
  - [ ] `useSwitchNetwork`: Check for breaking changes.
- [ ] **`src/app/labs/domains/page.tsx`**:
  - [ ] This page uses raw `useContractRead`/`Write` with custom ABIs.
  - [ ] Migrate to `useReadContract` and `useWriteContract`.
  - [ ] Update how ABIs are passed and how data is fetched.
- [ ] **`src/app/labs/register/page.tsx`**:
  - [ ] Similar to the domains page, migrate to v2 hooks.

---

## Phase 3: Testing

- [ ] **Local Build**: Ensure `npm run build` completes successfully after migration.
- [ ] **Local Testing**:
  - [ ] Connect wallet.
  - [ ] Mint an NFT.
  - [ ] Switch networks.
  - [ ] View account details.
  - [ ] Test domain/register lab pages.
- [ ] **CI/CD**: Push to a PR to ensure Netlify preview builds and deploys correctly.

---
