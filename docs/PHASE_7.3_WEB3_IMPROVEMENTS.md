# Phase 7.3: Web3 & Wallet Improvements

**Created:** October 31, 2025  
**Status:** Planning  
**Focus:** Web3/Wallet UX, Debugging, and Modern Best Practices

---

## Overview

Phase 7.3 focuses on improving the Web3 wallet integration, debugging connection flows, and implementing modern wallet UX patterns. The site is solid overall - this phase polishes the Labs section and wallet experiences.

## Current State Assessment

### ✅ What's Working Well

- **Wagmi v2 + Viem v2**: Modern Web3 stack properly configured
- **Multiple Connectors**: MetaMask, WalletConnect, Coinbase Wallet, Safe
- **Chain Support**: Mainnet, Polygon, Sepolia, Polygon Amoy, Mumbai (custom)
- **Component Architecture**: Clean separation (`Connect`, `Connected`, `Account`, `MintNFT`, `NetworkSwitcher`)
- **Test Coverage**: 93.45% on Web3 components with Jest + Playwright E2E
- **SSR Safety**: Proper client-side guards for Web3 initialization

### 🔍 Areas for Improvement

1. **Wallet Connection UX** - Simplify multi-step flows
2. **Error Handling** - Better user feedback for connection failures
3. **Profile Page** - Currently placeholder, needs wallet info display
4. **Network Switching** - Auto-detect and prompt for correct network
5. **Wallet Detection** - Guide users to install wallets if missing
6. **Labs Header** - Show connected wallet status
7. **Contract Interaction** - Debug MintNFT and Register flows locally

---

## Phase 7.3 Objectives

### 🎯 Priority 1: Core Wallet UX

#### 1.1 Modern Wallet Selector Pattern
**Current:** Basic button list with connector names  
**Target:** Modern modal/dropdown with wallet logos and better UX

**Tasks:**
- [ ] Research wagmi v2 best practices for wallet selection
- [ ] Add wallet logos to Connect component
- [ ] Implement modal/dropdown UI for wallet selection
- [ ] Add loading states and animations
- [ ] Handle wallet not installed → redirect to download

**Files to modify:**
- `src/app/_components/_web3/Connect.tsx`
- New: `src/app/_components/_web3/WalletModal.tsx` (optional)

#### 1.2 Auto-Detect Wallet & Network
**Current:** Manual network switching required  
**Target:** Auto-detect wrong network and prompt switch

**Tasks:**
- [ ] Add `useEffect` to detect current chain vs expected chain
- [ ] Show toast/modal when user on wrong network
- [ ] Auto-trigger `switchChain` with user confirmation
- [ ] Handle cases where network not available in wallet

**Files to modify:**
- `src/app/labs/register/page.tsx`
- `src/app/labs/mint/page.tsx`
- `src/app/_components/_web3/NetworkSwitcher.tsx`

#### 1.3 Wallet Not Installed Flow
**Current:** Buttons show "not available" but no guidance  
**Target:** Detect missing wallet → show install instructions

**Tasks:**
- [ ] Check `window.ethereum` before showing connectors
- [ ] If no injected provider detected, show "Install Wallet" card
- [ ] Link to MetaMask, Coinbase Wallet download pages
- [ ] Add mobile wallet deep links (WalletConnect QR)

**Files to modify:**
- `src/app/_components/_web3/Connect.tsx`
- `src/app/labs/register/page.tsx` (Step 1 improvements)

---

### 🎯 Priority 2: Profile Page Implementation

#### 2.1 Profile Page Layout
**Current:** Placeholder with "PROFILE PAGE" text  
**Target:** Full wallet dashboard

**Features to add:**
- [ ] Connected wallet address with ENS name
- [ ] Copy address button with toast feedback
- [ ] Network badge (current chain)
- [ ] Balance display (ETH/MATIC)
- [ ] Disconnect button
- [ ] Link to PolygonScan/Etherscan for address

**Files to modify:**
- `src/app/profile/page.tsx`
- New: `src/app/profile/profile.css` (optional)

#### 2.2 Labs Header Wallet Display
**Current:** Profile button (no wallet info)  
**Target:** Show connected wallet in labs header

