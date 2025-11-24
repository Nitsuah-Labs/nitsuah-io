"use client";
import Image from "next/image";
import React from "react";

interface DomainFormProps {
  domain: string;
  setDomain: (s: string) => void;
  record: string;
  setRecord: (s: string) => void;
  editing: boolean;
  setEditing: (b: boolean) => void;
  loading: boolean;
  mintDomain: () => void;
  updateDomain: () => void;
  network: string;
  handleSwitchNetwork: () => void;
  currentAccount?: string | null;
  icons180: string;
  polygonLogo: string;
  ethLogo: string;
  tld: string;
  SCAN_LINK: string;
  OPENSEA_LINK: string;
}

export default function DomainForm(props: DomainFormProps): React.ReactElement {
  const {
    domain,
    setDomain,
    record,
    setRecord,
    editing,
    setEditing,
    loading,
    mintDomain,
    updateDomain,
    network,
    handleSwitchNetwork,
    currentAccount,
    icons180,
    polygonLogo,
    ethLogo,
    tld,
    SCAN_LINK,
    OPENSEA_LINK,
  } = props;

  if (network !== "Polygon Mumbai Testnet") {
    const refreshPage = () => window.location.reload();
    return (
      <div>
        <div className="labs-card">
          <div className="labs-card-header">
            <h3 className="labs-card-title">STEP 3: Switch network</h3>
          </div>
          <div className="labs-card-body" style={{ textAlign: "center" }}>
            <button
              onClick={() => {
                handleSwitchNetwork();
                refreshPage();
              }}
              className="labs-btn labs-btn-secondary labs-btn-large"
            >
              <Image
                className="logo"
                src={icons180}
                alt="polygon mumbai logo"
              />
              POLYGON MUMBAI
            </button>
          </div>
        </div>
        <div className="zero-row">
          <div
            className={
              network.includes("Polygon") ? "poly-wallet" : "eth-wallet"
            }
          >
            <Image
              alt="Network logo"
              className="logo"
              src={network.includes("Polygon") ? polygonLogo : ethLogo}
            />
            {currentAccount}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="form-container">
      <div className="zero-row">
        <span style={{ position: "relative", display: "inline-block" }}>
          <Image src={icons180} alt="svg icon 180" />
          <h3
            style={{
              position: "absolute",
              bottom: 0,
              right: 0,
              zIndex: 1,
              margin: "10px",
              color: "white",
              textShadow: "2px 2px 4px #000000",
            }}
          >
            {domain}
            {tld}
          </h3>
        </span>
      </div>
      <div className="first-row">
        <input
          type="text"
          value={domain}
          placeholder="subdomain"
          onChange={(e) => setDomain(e.target.value)}
        />
        <p className="tld"> {tld} </p>
      </div>
      <input
        type="text"
        value={record}
        placeholder={currentAccount ?? ""}
        onChange={(e) => setRecord(e.target.value)}
      />
      {/* Return the current Wallet */}
      {currentAccount ? (
        <div
          className={network.includes("Polygon") ? "poly-wallet" : "eth-wallet"}
        >
          <Image
            alt="Network logo"
            className="logo"
            src={network.includes("Polygon") ? polygonLogo : ethLogo}
          />
          {currentAccount.slice(0, 6)}...{currentAccount.slice(-4)}
        </div>
      ) : (
        <button className="labs-btn labs-btn-danger">Not connected</button>
      )}
      <div className="zero-row">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "3fr 1fr",
            gap: "1rem",
          }}
        >
          <div>
            {editing ? (
              <div className="zero-row">
                <button
                  className="cta-button mint-button"
                  disabled={loading}
                  onClick={updateDomain}
                >
                  SET RECORD
                </button>
                <button
                  className="cta-button mint-button"
                  onClick={() => setEditing(false)}
                >
                  CANCEL
                </button>
              </div>
            ) : (
              <div className="zero-row">
                <button
                  className="labs-btn labs-btn-danger labs-btn-large"
                  style={{ width: "100%" }}
                  disabled={loading}
                  onClick={mintDomain}
                >
                  MINT
                </button>
              </div>
            )}
          </div>
          <div>
            <button
              className="labs-btn labs-btn-secondary"
              style={{ width: "100%", marginBottom: "10px" }}
              onClick={() => window.open(SCAN_LINK, "_blank")}
            >
              PolygonScan
            </button>
            <button
              className="labs-btn labs-btn-primary"
              style={{ width: "100%" }}
              onClick={() => window.open(OPENSEA_LINK, "_blank")}
            >
              OpenSea
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
