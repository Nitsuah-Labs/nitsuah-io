# Project Architecture

This document provides a comprehensive overview of the `nitsuah-io` project architecture, including the technology stack, project structure, and key components.

## Technology Stack

- **Framework:** [Next.js](https://nextjs.org/) 14 (App Router)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Web3:**
  - [wagmi](https://wagmi.sh/) v2
  - [viem](https://viem.sh/) v2
  - [@tanstack/react-query](https://tanstack.com/query/v4/docs/react/overview)
- **UI:**
  - [React](https://reactjs.org/) 18
  - [Material-UI](https://mui.com/)
  - [Emotion](https://emotion.sh/)
- **3D Graphics:** [@splinetool/react-spline](https://github.com/splinetool/spline-react)
- **Linting & Formatting:**
  - [ESLint](https://eslint.org/)
  - [Prettier](https://prettier.io/)
- **Testing:**
  - [Jest](https://jestjs.io/)
  - [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- **Deployment:** [Netlify](https://www.netlify.com/)
- **CI/CD:** [GitHub Actions](https://github.com/features/actions)

## Project Structure

The project is organized into the following key directories:

- **`config/`**: Centralized configuration files for Jest, ESLint, Prettier, and wagmi.
- **`docs/`**: Project documentation, including this file and `CONTRIBUTING.md`.
- **`public/`**: Static assets, including images, fonts, and JSON data.
- **`src/`**: The main application source code.
  - **`app/`**: The Next.js App Router, containing all pages and components.
    - **`_components/`**: Shared React components.
      - **`_labs/`**: Components specific to the "Labs" section.
      - **`_site/`**: Components for the main site layout (header, footer, etc.).
      - **`_spline/`**: Spline 3D scene components.
      - **`_styles/`**: Global and component-specific CSS files.
      - **`_web3/`**: Web3-related components (wallet connection, network switching, etc.).
    - **`[page]/`**: Individual pages for the site.
  - **`generated.ts`**: Auto-generated wagmi hooks.
  - **`wagmi.ts`**: wagmi configuration.

## Key Components & Systems

### Web3 Integration

The Web3 functionality is built around the `wagmi` and `viem` libraries.

- **`src/wagmi.ts`**: This file configures the wagmi client, defining the supported chains, connectors, and transports.
- **`src/app/providers.tsx`**: This component wraps the application in the necessary `WagmiProvider` and `QueryClientProvider`, making the wagmi hooks available throughout the app.
- **`src/app/_components/_web3/`**: This directory contains the core Web3 UI components, such as `Connect`, `Account`, `NetworkSwitcher`, and `MintNFT`. The `Connect` component features wallet logos, loading spinners, and install prompts for better UX.
- **`src/app/_components/_web3/_assets/wallets/`**: SVG wallet icons for MetaMask, Coinbase Wallet, WalletConnect, Safe, and Injected connectors.
- **`src/app/profile/`**: Full wallet dashboard displaying connected address, ENS name, balance, network, and account management.
- **`src/app/labs/`**: The "Labs" pages (`domains`, `register`, `mint`, etc.) demonstrate complex smart contract interactions using wagmi hooks with custom ABIs.

### Configuration

All major configuration files have been centralized in the `config/` directory to keep the project root clean. The `package.json` scripts have been updated to reference these new paths.

### CI/CD

The project uses GitHub Actions for continuous integration. The workflow is defined in `.github/workflows/ci.yml` and includes the following steps:

1.  **Checkout:** Checks out the code.
2.  **Setup Node:** Sets up the specified Node.js version.
3.  **Install Dependencies:** Installs the project dependencies.
4.  **Lint:** Runs ESLint to check for code quality issues.
5.  **Typecheck:** Runs the TypeScript compiler to check for type errors.
6.  **Build:** Builds the Next.js application.

### Deployment

The site is deployed to Netlify. The `netlify.toml` file in the project root configures the build settings, including the build command, publish directory, and environment variables.

## Status

**Last Updated:** November 1, 2025

### Production Ready ✅

- ✅ Next.js 14 App Router with TypeScript
- ✅ wagmi v2 + viem v2 Web3 integration with enhanced wallet UX
- ✅ Modern wallet connection (icons, loading states, install prompts)
- ✅ Profile page with full wallet dashboard
- ✅ Labs header with connected wallet display
- ✅ Comprehensive test suite (Jest, Playwright, accessibility)
- ✅ CI/CD with GitHub Actions + Netlify deployment
- ✅ Optimized git hooks (Husky + lint-staged)
- ✅ Interactive homepage with scroll-to-reveal design
- ✅ Labs section with Web3 experiments
- ✅ Responsive design with accessibility compliance
- ✅ Security hardened (0 moderate/high vulnerabilities)