**Tasks:**
- [ ] Add `<Connected>` wrapper to LabNav
- [ ] Show truncated address when connected (0x1234...5678)
- [ ] Click address → copy or go to profile
- [ ] Visual indicator (green dot) for connected state

**Files to modify:**
- `src/app/_components/_labs/LabNav.tsx`

---

### 🎯 Priority 3: Contract Interaction Debugging

#### 3.1 Local Development Setup
**Goal:** Test minting and registration locally without deploying

**Tasks:**
- [ ] Set up local Hardhat/Anvil node with forked Mumbai
- [ ] Deploy test contracts to local network
- [ ] Update `.env.local` with local contract addresses
- [ ] Document local dev setup in DEVELOPER_GUIDE.md

**New scripts to add:**
- `npm run chain:start` - Start local blockchain
- `npm run chain:deploy` - Deploy contracts locally
- `npm run chain:stop` - Stop local blockchain

#### 3.2 MintNFT Component Debugging
**Current:** Relies on mainnet contract, may have stale codegen  
**Target:** Working mint flow with proper error handling

**Tasks:**
- [ ] Verify `src/generated.ts` is up to date (`npm run wagmi`)
- [ ] Add error boundaries for contract call failures
- [ ] Show transaction status (pending → success → confirmed)
- [ ] Add link to view transaction on explorer
- [ ] Handle gas estimation errors gracefully

**Files to modify:**
- `src/app/_components/_web3/MintNFT.tsx`
- `config/wagmi.config.ts` (verify contract addresses)

#### 3.3 Register Component Debugging
**Current:** 3-step flow with manual network switching  
**Target:** Streamlined registration with better feedback

**Tasks:**
- [ ] Combine wallet setup and connect into single step
- [ ] Auto-switch to Mumbai when user connects
- [ ] Show gas estimate before registration
- [ ] Add success modal with transaction link
- [ ] Handle registration errors (out of gas, user rejected)

**Files to modify:**
- `src/app/labs/register/page.tsx`

---

### 🎯 Priority 4: Error Handling & User Feedback

#### 4.1 Toast Notification System
**Current:** Inline error messages  
**Target:** Toast notifications for wallet actions

**Tasks:**
- [ ] Install `react-hot-toast` or use MUI Snackbar
- [ ] Create toast wrapper component
- [ ] Show toasts for: wallet connected, disconnected, network switched, transaction submitted, transaction confirmed
- [ ] Error toasts with retry actions

**New files:**
- `src/app/_components/_web3/Toast.tsx`
- `src/app/_components/_web3/ToastProvider.tsx`

#### 4.2 Loading States
**Current:** Basic "connecting..." text  
**Target:** Skeleton loaders and spinners

**Tasks:**
- [ ] Add skeleton loader for wallet connection
- [ ] Spinner for transaction pending
- [ ] Progress indicator for multi-step flows
- [ ] Disable buttons during loading (prevent double-clicks)

**Files to modify:**
- All Web3 components (`Connect.tsx`, `MintNFT.tsx`, etc.)

---

### 🎯 Priority 5: Testing & Documentation

#### 5.1 E2E Test Improvements
**Current:** Basic wallet connection tests with mocks  
**Target:** Comprehensive E2E coverage

**Tasks:**
- [ ] Add tests for wallet not installed flow
- [ ] Test network switching flow
- [ ] Test mint NFT flow end-to-end
- [ ] Test registration flow with form validation
- [ ] Visual regression tests for new components

**Files to modify:**
- `tests/e2e/labs/wallet-connection.spec.ts`
- New: `tests/e2e/labs/mint-flow.spec.ts`
- New: `tests/e2e/labs/register-flow.spec.ts`

#### 5.2 Documentation Updates
**Tasks:**
- [ ] Update DEVELOPER_GUIDE.md with local Web3 dev setup
- [ ] Document wallet connector configuration
- [ ] Add troubleshooting guide for common wallet issues
- [ ] Document contract deployment process

**Files to modify:**
- `docs/DEVELOPER_GUIDE.md`
- `docs/ARCHITECTURE.md` (Web3 Integration section)
- New: `docs/WEB3_TROUBLESHOOTING.md`

---

## Implementation Plan


### Week 3: Contract Debugging

