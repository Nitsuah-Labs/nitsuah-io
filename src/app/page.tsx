import { useEffect } from 'react';
import { Account } from '../components/Account';
import { Connect } from '../components/Connect';
import { Connected } from '../components/Connected';
import { MintNFT } from '../components/MintNFT';
import { NetworkSwitcher } from '../components/NetworkSwitcher';
import Spline from '@splinetool/react-spline';
import Homebar from '../components/Homebar';
import Footer from '../components/Footer';
import dynamic from 'next/dynamic';

const SplineComponent = dynamic(() => import('@splinetool/react-spline'), { ssr: false });

const SPLINE_SCENE = 'https://prod.spline.design/I53VLJ6OCdGVN8lr/scene.splinecode';

export function Page() {
  useEffect(() => {
    // Code here will only run on the client side
    // Use useEffect or other client-side functionality here
  }, []);

  return (
    <>
      <h1>wagmi + Next.js + @wagmi/cli (Etherscan)</h1>
      <div className="spline-container">
        <SplineComponent scene={SPLINE_SCENE} />
      </div>
      <Homebar />
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
