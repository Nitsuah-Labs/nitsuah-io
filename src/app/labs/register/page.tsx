// REGISTER - src/app/labs/register/page.tsx
"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Button, TextField, Grid, Box } from "@mui/material";
import {
  useAccount,
  useSimulateContract,
  useWriteContract,
  useSwitchChain,
  useWaitForTransactionReceipt,
} from "wagmi";

// LAB STYLES
import "../../_components/_styles/labs.css";
import LabNav from "../../_components/_labs/LabNav";
import LabFooter from "../../_components/_labs/LabFooter";

// LAB ASSETS
import mumbai from "../../_components/_web3/_assets/mumbai.png";
import polygonLogo from "../../_components/_web3/_assets/polygonlogo.png";
import ethLogo from "../../_components/_web3/_assets/ethlogo.png";

// CONTRACT ASSETS
import registerABI from "../../_components/_labs/_utils/registerABI.json";

// CONSTANTS
const SCAN_LINK =
  "https://mumbai.polygonscan.com/address/0x94b40dDa4ACfDe42c7B334A60f25a0f86CE163d8";
const contractAddress =
  "0x94b40dDa4ACfDe42c7B334A60f25a0f86CE163d8" as `0x${string}`;
const contractABI = registerABI.abi;
const MetaMaskURL = "https://metamask.io/download/";
const CBWalletURL =
  "https://chrome.google.com/webstore/detail/coinbase-wallet-extension/hnfanknocfeofbddgcijnmhnfnkdnaad/";

const RegisterSite = () => {
  const [message, setMessage] = useState("");
  const { address: currentAccount, isConnected, chain } = useAccount();
  const { switchChain: wagmiSwitchNetwork } = useSwitchChain();
  const network = chain?.name || "";

  const contractConfig = {
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
  });

  const {
    writeContract: register,
    data: registerTx,
    isPending: isRegistering,
  } = useWriteContract();

  const { isSuccess: isRegistered } = useWaitForTransactionReceipt({
    hash: registerTx,
  });

  const handleRegister = () => {
    if (registerSim?.request) {
      register(registerSim.request);
    }
  };

  const handleSwitchNetwork = () => {
    if (wagmiSwitchNetwork) {
      wagmiSwitchNetwork({ chainId: 80001 }); // Polygon Mumbai chainId
    }
  };

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
            <Button
              onClick={() =>
                alert("Please use the Connect Wallet button in the UI.")
              }
              variant="contained"
              color="success"
            >
              Connect Wallet
            </Button>
          </Box>
        </div>
      </div>
    </div>
  );

  const renderInput = () => {
    if (network !== "Polygon Mumbai Testnet") {
      return (
        <div>
          <div className="connect-wallet-container">
            <div className="zero-row">
              <div className="neutral-wallet">
                <h4>STEP 3: Switch network</h4>
              </div>
              <Button
                onClick={handleSwitchNetwork}
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
      <div className="lab-container">
        <h3>Sign-up here for future give-aways!</h3>
        <p>You can even include a message to contact me directly.</p>
        <div className="form-container">
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={10} sm={8}>
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
            </Grid>
            <Grid item xs={8} sm={4}>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                onClick={handleRegister}
                disabled={!registerSim?.request || isRegistering}
              >
                {isRegistering ? "Registering..." : "Register"}
              </Button>
              <br />
              <Button
                fullWidth
                variant="contained"
                color="secondary"
                onClick={() => window.open(SCAN_LINK, "_blank")}
              >
                PolygonScan
              </Button>
            </Grid>
          </Grid>
          {isRegistered && <p>Successfully registered!</p>}
        </div>
      </div>
    );
  };

  return (
    <div className="App">
      <LabNav />
      <h2>REGISTRATION PORTAL</h2>
      <div className="form-container">
        <div className="mint-container">
          {!isConnected ? renderNotConnectedContainer() : renderInput()}
        </div>
      </div>
      <LabFooter />
    </div>
  );
};

export default RegisterSite;
