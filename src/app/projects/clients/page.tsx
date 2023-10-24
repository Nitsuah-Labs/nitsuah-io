import { Connected } from '../components/Connected'
import { MintNFT } from '../components/MintNFT'
import { NetworkSwitcher } from '../components/NetworkSwitcher'
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'
import "./styles/style.css";

import { CoinbaseWrapper } from "./CoinbaseWrapper";
import { ConnectWallet } from "./ConnectWallet";
import { EnvelopeSimple } from "./EnvelopeSimple";
import { Navigation } from "./Navigation";
import { TwitterLogo } from "./TwitterLogo";
import { WalletConnectWrapper } from "./WalletConnectWrapper";


export const ConnectWalletScreen = (): JSX.Element => {
  return (
    <div className="connect-wallet-screen">
      <Navigation
        NFTMarketplace="NFT-marketplace-2.svg"
        property1="navigation-mobile"
        style={{
          alignSelf: "stretch",
          width: "unset",
        }}
      />
      <ConnectWallet
        href="https://www.animaapp.com/?utm_source=figma-samples&utm_campaign=figma-nftmarket&utm_medium=figma-samples"
        href1="https://www.animaapp.com/?utm_source=figma-samples&utm_campaign=figma-nftmarket&utm_medium=figma-samples"
        href2="https://www.animaapp.com/?utm_source=figma-samples&utm_campaign=figma-nftmarket&utm_medium=figma-samples"
        imagePlaceholder="image.png"
        override={
          <CoinbaseWrapper
            style={{
              backgroundImage: "url(coinbase-2.svg)",
              height: "32px",
              minWidth: "32px",
              position: "relative",
              width: "unset",
            }}
          />
        }
        screen="mobile"
        style={{
          alignSelf: "stretch",
          width: "unset",
        }}
        walletButton={
          <WalletConnectWrapper
            style={{
              backgroundImage: "url(wallet-connect-3.svg)",
              height: "32px",
              minWidth: "32px",
              position: "relative",
              width: "unset",
            }}
          />
        }
        walletButtonMetamaskWrapperMetamaskStyle={{
          backgroundImage: "url(metamask-2.svg)",
          height: "32px",
          minWidth: "32px",
          position: "relative",
          width: "unset",
        }}
      />
      <Footer
        NFTMarketplace="NFT-marketplace-3.svg"
        divider="divider-2.svg"
        icon={
          <TwitterLogo
            style={{
              height: "32px",
              minWidth: "32px",
              position: "relative",
            }}
          />
        }
        screen="mobile"
        style={{
          alignSelf: "stretch",
          height: "auto",
          mixBlendMode: "normal",
          width: "unset",
        }}
        subscribeWidgetButtonIcon={
          <EnvelopeSimple
            style={{
              height: "20px",
              minWidth: "20px",
              position: "relative",
            }}
          />
        }
      />
    </div>
  );
};


export function Page() {
  return (
    <>
      <Header></Header>
      
      <Connect />

      <Connected>
	@@ -18,6 +114,8 @@ export function Page() {
        <hr />
        <NetworkSwitcher />
      </Connected>

      <Footer></Footer>
    </>
  )
}
	