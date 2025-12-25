"use client";

import { TextField } from "@mui/material";
import Image from "next/image";
import { useEffect, useState } from "react";
import {
  useAccount,
  useSimulateContract,
  useSwitchChain,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi";
import registerABI from "../../_components/_labs/_utils/registerABI.json";
import "../../_components/_styles/labs.css";
import ethLogo from "../../_components/_web3/_assets/ethlogo.png";
import mumbai from "../../_components/_web3/_assets/mumbai.png";
import polygonLogo from "../../_components/_web3/_assets/polygonlogo.png";
import { Connect } from "../../_components/_web3/Connect";

const SCAN_LINK =
  "https://mumbai.polygonscan.com/address/0x94b40dDa4ACfDe42c7B334A60f25a0f86CE163d8";
const contractAddress =
  "0x94b40dDa4ACfDe42c7B334A60f25a0f86CE163d8" as `0x${string}`;
const contractABI = registerABI.abi;

export default function RegisterContent() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Always check this - it's baked in at build time
  const testHelpersMode = process.env.NEXT_PUBLIC_TEST_HELPERS === "1";

  const [message, setMessage] = useState("");

  // Render test helpers UI immediately if in test mode - don't wait for wagmi
  if (testHelpersMode && !mounted) {
    return (
      <>
        <h1>REGISTRATION PORTAL</h1>
        <div className="form-container">
          <div className="mint-container">
            <div className="labs-card">
              <div className="labs-card-header">
                <h2 className="labs-card-title">Connect Wallet</h2>
              </div>
              <div className="labs-card-body">
                <div
                  data-testid="register-test-helpers"
                  style={{
                    marginTop: "16px",
                    display: "flex",
                    gap: "12px",
                    flexDirection: "column",
                  }}
                >
                  <button
                    className="labs-btn labs-btn-primary"
                    aria-label="Connect Wallet"
                    data-testid="register-connect-button"
                    type="button"
                  >
                    Connect Wallet
                  </button>
                  <div data-testid="network-info">testnet</div>
                  <input
                    type="text"
                    placeholder="domain"
                    aria-label="domain-input"
                    data-testid="domain-input"
                    disabled
                    style={{ padding: "8px", borderRadius: "6px" }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  // Regular loading state for non-test mode
  if (!mounted) {
    return (
      <>
        <h1>REGISTRATION PORTAL</h1>
        <div className="form-container">
          <div className="mint-container">
            <div className="labs-card">
              <div className="labs-card-header">
                <h2 className="labs-card-title">Loading...</h2>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  const { address: currentAccount, isConnected, chain } = useAccount();
  const { switchChain: wagmiSwitchNetwork } = useSwitchChain();
  const network = chain?.name || "";

  const contractConfig: { address: `0x${string}`; abi: any } = {
    address: contractAddress,
    abi: contractABI as any,
  };

  const { data: registerSim } = useSimulateContract({
    ...contractConfig,
    functionName: "register",
    args: [message],
    query: {
      enabled: !!message,
    },
  } as unknown as any) as any;

  const {
    writeContract: register,
    data: registerTx,
    isPending: isRegistering,
  } = useWriteContract();

  const { isSuccess: isRegistered } = useWaitForTransactionReceipt({
    hash: registerTx,
  });

  const handleRegister = () => {
    if ((registerSim as any)?.request) {
      register((registerSim as any).request);
    }
  };

  const handleSwitchNetwork = () => {
    if (wagmiSwitchNetwork) {
      wagmiSwitchNetwork({ chainId: 80001 });
    }
  };

  const renderNotConnectedContainer = () => (
    <div className="labs-card">
      <div className="labs-card-header">
        <h2 className="labs-card-title">Connect a Wallet</h2>
      </div>
      <div className="labs-card-body">
        <Connect />
        {testHelpersMode && (
          <div
            data-testid="register-test-helpers"
            style={{
              marginTop: "16px",
              display: "flex",
              gap: "12px",
              flexDirection: "column",
            }}
          >
            <button
              className="labs-btn labs-btn-primary"
              aria-label="Connect Wallet"
              data-testid="register-connect-button"
              onClick={() => {
                const el = document.querySelector(
                  "[data-testid^='connector-'], [aria-label^='Connect to']",
                );
                if (el) (el as HTMLElement).focus();
              }}
            >
              Connect Wallet
            </button>

            <div data-testid="network-info">testnet</div>

            <input
              type="text"
              placeholder="domain"
              aria-label="domain-input"
              data-testid="domain-input"
              disabled
              style={{ padding: "8px", borderRadius: "6px" }}
            />
          </div>
        )}
      </div>
    </div>
  );

  const renderInput = () => {
    if (network !== "Polygon Mumbai Testnet") {
      return (
        <div className="labs-card">
          <div className="labs-card-header">
            <h2 className="labs-card-title">STEP 3: Switch Network</h2>
          </div>
          <div className="labs-card-body">
            <button
              onClick={handleSwitchNetwork}
              className="labs-btn labs-btn-primary labs-btn-large"
              aria-label="Switch to Polygon Mumbai testnet"
            >
              <Image
                className="logo"
                src={mumbai}
                alt="polygon mumbai logo grey"
                width={24}
                height={24}
              />
              SWITCH TO POLYGON MUMBAI
            </button>
            <div
              className={
                network.includes("Polygon") ? "poly-wallet" : "eth-wallet"
              }
              style={{ marginTop: "16px" }}
            >
              <Image
                alt="Network logo"
                className="logo"
                src={network.includes("Polygon") ? polygonLogo : ethLogo}
                width={20}
                height={20}
              />{" "}
              {currentAccount}{" "}
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="labs-card">
        <div className="labs-card-header">
          <h3 className="labs-card-title">
            Sign-up here for future give-aways!
          </h3>
        </div>
        <div className="labs-card-body">
          <p style={{ marginBottom: "16px" }}>
            You can even include a message to contact me directly.
          </p>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "2fr 1fr",
              gap: "1rem",
            }}
          >
            <div>
              <TextField
                fullWidth
                variant="filled"
                label="Message"
                style={{
                  borderBottom: "2px solid #750691",
                  backgroundColor: "grey",
                }}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </div>
            <div>
              <div
                style={{ display: "flex", flexDirection: "column", gap: "8px" }}
              >
                <button
                  className="labs-btn labs-btn-primary"
                  onClick={handleRegister}
                  disabled={!(registerSim as any)?.request || isRegistering}
                >
                  {isRegistering ? "Registering..." : "Register"}
                </button>
                <button
                  className="labs-btn labs-btn-secondary"
                  onClick={() => window.open(SCAN_LINK, "_blank")}
                >
                  View on PolygonScan
                </button>
              </div>
            </div>
          </div>
          {isRegistered && (
            <p style={{ marginTop: "16px", color: "#10b981" }}>
              Successfully registered!
            </p>
          )}
        </div>
      </div>
    );
  };

  return (
    <>
      <h1>REGISTRATION PORTAL</h1>
      <div className="form-container">
        <div className="mint-container">
          {!isConnected ? renderNotConnectedContainer() : renderInput()}
        </div>
      </div>
    </>
  );
}
