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
// polygonLogo and ethLogo not currently used in this page

function renderOutput() {
  return (
    <main
      style={{
        padding: "80px 20px 60px",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        boxSizing: "border-box",
      }}
    >
      <div style={{ textAlign: "center", marginBottom: "40px" }}>
        <h1 style={{ fontSize: "2.5rem", margin: "0 0 10px" }}>WEB3 LABS</h1>
        <p style={{ color: "rgba(255, 255, 255, 0.7)", fontSize: "1.1rem" }}>
          Basic Testnet Experiments
        </p>
      </div>

      <div
        className="labs-grid labs-grid-2"
        style={{ maxWidth: "900px", margin: "0 auto" }}
      >
        {/* Network Info Card */}
        <div className="labs-card">
          <div className="labs-card-header">
            <h2 className="labs-card-title">NETWORK</h2>
          </div>
          <div className="labs-card-body">
            <button
              className="labs-btn"
              disabled
              style={{
                width: "100%",
                margin: "0",
                background: "rgba(255, 255, 255, 0.1)",
                color: "rgba(255, 255, 255, 0.5)",
                cursor: "not-allowed",
              }}
            >
              DISCONNECTED
            </button>
          </div>
        </div>

        {/* Faucet Card */}
        <div className="labs-card">
          <div className="labs-card-header">
            <h2 className="labs-card-title">
              <Image
                className="logo"
                src={mumbai}
                alt="Mumbai icon"
                style={{
                  display: "inline",
                  marginRight: "10px",
                  verticalAlign: "middle",
                }}
              />
              TEST FUNDS
            </h2>
          </div>
          <div className="labs-card-body">
            <p
              style={{
                marginBottom: "16px",
                color: "rgba(255, 255, 255, 0.7)",
              }}
            >
              Get free testnet MATIC
            </p>
            <a
              href="https://wiki.polygon.technology/docs/develop/tools/matic-faucet/"
              target="_blank"
              rel="noopener noreferrer"
              className="labs-btn labs-btn-primary"
              aria-label="Get test MATIC from Polygon faucet"
              style={{
                display: "block",
                textAlign: "center",
                textDecoration: "none",
                margin: "0",
                padding: "0.75rem 1rem",
              }}
            >
              GET MATIC
            </a>
          </div>
        </div>

        {/* Register Card */}
        <Link
          href="/labs/register"
          style={{ textDecoration: "none", color: "inherit" }}
          aria-label="Navigate to Register page"
        >
          <div className="labs-card" style={{ cursor: "pointer" }}>
            <div className="labs-card-header">
              <h2 className="labs-card-title">REGISTER</h2>
            </div>
            <div className="labs-card-body">
              <p
                style={{
                  marginBottom: "16px",
                  color: "rgba(255, 255, 255, 0.7)",
                }}
              >
                Sign up for Web3 experiments
              </p>
              <div
                className="labs-btn labs-btn-primary"
                style={{
                  width: "100%",
                  maxWidth: "100%",
                  margin: "0",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  minHeight: "48px",
                  height: "48px",
                  whiteSpace: "nowrap",
                  gap: "0.5rem",
                  padding: "0.75rem 1rem",
                }}
              >
                <i className="fa fa-rocket" aria-hidden="true"></i>
                GET STARTED
              </div>
            </div>
          </div>
        </Link>

        {/* Mint Card */}
        <Link
          href="/labs/mint"
          style={{ textDecoration: "none", color: "inherit" }}
          aria-label="Navigate to Mint NFT page"
        >
          <div className="labs-card" style={{ cursor: "pointer" }}>
            <div className="labs-card-header">
              <h2 className="labs-card-title">MINT NFT</h2>
            </div>
            <div className="labs-card-body">
              <p
                style={{
                  marginBottom: "16px",
                  color: "rgba(255, 255, 255, 0.7)",
                }}
              >
                Create a Landplot NFT
              </p>
              <div
                className="labs-btn labs-btn-success"
                style={{
                  width: "100%",
                  maxWidth: "100%",
                  margin: "0",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  minHeight: "48px",
                  height: "48px",
                  whiteSpace: "nowrap",
                  gap: "0.5rem",
                  padding: "0.75rem 1rem",
                }}
              >
                <i className="fa fa-magic" aria-hidden="true"></i>
                START MINTING
              </div>
            </div>
          </div>
        </Link>

        {/* Domains Card */}
        <Link
          href="/labs/domains"
          style={{ textDecoration: "none", color: "inherit" }}
          aria-label="Navigate to Domains page"
        >
          <div className="labs-card" style={{ cursor: "pointer" }}>
            <div className="labs-card-header">
              <h2 className="labs-card-title">DOMAINS</h2>
            </div>
            <div className="labs-card-body">
              <p
                style={{
                  marginBottom: "16px",
                  color: "rgba(255, 255, 255, 0.7)",
                }}
              >
                Manage your subdomains
              </p>
              <div
                className="labs-btn labs-btn-primary"
                style={{
                  width: "100%",
                  maxWidth: "100%",
                  margin: "0",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  minHeight: "48px",
                  height: "48px",
                  whiteSpace: "nowrap",
                  gap: "0.5rem",
                  padding: "0.75rem 1rem",
                }}
              >
                <i className="fa fa-globe" aria-hidden="true"></i>
                VIEW DOMAINS
              </div>
            </div>
          </div>
        </Link>

        {/* Home Card */}
        <Link
          href="/"
          style={{ textDecoration: "none", color: "inherit" }}
          aria-label="Navigate to main site homepage"
        >
          <div className="labs-card" style={{ cursor: "pointer" }}>
            <div className="labs-card-header">
              <h2 className="labs-card-title">HOME</h2>
            </div>
            <div className="labs-card-body">
              <p
                style={{
                  marginBottom: "16px",
                  color: "rgba(255, 255, 255, 0.7)",
                }}
              >
                Return to main site
              </p>
              <div
                className="labs-btn labs-btn-secondary"
                style={{
                  width: "100%",
                  maxWidth: "100%",
                  margin: "0",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  minHeight: "48px",
                  height: "48px",
                  whiteSpace: "nowrap",
                  gap: "0.5rem",
                  padding: "0.75rem 1rem",
                }}
              >
                <i className="fa fa-sign-out" aria-hidden="true"></i>
                EXIT LABS
              </div>
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
