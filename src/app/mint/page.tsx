// src/app/mint/pages.tsx
import React from 'react';
import "../_components/_styles/labs.css";
import HomeBar from '../_components/_site/Homebar';
import Footer from '../_components/_site/Footer';
import { Account } from '../_components/_web3/Account';
import { Connect } from '../_components/_web3/Connect';
import { Connected } from '../_components/_web3/Connected';
import { MintNFT } from '../_components/_web3/MintNFT';
import { NetworkSwitcher } from '../_components/_web3/NetworkSwitcher';


const OPENSEA_URL = "https://testnets.opensea.io/assets/";
const NETSCAN_URL = "https://mumbai.polygonscan.com/tx/";
const SCAN_LINK = "https://mumbai.polygonscan.com/address/";
const OPENSEA_LINK = "https://testnets.opensea.io/collection/";
const MetaMaskURL = "https://metamask.io/download/";
const CBWalletURL = "https://chrome.google.com/webstore/detail/coinbase-wallet-extension/hnfanknocfeofbddgcijnmhnfnkdnaad/";
const MaticURL = "https://wallet.matic.network/";

const MintSite: React.FC = () => {
  return (
    <div className="App">
      <div className="container">
        <div className="header">
          <HomeBar />
        </div>
        <div className="middle-row">
        <Connect />
          <Connected>
            <Account />
            <br />
            <MintNFT />
            <br />
            <NetworkSwitcher />
            <br />
          </Connected>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default MintSite;
