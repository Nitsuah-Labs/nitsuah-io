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
    <main style={{ padding: "80px 20px 20px" }}>
      <h1 className="sr-only">Labs - Web3 Experiments</h1>

      <div style={{ textAlign: "center", marginBottom: "40px" }}>
        <h2 style={{ fontSize: "2.5rem", margin: "0 0 10px" }}>WEB3 LABS</h2>
        <p style={{ color: "rgba(255, 255, 255, 0.7)", fontSize: "1.1rem" }}>
          Polygon Mumbai Testnet Experiments
        </p>
      </div>

      <div
        className="labs-grid labs-grid-2"
        style={{ maxWidth: "900px", margin: "0 auto" }}
      >
        {/* Network Info Card */}
        <div className="labs-card">
          <div className="labs-card-header">
            <h3 className="labs-card-title">
              <Image
                className="logo"
                src={polygonLogo}
                alt="Polygon logo"
                style={{ display: "inline", marginRight: "10px" }}
              />
              NETWORK
            </h3>
          </div>
          <div className="labs-card-body">
            <p>Mumbai Testnet</p>
          </div>
        </div>

        {/* Faucet Card */}
        <div className="labs-card">
          <div className="labs-card-header">
            <h3 className="labs-card-title">
              <Image
                className="logo"
                src={mumbai}
                alt="Mumbai icon"
                style={{ display: "inline", marginRight: "10px" }}
              />
              FUNDS
            </h3>
          </div>
          <div className="labs-card-body">
            <a
              href="https://wiki.polygon.technology/docs/develop/tools/matic-faucet/"
              target="_blank"
              rel="noopener noreferrer"
              className="labs-btn labs-btn-primary"
              aria-label="Get test MATIC from Polygon faucet"
            >
              GET MATIC
            </a>
          </div>
        </div>

        {/* Register Card */}
        <Link href="/labs/register" style={{ textDecoration: "none" }}>
          <div className="labs-card">
            <div className="labs-card-header">
              <h3 className="labs-card-title">SIGNUP</h3>
            </div>
            <div className="labs-card-body">
              <button
                className="labs-btn labs-btn-primary"
                style={{ width: "100%" }}
              >
                REGISTER
              </button>
            </div>
          </div>
        </Link>

        {/* Mint Card */}
        <Link href="/labs/mint" style={{ textDecoration: "none" }}>
          <div className="labs-card">
            <div className="labs-card-header">
              <h3 className="labs-card-title">MINT</h3>
            </div>
            <div className="labs-card-body">
              <button
                className="labs-btn labs-btn-success"
                style={{ width: "100%" }}
              >
                LANDPLOT NFT
              </button>
            </div>
          </div>
        </Link>

        {/* Domains Card */}
        <Link href="/labs/domains" style={{ textDecoration: "none" }}>
          <div className="labs-card">
            <div className="labs-card-header">
              <h3 className="labs-card-title">DOMAINS</h3>
            </div>
            <div className="labs-card-body">
              <button
                className="labs-btn labs-btn-primary"
                style={{ width: "100%" }}
              >
                SUBDOMAIN
              </button>
            </div>
          </div>
        </Link>

        {/* Home Card */}
        <Link href="/" style={{ textDecoration: "none" }}>
          <div className="labs-card">
            <div className="labs-card-header">
              <h3 className="labs-card-title">EXIT</h3>
            </div>
            <div className="labs-card-body">
              <button
                className="labs-btn labs-btn-secondary"
                style={{ width: "100%" }}
              >
                GO HOME
              </button>
            </div>
          </div>
        </Link>
      </div>
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
