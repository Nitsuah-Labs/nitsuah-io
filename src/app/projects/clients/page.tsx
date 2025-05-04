// src/app/projects/clients/page.tsx
// CLIENTS - src/app/projects/clients/page.tsx //FIXME
'use client';
import "./_styles/client.css";
import React from 'react';
import { Navigation } from './_comp/Header';
import { Footer } from './_comp/Footer';
import { Button, TextField, Grid, Box } from '@mui/material';

// WEB3
import { Connect } from '../../_components/_web3/Connect';
import { Connected } from '../../_components/_web3/Connected';
import { Account } from '../../_components/_web3/Account';
import { MintNFT } from '../../_components/_web3/MintNFT';
import { NetworkSwitcher } from '../../_components/_web3/NetworkSwitcher';

const OPENSEA_URL = "https://testnets.opensea.io/assets/";
const NETSCAN_URL = "https://mumbai.polygonscan.com/tx/";
const SCAN_LINK = "https://mumbai.polygonscan.com/address/";
const OPENSEA_LINK = "https://testnets.opensea.io/collection/";
const MetaMaskURL = "https://metamask.io/download/";
const CBWalletURL = "https://chrome.google.com/webstore/detail/coinbase-wallet-extension/hnfanknocfeofbddgcijnmhnfnkdnaad/";
const MaticURL = "https://wallet.matic.network/";

const MintExample: React.FC = () => {
  return (
    <div className="App">
      <div className="container">
        <div className="header">
          <Navigation property1="navigation-desktop" style={{/* //TODO your style object */}} NFTMarketplace="/images/NFT-marketplace.svg" buttonIcon={<Button />} />
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
        <Footer screen="desktop" style={{/* your style object */}} subscribeWidget={<div />} />
      </div>
    </div>
  );
};

export default MintExample;