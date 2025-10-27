// DOMAINS - src/app/labs/domains/page.tsx
"use client";
import { Box, Button, Grid } from "@mui/material";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import {
  useAccount,
  useReadContract,
  useReadContracts,
  useSimulateContract,
  useSwitchChain,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi";
import contractAbi from "../../_components/_labs/_utils/domainABI.json";

// LAB STYLES
import LabFooter from "../../_components/_labs/LabFooter";
import LabNav from "../../_components/_labs/LabNav";
import "../../_components/_styles/labs.css";

// LAB ASSETS
import icons180 from "../../_components/_labs/_assets/icons180.png";
import ethLogo from "../../_components/_web3/_assets/ethlogo.png";
import mumbai from "../../_components/_web3/_assets/mumbai.png";
import polygonLogo from "../../_components/_web3/_assets/polygonlogo.png";

// CONSTANTS
const tld = ".nitsuah.eth";
const SCAN_LINK =
  "https://mumbai.polygonscan.com/address/0xBbDF8C47BC3FF87aaC2396493C3F98a89C399163";
const OPENSEA_LINK =
  "https://testnets.opensea.io/collection/nitsuah-name-service-grnrwqs5vq";
const CONTRACT_ADDRESS =
  "0xBbDF8C47BC3FF87aaC2396493C3F98a89C399163" as `0x${string}`;
const MetaMaskURL = "https://metamask.io/download/";
const CBWalletURL =
  "https://chrome.google.com/webstore/detail/coinbase-wallet-extension/hnfanknocfeofbddgcijnmhnfnkdnaad/";

class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): { hasError: boolean } {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    // You can also log the error to an error reporting service
    console.log(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <div>An error occurred. Please try again later.</div>;
    }

    return this.props.children;
  }
}

// Define the networks object with chain IDs and their corresponding network names
const networks = {
  "0x1": "Ethereum Mainnet",
  "0x3": "Ropsten Testnet",
  "0x4": "Rinkeby Testnet",
  "0x5": "Goerli Testnet",
  "0x2a": "Kovan Testnet",
  "0x89": "Polygon Mainnet",
  "0x13881": "Polygon Mumbai Testnet",
};

