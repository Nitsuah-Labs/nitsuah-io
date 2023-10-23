'use client'
import React, { useEffect, useState } from "react";
import './styles/labs.css';
import { SnackbarProvider, useSnackbar } from 'notistack';
import Labslab from './components/Labslab.jsx';
import Footer from './components/footer';
import { Button, TextField, Grid, Box } from '@mui/material';
import { ethers } from 'ethers';
import { networks } from '../../../../../nitsuah/LAB/labs/utils/networks';
import registerABI from '../../../../../nitsuah/LAB/labs/utils/registerABI.json';
import nftPreview from './assets/nlab-m1-img.svg';
import mumbaiLogo from '../../assets/mumbai.png';
import polygonLogo from '../../assets/polygonlogo.png';
import ethLogo from '../../assets/ethlogo.png';

// CONSTANTS
const NETSCAN_URL = "https://mumbai.polygonscan.com/tx/";
const SCAN_LINK = "https://mumbai.polygonscan.com/address/0x94b40dDa4ACfDe42c7B334A60f25a0f86CE163d8"
const MetaMaskURL = "https://metamask.io/download/";
const CBWalletURL = "https://chrome.google.com/webstore/detail/coinbase-wallet-extension/hnfanknocfeofbddgcijnmhnfnkdnaad/";
const contractAddress = "0x94b40dDa4ACfDe42c7B334A60f25a0f86CE163d8";
const contractABI = registerABI.abi;

function ErrorFallback() {
  return (
    <div>
      <h2>Something went wrong!</h2>
      <p>Please try again later.</p>
    </div>
  );
  }

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    console.log(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <ErrorFallback />;
    }

    return this.props.children;
  }
  }

