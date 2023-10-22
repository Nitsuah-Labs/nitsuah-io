// src/app/page.tsx
import React from 'react';
import { Account } from '../components/Account';
import { Connect } from '../components/Connect';
import { Connected } from '../components/Connected';
import { MintNFT } from '../components/MintNFT';
import { NetworkSwitcher } from '../components/NetworkSwitcher';
import Homebar from '../components/Homebar';
import Footer from '../components/Footer';



export function Page() {
  return (
    <>
      <h1>wagmi + Next.js + @wagmi/cli (Etherscan)</h1>
      <Connect />
      <Connected>
        <Account />
        <hr />
        <MintNFT />
        <hr />
        <NetworkSwitcher />
      </Connected>
      <Footer />
    </>
  );
}

export default Page;