const DomainSite = () => {
  const [domain, setDomain] = useState("");
  const [record, setRecord] = useState("");
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  // Add a stateful array at the top next to all the other useState calls
  interface Mint {
    id: number;
    name: string;
    record: string;
    owner: string;
  }
  const [mints, setMints] = useState<Mint[]>([]);
  const { address: currentAccount, isConnected, chain } = useAccount();
  const { switchChain: wagmiSwitchNetwork, isPending: isSwitchingNetwork } =
    useSwitchChain();

  // Get current network name from wagmi
  const network = chain?.name || "";

  // Prepare contract config
  const contractConfig = {
    address: CONTRACT_ADDRESS,
    abi: contractAbi.abi as any,
  };

  // Read all names (domains)
  const { data: names, refetch: refetchNames } = useReadContract({
    ...contractConfig,
    functionName: "getAllNames",
    query: {
      enabled: isConnected,
    },
  });

  // Batch read records and owners for all names using useReadContracts
  const recordCalls = (names as string[] | undefined)?.map((name: string) => ({
    ...contractConfig,
    functionName: "records",
    args: [name],
  }));
  const ownerCalls = (names as string[] | undefined)?.map((name: string) => ({
    ...contractConfig,
    functionName: "domains",
    args: [name],
  }));
  const { data: records } = useReadContracts({
    // cast to any to avoid deep TypeScript instantiation errors from complex inferred types
    contracts: (recordCalls || []) as any,
    query: {
      enabled: !!names && Array.isArray(recordCalls) && recordCalls.length > 0,
    },
  });
  const { data: owners } = useReadContracts({
    contracts: (ownerCalls || []) as any,
    query: {
      enabled: !!names && (ownerCalls?.length ?? 0) > 0,
    },
  });

  // Set mints when names, records, and owners are available
  useEffect(() => {
    if (
      Array.isArray(names) &&
      Array.isArray(records) &&
      Array.isArray(owners)
    ) {
      setMints(
        (names as string[]).map((name: string, idx: number) => ({
          id: idx,
          name,
          record: String(records[idx]?.result || ""),
          owner: String(owners[idx]?.result || ""),
        })),
      );
    }
  }, [names, records, owners]);

  // Connect wallet (handled by wagmi, so just a placeholder for UI)
  const connectWallet = () => {
    // wagmi handles connection via Connect button elsewhere
    alert("Please use the Connect Wallet button in the UI.");
  };

  // Switch network using wagmi if available, otherwise fallback to MetaMask prompt
  const handleSwitchNetwork = () => {
    if (wagmiSwitchNetwork) {
      wagmiSwitchNetwork({ chainId: 80001 }); // Polygon Mumbai chainId
    } else if ((window as any).ethereum) {
      (window as any).ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: "0x13881" }],
      });
    } else {
      alert(
        "MetaMask is not installed. Please install it to use this app: https://metamask.io/download.html",
      );
    }
  };

  // This will run any time currentAccount or network are changed
  useEffect(() => {
    if (network === "Polygon Mumbai Testnet") {
      refetchNames();
    }
  }, [isConnected, network, refetchNames]);

  // Simulate: Register domain
  const { data: registerSim } = useSimulateContract({
    ...contractConfig,
    functionName: "register",
    args: [domain],
    value:
      domain.length === 1
        ? BigInt(1e18)
        : domain.length === 2
          ? BigInt(5e17)
          : domain.length === 3
            ? BigInt(2e17)
            : BigInt(1e17),
    query: {
      enabled: !!domain && domain.length <= 6 && !containsSpecialChars(domain),
    },
  });
  const {
    writeContract: registerDomain,
    data: registerTx,
    isPending: isRegistering,
  } = useWriteContract();
  const { isSuccess: isRegistered } = useWaitForTransactionReceipt({
    hash: registerTx,
  });

  // Simulate: Set record
  const { data: setRecordSim } = useSimulateContract({
    ...contractConfig,
    functionName: "setRecord",
    args: [domain, record],
    query: {
      enabled: !!domain && !!record,
    },
  });
  const {
    writeContract: setRecordWrite,
    data: setRecordTx,
    isPending: isSettingRecord,
  } = useWriteContract();
  const { isSuccess: isRecordSet } = useWaitForTransactionReceipt({
    hash: setRecordTx,
  });

  // Mint Domain logic
  const mintDomain = async () => {
    if (!domain) {
      alert("Domain cannot be empty");
      return;
    }
    if (domain.length > 6) {
      alert("Domain cannot be more than 6 characters long");
      return;
    }
    if (containsSpecialChars(domain)) {
      alert("⛔️ Domain cannot contain special characters");
      return;
    }
    if (registerSim?.request) {
      registerDomain(registerSim.request);
    }
  };

  // Update Domain logic
  const updateDomain = async () => {
    if (!record || !domain) {
      return;
    }
    setLoading(true);
    if (setRecordSim?.request) {
      setRecordWrite(setRecordSim.request);
    }
    setLoading(false);
  };

  // Render methods
  const renderNotConnectedContainer = () => (
    <div className="connect-wallet-container">
      <div className="form-container">
        <div className="neutral-wallet">
          <h4>STEP 1: Setup a Wallet app</h4>
        </div>
        <Box sx={{ textAlign: "center", my: 5 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => window.open(CBWalletURL, "_blank")}
          >
            COINBASE
          </Button>
          <br />
          <br />
          <Button
            variant="contained"
            color="warning"
            onClick={() => window.open(MetaMaskURL, "_blank")}
          >
            METAMASK
          </Button>
        </Box>
        <div className="neutral-wallet">
          <h4>STEP 2: Connect a Wallet</h4>
        </div>
        <div className="connect-wallet-container">
          <Box sx={{ textAlign: "center", my: 5 }}>
            <Button onClick={connectWallet} variant="contained" color="success">
              Connect Wallet
            </Button>
          </Box>
        </div>
      </div>
    </div>
  );

  const renderInputForm = () => {
    // If not on Polygon Mumbai Testnet, render the switch button
    if (network !== "Polygon Mumbai Testnet") {
      function refreshPage() {
        window.location.reload();
      }

      return (
        <div>
          <div className="connect-wallet-container">
            <div className="zero-row">
              <div className="neutral-wallet">
                <h4>STEP 3: Switch network</h4>
              </div>
              <Button
                onClick={() => {
                  handleSwitchNetwork();
                  refreshPage();
                }}
                variant="contained"
                color="secondary"
              >
                <Image
                  className="logo"
                  src={mumbai}
                  alt="polygon mumbai logo grey"
                />
                POLYGON MUMBAI
              </Button>
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
              />{" "}
              {currentAccount}{" "}
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
          <p className="tld" color="black">
            {" "}
            {tld}{" "}
          </p>
        </div>
        <input
          type="text"
          value={record}
          placeholder={currentAccount}
          onChange={(e) => setRecord(e.target.value)}
        />
        {/* Return the current Wallet */}
        {currentAccount ? (
          <div
            className={
              network.includes("Polygon") ? "poly-wallet" : "eth-wallet"
            }
          >
            <Image
              alt="Network logo"
              className="logo"
              src={network.includes("Polygon") ? polygonLogo : ethLogo}
            />{" "}
            {currentAccount.slice(0, 6)}...{currentAccount.slice(-4)}{" "}
          </div>
        ) : (
          <Button variant="contained" color="error">
            {" "}
            Not connected{" "}
          </Button>
        )}
        <div className="zero-row">
          <Grid container spacing={2}>
            <Grid item xs={16} sm={10}>
              {/* If the editing variable is true, return the "Set record" and "Cancel" button */}
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
                    onClick={() => {
                      setEditing(false);
                    }}
                  >
                    CANCEL
                  </button>
                </div>
              ) : (
                <div className="zero-row">
                  <Button
                    fullWidth
                    variant="contained"
                    color="error"
                    disabled={loading}
                    onClick={mintDomain}
                  >
                    MINT
                  </Button>
                </div>
              )}
            </Grid>
            <Grid item xs={16} sm={10}>
              <Button
                fullWidth
                variant="contained"
                color="secondary"
                onClick={() => window.open(SCAN_LINK, "_blank")}
              >
                PolygonScan
              </Button>
              <br />
              <Button
                fullWidth
                variant="contained"
                color="primary"
                onClick={() => window.open(OPENSEA_LINK, "_blank")}
              >
                OpenSea
              </Button>
            </Grid>
          </Grid>
        </div>
      </div>
    );
  };

  // Add this render function next to your other render functions
  const renderMints = () => {
    if (currentAccount && mints.length > 0) {
      return (
        <div className="long-container">
          <p className="subtitle">RECENT MINTS:</p>
          <div className="mint-list">
            {mints.map((mint, index) => {
              return (
                <div className="mint-item" key={index}>
                  <div className="mint-row">
                    <a
                      className="link"
                      href={`https://testnets.opensea.io/assets/mumbai/${CONTRACT_ADDRESS}/${mint.id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <p className="underlined">
                        {" "}
                        {mint.name}
                        {tld}{" "}
                      </p>
                    </a>
                    {/* If mint.owner is currentAccount, add an "edit" button*/}
                    {mint.owner.toLowerCase() ===
                    currentAccount.toLowerCase() ? (
                      <button
                        className="edit-button"
                        onClick={() => editRecord(mint.name)}
                      >
                        <Image
                          className="edit-icon"
                          src="https://img.icons8.com/metro/26/000000/pencil.png"
                          alt="Edit button"
                        />
                      </button>
                    ) : null}
                  </div>
                  <p> {mint.record} </p>
                </div>
              );
            })}
          </div>
        </div>
      );
    }
    return null;
  };

  // This will take us into edit mode and show us the edit buttons!
  interface Mint {
    id: number;
    name: string;
    record: string;
    owner: string;
  }

  const editRecord = (name: string): void => {
    console.log("Editing record for", name);
    setEditing(true);
    setDomain(name);
  };

  return (
    <div className="App">
      <LabNav />
      <div className="form-container">
        <h2>SUB-DOMAIN PORTAL</h2>
        <div className="mint-container">
          {/* Display a logo and wallet connection status*/}
          {!currentAccount && renderNotConnectedContainer()}
          {/* Return the input form if an account is connected */}
          {currentAccount && renderInputForm()}
          {/* Return recent mints */}
          {mints && renderMints()}
        </div>
        <LabFooter />
      </div>
    </div>
  );
};

function containsSpecialChars(str: string): boolean {
  const specialChars = /[ `!@#$%^&*()_+\-=\[{};':"\\|,.<>/?~]/;
  return specialChars.test(str);
}

export default DomainSite;