const RegisterSite = ({ contractAddress, provider, signer }) => {
    const { enqueueSnackbar } = useSnackbar();
    const [currentAccount, setCurrentAccount] = useState('');
    const [network, setNetwork] = useState('');

    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [connected, setConnected] = useState(false);
    const [contract, setContract] = useState(null);

    const checkIfWalletIsConnected = async () => {
        const { ethereum } = window;

        if (!ethereum) {
            console.log('WALLET 404 - NOT FOUND');
            return;
        } else {
            console.log('WALLET 200 - FOUND', ethereum);
        }

        const accounts = await ethereum.request({ method: 'eth_accounts' });

        if (accounts.length !== 0) {
            const account = accounts[0];
            console.log('WALLET 200 - ACCOUNT: ', account);
            setCurrentAccount(account);
            // LISTENER
            setupEventListener()
        } else {
            console.log('WALLET 403 - NOT CONNECTED');
            return;
        }
        const chainId = await ethereum.request({ method: 'eth_chainId' });
            setNetwork(networks[chainId]);

            ethereum.on('chainChanged', handleChainChanged);
            
            function handleChainChanged(_chainId) {
            window.location.reload();
            }
    };

    const connectWallet = async () => {
        try {
        const { ethereum } = window;

        if (!ethereum) {
            const key = props.enqueueSnackbar('No connection!', { 
                variant: 'error',
                persist: true,
            });
            console.log('WALLET 404 - Not Found');
            return;
        }
                
        const accounts = await ethereum.request({ method: "eth_requestAccounts" });
        console.log("WALLET 200 - ", accounts[0]);
        setCurrentAccount(accounts[0]);
        setupEventListener() 
        } catch (error) {
            alert(error);
        }
    };

    const setupEventListener = async () => {
        if (!window.ethereum) {
          console.log('No Ethereum provider found');
          return;
        }
        try {
          const { ethereum } = window;
    
          if (ethereum) {
            const provider = new ethers.BrowserProvider(window.ethereum);
            // Prompt user for account connections
            await provider.send("eth_requestAccounts", []);
            const signer = provider.getSigner();
            const connectedContract = new ethers.Contract(contractAddress, contractABI, signer);
    
            // LISTENER
            connectedContract.on("NewRegister", (from, timestamp, message) => {
            console.log("LISTENER 100 - CONTINUE");
            console.log(from, message);
            },);
          } else {
            console.log("WALLET 404 - NOT FOUND");
          }
        } catch (error) {
          console.log(error)
        }
    };

    const register = async () => {
        if (!window.ethereum) {
          console.log('No Ethereum provider found');
          return;
        }
        try {
        console.log("WALLET 100 - WALLET CHECK")
        const { ethereum } = window;
      
          if (ethereum) {
            const provider = new ethers.BrowserProvider(window.ethereum);
            await provider.send("eth_requestAccounts", []);
            const signer = provider.getSigner();
            const contract  = new ethers.Contract(contractAddress, contractABI, signer);
            console.log("WALLET 103 - GAS CHECK")
            if (!message) {
            enqueueSnackbar("Please enter a message", { variant: "error" });
            return;
            }
            setLoading(true);
            try {
            const tx = await contract.register(message);
            await tx.wait();
            enqueueSnackbar("Successfully registered message", { variant: "success" });
            setMessage("");
            } catch (error) {
              enqueueSnackbar("Error registering message. Please try again later.", {
              variant: "error",
              });
            console.log(error);
            }
          } else {
            console.log("WALLET 404 - NOT FOUND");
        }
      } catch (error) {
        console.log(error);
    }
    setLoading(false);
    };

    const switchNetwork = async () => {
        if (window.ethereum) {
          try {
            await window.ethereum.request({
              method: 'wallet_switchEthereumChain',
              params: [{ chainId: '0x13881' }],
            });
          } catch (error) {
            if (error.code === 4902) {
              try {
                await window.ethereum.request({
                  method: 'wallet_addEthereumChain',
                  params: [
                    {	
                      chainId: '0x13881',
                      chainName: 'Polygon Mumbai Testnet',
                      rpcUrls: ['https://rpc-mumbai.maticvigil.com/'],
                      nativeCurrency: {
                          name: "Mumbai Matic",
                          symbol: "MATIC",
                          decimals: 18
                      },
                      blockExplorerUrls: ["https://mumbai.polygonscan.com/"]
                    },
                  ],
                });
              } catch (error) {
                console.log(error);
              }
            }
            console.log(error);
          }
        } else {
        alert('WALLET 404 - NOT FOUND');
        return;
        } 
    };

    useEffect(() => {
        checkIfWalletIsConnected();
    }, []);

    // ACCT OPS
    useEffect(() => {
        if (network === 'Polygon Mumbai Testnet') {
        }
    }, [currentAccount, network]);

    // RENDERING NOT CONNECTED
    const renderNotConnectedContainer = () => {
        try {
            const { ethereum } = window;
    
        if (!ethereum) {
            console.log('WALLET 404 - Not Found LOCAL');
        } else {
            return (
              <div className="connect-wallet-container">
                <div className="form-container">
                  <div className='neutral-wallet'><h4>STEP 1: Setup a Wallet app</h4></div>
                  <Box sx={{ textAlign: "center", my: 5 }}>
                    <Button  variant="contained" color="primary" onClick={() => window.open(CBWalletURL, '_blank')}>COINBASE</Button>
                    <br />
                    <br />
                    <Button  variant="contained" color="warning" onClick={() => window.open(MetaMaskURL, '_blank')}>METAMASK</Button>
                  </Box>
                  <div className='neutral-wallet'><h4>STEP 2: Connect a Wallet</h4></div>
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
        }
        } catch (error) {
        console.log(error)
        }
    };

    const renderInput = () => {
        // IF NOT ON MUMBAI
        if (network !== 'Polygon Mumbai Testnet') {
            return (
              <div>
                  <div className="connect-wallet-container">
                    <div className="zero-row">
                      <div className='neutral-wallet'><h4>STEP 3: Switch network</h4></div>
                      <Button onClick={() => { switchNetwork(); refreshPage(); }} variant="contained" color="secondary">
                      <img className="logo" src={mumbaiLogo} alt="polygon logo grey"/>POLYGON MUMBAI
                      </Button>
                    </div>
                  </div>
                  <div className="zero-row">
                  {/* Return the current Wallet */}
                  { currentAccount ? <div className={ network.includes("Polygon") ? "poly-wallet" : "eth-wallet"}><img alt="Network logo" className="logo" src={ network.includes("Polygon") ? polygonLogo : ethLogo} /> {currentAccount.slice(0, 6)}...{currentAccount.slice(-4)} </div> : <Button variant='error'> Not connected </Button> }	
                </div>
            </div>
            );
        } return (
            <div className="lab-container">
                <h3>Sign-up here for future give-aways!</h3>
                <p>You can even include a message to contact me directly.</p>
                <div className='form-container'>
                  <Grid container spacing={2} sx={{ mt: 1 }}>
                    <Grid item xs={10} sm={8}>
                      <TextField
                        fullWidth
                        variant="filled"
                        label="Message"
                        style={{
                          borderBottom: '2px solid #750691',
                          backgroundColor: 'grey',
                        }}
                        value={message}
                        background-color="white"
                        onChange={(e) => setMessage(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={8} sm={4}>
                      <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        disabled={loading}
                        onClick={register}
                      >
                        Register
                      </Button>
                      <br />
                      <Button
                        fullWidth
                        variant="contained"
                        color="secondary"
                        onClick={() => window.open(SCAN_LINK, '_blank')}
                      >
                        PolygonScan
                      </Button>
                    </Grid>
                  </Grid>
              </div>
              <div className="zero-row">
              { currentAccount ? <div className={ network.includes("Polygon") ? "poly-wallet" : "eth-wallet"}><img alt="Network logo" className="logo" src={ network.includes("Polygon") ? polygonLogo : ethLogo} /> {currentAccount.slice(0, 6)}...{currentAccount.slice(-4)} </div> : <Button variant='error'> Not connected </Button> }	
            </div>
          </div>
            );
        };

    return (
        <div className="App">
                <Labslab></Labslab>
                <SnackbarProvider maxSnack={3}>
                <ErrorBoundary>
                  <h2>REGISTRATION PORTAL</h2>
                  <div className='form-container'>
                    <div className="mint-container">
                      {!currentAccount && renderNotConnectedContainer()}
                    </div>
                    {currentAccount ? <>
                      <div className='mint-container'>
                        {currentAccount && renderInput()}
                      </div>
                      </> : <></>}
                  </div>
            </ErrorBoundary>
          </SnackbarProvider>
          <Footer />
      </div>
  );
};

export default RegisterSite;