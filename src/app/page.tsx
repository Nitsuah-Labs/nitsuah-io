// src/app/page.tsx
import React from 'react';
import { Account } from '../components/Account';
import { Connect } from '../components/Connect';
import { Connected } from '../components/Connected';
import { MintNFT } from '../components/MintNFT';
import { NetworkSwitcher } from '../components/NetworkSwitcher';
import HomeBar from '../components/Homebar';
import Footer from '../components/Footer';
import SplineScene from '../components/Spline';

export function Page() {
  return (
    <>
    <div className="App">
			<div className="container">
				<div className="header">
					<HomeBar>
            <Connect />
          </HomeBar>
				</div>
        <div className="middle-row">
          <Connected>
          <Account />
          <MintNFT />
          <NetworkSwitcher />
        </Connected>
        </div>
				<div className="spline-container">
					<SplineScene />
				</div>
					<Footer />
			</div>
		</div>
    </>
  );
}

export default Page;