// DOMAINS - src/app/labs/domains/page.tsx
"use client";
import { Box, Button, Grid } from "@mui/material";
import Image from "next/image";
import { useEffect, useState } from "react";
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
import { Connect } from "../../_components/_web3/Connect";

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

// ErrorBoundary removed ΓÇö it was defined but never used. Keep page focused.

// networks object removed ΓÇö not referenced in this file

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
  const { switchChain: wagmiSwitchNetwork } = useSwitchChain();

  // Get current network name from wagmi
  const network = chain?.name || "";

  // Prepare contract config (explicitly typed so address retains `0x${string}` shape)
  const contractConfig: { address: `0x${string}`; abi: any } = {
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
  // Explicitly type the contract call objects to avoid deep TypeScript
  // inference from wagmi's complex types which can cause the compiler to blow up.
  type SimpleContractCall = {
    // Use a template literal type to match wagmi's expected `0x${string}` address shape
    address: `0x${string}`;
    abi: any;
    functionName: string;
    args?: any[];
  };

  const recordCalls: SimpleContractCall[] | undefined = (
    names as string[] | undefined
  )?.map((name: string) => ({
    address: contractConfig.address,
    abi: contractConfig.abi,
    functionName: "records",
    args: [name],
  }));

  const ownerCalls: SimpleContractCall[] | undefined = (
    names as string[] | undefined
  )?.map((name: string) => ({
    address: contractConfig.address,
    abi: contractConfig.abi,
    functionName: "domains",
    args: [name],
  }));
  // Wrap the hook result with a narrow runtime cast to avoid deep generic
  // type instantiation during Next's type checking while preserving runtime
  // behavior. This keeps the fix local and minimal.
  // Cast the wagmi hook to a relaxed any-typed function so TypeScript doesn't
  // try to recursively instantiate wagmi's complex generics during Next's
  // build-time type checking. Keep the `use` prefix so ESLint hooks rules
  // continue to recognize it as a hook.
  const useReadContractsAny = useReadContracts as unknown as (props: any) => {
    data?: any[];
  };

  const _recordsRes = useReadContractsAny({
    contracts: (recordCalls || []) as readonly any[],
    query: {
      enabled: !!names && Array.isArray(recordCalls) && recordCalls.length > 0,
    },
  });
  const records = _recordsRes.data;

  const _ownersRes = useReadContractsAny({
    contracts: (ownerCalls || []) as readonly any[],
    query: {
      enabled: !!names && (ownerCalls?.length ?? 0) > 0,
    },
  });
  const owners = _ownersRes.data;

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

  // Use shared Connect component for wallet connection UI

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
  const { writeContract: registerDomain, data: registerTx } =
    useWriteContract();
  useWaitForTransactionReceipt({
    // keep monitoring registerTx for side-effects, don't create unused bindings
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
  const { writeContract: setRecordWrite, data: setRecordTx } =
    useWriteContract();
  useWaitForTransactionReceipt({ hash: setRecordTx });

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
      alert("Γ¢ö∩╕Å Domain cannot contain special characters");
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
            <Connect />
          </Box>
        </div>
      </div>
    </div>
  );

  const renderInputForm = () => {
    // If not on Polygon Mumbai Testnet, render the switch button
    if (network !== "Polygon Mumbai Testnet") {
      const refreshPage = () => {
        window.location.reload();
      };

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
          <>{currentAccount ? renderInputForm() : null}</>
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
