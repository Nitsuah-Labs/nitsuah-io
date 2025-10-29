# FEEDBACK

- home - the spline component is now TOO small. it should take up 100% of the width and the height should fall behind the header/nav bar and the footer. currently it looks like a tiny box in the middle of the screen.

- about me - the spline component is good here! i also like the about me text in the header when we're on that page. but when the window is sized smaller the nav bar text covers the about me text. they should not overlap and the about me can be moved to the top right of the bar if needed when the window is smaller. but otherwise this is a great & simple page.

- resume should match some of the formatting of the overall site. the white background with black text is jarring compared to the rest of the site. maybe a dark mode toggle for the resume page? or a different color scheme that matches the rest of the site better? we'll come back to this for more updates but fixing that (and having the header/footer) would be a good start to keep unity.

- crypto - this is PERFECT. exactly what i am looking for in improvements. we can even tone down the heading in the body and simplify it like about me has in the header/nav bar. but this is great.

- projects - this is getting better. but the icons should be smaller for the lower project section. also the text should be aligned better. right now the text is somewhat centered under the icons. it should be best practiced centered so it can adjust dynamically for screen sizes. also the spacing between the two sections should be larger. (so each row has space from the row below it) maybe add a dividing line or something to separate them more clearly. - reorganize the list into an order that makes sense (with less impressive or older projects at the bottom) - also the project descriptions should be a bit more concise. they are too long right now and take away from the overall look of the page. some of them are good though, but others duplicate the keywords too much or are just too wordy.

- LABS - labs/
- this needs the most work. 
- first is that the entire app looks like its inside another app. there is a white border around everything and it looks like a box inside the page. this should be removed so the app takes up the full width of the page with no borders.
- second the header/footer should be standardized on these pages as well to keep unity across the site. its close, but might miss some of our other improvements we made on main. 
- register - looks better. but the connect a wallet button or injection is still broken. idk what thje current or supported best practices are for web3 wallet connections but this is not working currently.
- footer - the footer should be fixed to the bottom of the page so if there is not much content it still stays at the bottom. right now its floating in the middle of the screen if there is not much content.
- header - missing links to other parts of the labs site. should have links in the nav bar like the rest of the site. with matching header page names when navigating as well.
- landplot - just shows connect your wallet and nothing else. i have 2 wallets connected. coinbase wallet and phantom for anything solana. but neither gets a prompt to connect to the site.
"Connecteddeploy-preview-121--nitsuah-io.netlify.app
Your wallet isn't connected to this site. If it's a crypto dapp, you should see a “Connect Wallet” button. Click it to connect."



tests/e2e/labs/wallet-connection.spec.ts
Comment on lines +11 to +26
    await page.addInitScript(() => {
      (window as any).ethereum = {
        isMetaMask: true,
        request: async ({ method }: { method: string }) => {
          if (method === "eth_requestAccounts") {
            return ["0x1234567890123456789012345678901234567890"];
          }
          if (method === "eth_chainId") {
            return "0x1"; // Mainnet
          }
          return null;
        },
        on: () => {},
        removeListener: () => {},
      };
    });
Copilot AI
8 minutes ago
The wallet mock is hardcoded in each test. Consider extracting this to a reusable utility function in tests/utils/wallet-mock.ts to avoid duplication and make it easier to maintain across multiple test files.

Copilot uses AI. Check for mistakes.
@nitsuah	Reply...
src/wagmi.ts
Comment on lines +11 to +29
// Mumbai testnet (deprecated but contracts still deployed there)
// Define custom chain since it's removed from wagmi/chains
export const polygonMumbai = defineChain({
  id: 80001,
  name: "Polygon Mumbai Testnet",
  nativeCurrency: { name: "MATIC", symbol: "MATIC", decimals: 18 },
  rpcUrls: {
    default: {
      # FEEDBACK

      Home

      - The spline component is now TOO small. It should take up 100% of the width and the height should fall behind the header/nav bar and the footer. Currently it looks like a small box in the middle of the screen.

      About me

      - The spline component is good here and I like the about text in the header for that page. When the window is smaller the nav bar text can overlap the about text; they should not overlap. Consider moving the about text into the top-right of the bar for smaller windows.

      Resume

      - The resume should match the overall site styling. The white background with black text is jarring compared to the rest of the site. Consider a dark-mode or adjusted color scheme and add header/footer for consistency.

      Crypto

      - This page looks good.

      Projects

      - Icons in the lower project section should be smaller. Text alignment should be adjusted so descriptions are centered responsively. Increase spacing between rows and consider a dividing line for clarity. Reorder projects by relevance/recency and shorten descriptions where needed.

      LABS (labs/)

      - This section needs the most work.

      - The app currently appears inside a white bordered box. Remove that border so the app occupies the full page width.

      - Standardize header/footer on Labs pages for visual unity with the rest of the site.

      - Register: connect wallet flow still seems broken; investigate web3 wallet connection best-practices and wallet injection.

      - Footer: ensure the footer is fixed to the bottom when content is short.

      - Header: add links to other parts of the labs site and match header names when navigating.

      - Landplot: shows 'connect your wallet' with no prompt for Coinbase Wallet or Phantom. Investigate multi-wallet support.

      Example wallet mock used in tests (for reference)

      ```ts
      await page.addInitScript(() => {
        (window as any).ethereum = {
          isMetaMask: true,
          request: async ({ method }: { method: string }) => {
            if (method === "eth_requestAccounts") {
              return ["0x1234567890123456789012345678901234567890"];
            }
            if (method === "eth_chainId") {
              return "0x1"; // Mainnet
            }
            return null;
          },
          on: () => {},
          removeListener: () => {},
        };
      });
      ```

      Notes and suggestions

      - Consider extracting the wallet mock into `tests/utils/wallet-mock.ts` to avoid duplication.
      - Consider migrating from Polygon Mumbai testnet to Polygon Amoy testnet over time.
