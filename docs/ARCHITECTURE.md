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
- **`src/app/_components/_web3/`**: This directory contains the core Web3 UI components, such as `Connect`, `Account`, and `NetworkSwitcher`.
- **`src/app/labs/`**: The "Labs" pages (`domains`, `register`, etc.) demonstrate more complex smart contract interactions, using wagmi hooks with custom ABIs.

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

## Next Phase of Work

With the wagmi v2 migration complete and the project structure cleaned up, the next phase of work should focus on improving the project's robustness and developer experience.

### 1. Enhance Testing

- **Increase Test Coverage:** Write additional unit and integration tests for the Web3 components, focusing on the `domains` and `register` pages.
- **End-to-End Testing:** Implement end-to-end tests using a framework like [Cypress](https://www.cypress.io/) or [Playwright](https://playwright.dev/) to simulate user interactions with the Web3 functionality.

### 2. Improve CI/CD

- **Add Testing to CI:** Add a step to the GitHub Actions workflow to run the Jest test suite on every push and pull request.
- **Automate Lighthouse Checks:** Integrate [Lighthouse CI](https://github.com/GoogleChrome/lighthouse-ci) into the workflow to automatically check for performance, accessibility, and SEO regressions.

### 3. Refine Developer Experience

- **Storybook:** Implement [Storybook](https://storybook.js.org/) to create a component library, allowing for isolated development and testing of UI components.
- **Husky Pre-Commit Hooks:** Configure [Husky](https://typicode.github.io/husky/#/) to run linting, formatting, and tests before allowing a commit, ensuring that only high-quality code is committed to the repository.
