// LABS - src/app/labs/page.tsx
"use client";
import Image from "next/image";
import Link from "next/link";

// LAB STYLES
import LabFooter from "../_components/_labs/LabFooter";
import LabNav from "../_components/_labs/LabNav";
import "../_components/_styles/labs.css";

// LAB ASSETS
import mumbai from "../_components/_web3/_assets/mumbai.png";
import polygonLogo from "../_components/_web3/_assets/polygonlogo.png";
// ethLogo not currently used in this page

function renderOutput() {
  return (
    <main>
      <h1 className="sr-only">Labs - Web3 Experiments</h1>
      <table>
        <thead></thead>
        <tbody>
          <tr>
            <th scope="col">
              <div className="h4">NETWORK</div>
            </th>
            <td>
              <div className="mumbai-wallet">
                <h2>
                  <Image
                    className="logo"
                    src={polygonLogo}
                    alt="Polygon logo"
                  />
                  MUMBAI
                </h2>
              </div>
            </td>
          </tr>
          <tr>
            <th scope="col">
              <div className="h4">FUNDS</div>
            </th>
            <td>
              <a
                href="https://wiki.polygon.technology/docs/develop/tools/matic-faucet/"
                target="_blank"
                rel="noopener noreferrer"
                className="purp-wallet"
                aria-label="Get test MATIC from Polygon faucet"
              >
                <h2>
                  <Image
                    className="logo"
                    src={mumbai}
                    alt="Polygon Mumbai icon"
                  />
                  FAUCET
                </h2>
              </a>
            </td>
          </tr>
          <tr>
            <th scope="col">
              <div className="h4">SIGNUP</div>
            </th>
            <td>
              <Link
                href="/labs/register"
                className="purp-wallet"
                aria-label="Register for Web3 labs"
              >
                <h2>REGISTER</h2>
              </Link>
            </td>
          </tr>
          <tr>
            <th scope="col">
              <div className="h4">MINT</div>
            </th>
            <td>
              <Link
                href="/labs/mint"
                className="purp-wallet"
                aria-label="Mint NFT landplot"
              >
                <h2>LANDPLOT</h2>
              </Link>
            </td>
          </tr>
          <tr>
            <th scope="col">
              <div className="h4">DOMAINS</div>
            </th>
            <td>
              <Link
                href="/labs/domains"
                className="purp-wallet"
                aria-label="Manage subdomains"
              >
                <h2>SUBDOMAIN</h2>
              </Link>
            </td>
          </tr>
          <tr>
            <td>
              <Link
                href="/"
                className="eth-wallet"
                aria-label="Return to homepage"
              >
                <h2>GO HOME</h2>
              </Link>
            </td>
          </tr>
        </tbody>
        <tfoot></tfoot>
      </table>
    </main>
  );
}

const LabHome = () => {
  return (
    <div className="App">
      <LabNav />
      {renderOutput()}
      <LabFooter />
    </div>
  );
};

export default LabHome;
