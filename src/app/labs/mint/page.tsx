// MINT - src/app/labs/mint/page.tsx // TODO ADD MINTING LOGIC

'use client'
import React, { useEffect, useState } from "react";
import Image from 'next/image';
import { Button, TextField, Grid, Box } from '@mui/material';

// LAB STYLES
import "../../_components/_styles/labs.css";
import LabNav from '../../_components/_labs/LabNav';
import LabFooter from '../../_components/_labs/LabFooter';

// LAB ASSETS
import mumbai from '../../_components/_web3/_assets/mumbai.png';	
import polygonLogo from '../../_components/_web3/_assets/polygonlogo.png';
import ethLogo from '../../_components/_web3/_assets/ethlogo.png';

import { Account } from '../../_components/_web3/Account';
import { Connect } from '../../_components/_web3/Connect';
import { Connected } from '../../_components/_web3/Connected';
import { MintNFT } from '../../_components/_web3/MintNFT';
import { NetworkSwitcher } from '../../_components/_web3/NetworkSwitcher';
import mintABI from '../../_components/_labs/_utils/mintABI.json';

const OPENSEA_URL = "https://testnets.opensea.io/assets/";
const NETSCAN_URL = "https://mumbai.polygonscan.com/tx/";
const SCAN_LINK = "https://mumbai.polygonscan.com/address/";
const OPENSEA_LINK = "https://testnets.opensea.io/collection/";
const MetaMaskURL = "https://metamask.io/download/";
const CBWalletURL = "https://chrome.google.com/webstore/detail/coinbase-wallet-extension/hnfanknocfeofbddgcijnmhnfnkdnaad/";
const MaticURL = "https://wallet.matic.network/";

const CONTRACT_ADDRESS = "0x22FACFbf9dd893Ec8a0aF6d0764c9d30b27D5Bc3";
const contractABI = mintABI.abi;
const TOTAL_MINT_COUNT = 10;

const MintSite: React.FC = () => {
  return (
    <div className="App">
      <div className="container">
        <div className="header">
          <LabNav />  
        </div>
        <div className="middle-row">
        <h2>MINT PORTAL</h2>
        <Connect />
          <Connected>
            <Account />
            <br />
            <MintNFT />
            <br />
            <NetworkSwitcher />
            <br />
          </Connected>
          <div className="footer">
              <LabFooter />
          </div>
        </div>
      </div>
  </div>
  );
};

export default MintSite;