- [ ] Day 1-2: Local dev setup with Hardhat
- [ ] Day 3-4: Debug MintNFT component
- [ ] Day 5: Debug Register component

### Week 4: Polish & Testing
 
- [ ] Day 2: Toast notifications
- [ ] Day 3: Loading states
- [ ] Day 4-5: E2E tests and documentation

---

## Success Metrics

- [ ] Wallet connection flow takes < 3 clicks
- [ ] Zero "not available" states for popular wallets
- [ ] Auto-network switching works 100% of time
- [ ] Profile page shows all wallet info correctly
- [ ] Mint NFT succeeds on first try (local testnet)
- [ ] Registration succeeds on first try (local testnet)
- [ ] 100% E2E test coverage for wallet flows
- [ ] All Playwright tests passing

---

## Technical Debt to Address

1. **Security Vulnerabilities**: 21 vulnerabilities (18 low, 3 moderate)
   - [ ] Run `npm audit fix` to auto-fix compatible issues
   - [ ] Review remaining vulnerabilities for manual updates
   - [ ] Document any vulnerabilities that can't be fixed (waiting on upstream)
   - [ ] Consider `npm audit fix --force` if safe (test thoroughly)

2. **Mumbai Deprecation**: Mumbai testnet is deprecated, migrate to Polygon Amoy
   - Update all contract references
   - Update documentation
   - Update faucet links

3. **Wagmi Codegen**: Ensure `npm run wagmi` runs in CI without API key
   - Already handled with env check, but document this

4. **Wallet Logos**: Need to add wallet logo assets
   - MetaMask, Coinbase Wallet, WalletConnect, Safe logos
   - Store in `src/app/_components/_web3/_assets/wallets/`

5. **Type Safety**: MintNFT has `any` casts to avoid deep type instantiation
   - Investigate proper typing for wagmi hooks

---

## Future Enhancements (Post-7.3)

- [ ] Multi-wallet support (connect multiple wallets)
- [ ] Wallet analytics (track connection rates)
- [ ] Sign-in with Ethereum (SIWE)
- [ ] ENS avatar display in profile
- [ ] Transaction history view
- [ ] Gas price indicator
- [ ] Batch transactions
- [ ] Hardware wallet support (Ledger, Trezor)

---

## Resources

### Wagmi v2 Documentation

- [Wagmi Docs](https://wagmi.sh/)
- [Wagmi Examples](https://github.com/wevm/wagmi/tree/main/examples)
- [Viem Docs](https://viem.sh/)

### Wallet Integration Guides

- [MetaMask Docs](https://docs.metamask.io/)
- [WalletConnect v2](https://docs.walletconnect.com/)
- [Coinbase Wallet SDK](https://docs.cloud.coinbase.com/wallet-sdk/docs)

### Testing

- [Playwright Web3 Testing](https://playwright.dev/)
- [Synpress (MetaMask E2E)](https://github.com/Synthetixio/synpress)

### Local Development

- [Hardhat](https://hardhat.org/)
- [Anvil (Foundry)](https://book.getfoundry.sh/anvil/)
- [Tenderly Forks](https://tenderly.co/)

---

## Notes

- All Web3 components already have proper SSR guards (`"use client"`)
- WalletConnect project ID is hardcoded, consider moving to env var
- Current contract addresses are for mainnet, need testnet versions for local dev
- Test helpers (`?testHelpers=1`) are great for E2E, keep this pattern
- Profile page TODO comment needs to be addressed
- Consider adding Privy or Dynamic.xyz for even simpler wallet UX (future)

---

## Questions to Explore

1. Should we add a "Wallet Manager" context to share state across pages?
2. Do we want to persist wallet connection across page refreshes?
3. Should we show a "Connect Wallet" CTA in the main site header?
4. Do we need multi-chain support or focus on Polygon only?
5. Should we add a "Demo Mode" for users without wallets?
6. Do we want to track wallet analytics (connection rates, popular wallets)?
7. Should we add a "Disconnect All" button in profile?
8. Do we need a migration guide for Mumbai → Amoy?

---

**Ready to start implementation!** 🚀

Next steps:

1. Review this plan
2. Prioritize items based on user feedback
3. Set up local Web3 dev environment
4. Start with Priority 1 (Core Wallet UX)
