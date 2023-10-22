import React, { useEffect, useState } from "react";
import './styles/labs.css';
import { SnackbarProvider, useSnackbar } from 'notistack';
import Labslab from './components/Labslab.jsx';
import Footer from './components/footer';
import { Button, TextField, Grid, Box } from '@mui/material';
import { ethers } from 'ethers';
import { networks } from './utils/networks';
import mintABI from './utils/mintABI.json';
import nftPreview from './assets/nlab-m1-img.svg';
import ethLogo from '../../assets/ethlogo.png';
import polygonLogo from '../../assets/polygonlogo.png';
import mumbaiLogo from '../../assets/mumbai.png';

// CONSTANTS
const OPENSEA_URL = "https://testnets.opensea.io/assets/";
const NETSCAN_URL = "https://mumbai.polygonscan.com/tx/";
const SCAN_LINK = "https://mumbai.polygonscan.com/address/0x22FACFbf9dd893Ec8a0aF6d0764c9d30b27D5Bc3";
const OPENSEA_LINK = "https://testnets.opensea.io/collection/nitsuahlabs-motivewords";
const MetaMaskURL = "https://metamask.io/download/";
const CBWalletURL = "https://chrome.google.com/webstore/detail/coinbase-wallet-extension/hnfanknocfeofbddgcijnmhnfnkdnaad/";
const CONTRACT_ADDRESS = "0x22FACFbf9dd893Ec8a0aF6d0764c9d30b27D5Bc3";
const contractABI = mintABI.abi;
const TOTAL_MINT_COUNT = 10;

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

const MintSite = ({ CONTRACT_ADDRESS, provider, signer }) => {
    const { enqueueSnackbar } = useSnackbar();
    const [currentAccount, setCurrentAccount] = useState('');
    const [network, setNetwork] = useState('');
    const [mintAmt, setMintAmt] = useState(1);
    const [minting, setMinting] = useState(false);
    const [minted, setMinted] = useState(false);
    const [mintTx, setMintTx] = useState('');
    const [mintError, setMintError] = useState('');
    const [mintSuccess, setMintSuccess] = useState(false);
    const [mintSuccessMsg, setMintSuccessMsg] = useState('');
    const [mintErrorMsg, setMintErrorMsg] = useState('');
    const [mintSuccessTx, setMintSuccessTx] = useState('');
    const [mintSuccessTxUrl, setMintSuccessTxUrl] = useState('');

    const getBackgroundSize = () => {
        return { backgroundSize: `${(mintAmt * 100) / TOTAL_MINT_COUNT}% 100%` };
    };

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
        try {
          const { ethereum } = window;
    
          if (ethereum) {
            const provider = new ethers.providers.Web3Provider(ethereum);
            const signer = provider.getSigner();
            const connectedContract = new ethers.Contract(CONTRACT_ADDRESS, contractABI, signer);
    
            // LISTENER
            connectedContract.on("freshMint", (from, tokenId) => {
              console.log(from, tokenId.toNumber())
              alert(`NFT MINTED n/ Here's the link: ${OPENSEA_URL}${CONTRACT_ADDRESS}/${tokenId.toNumber()}`)
            });
    
            console.log("LISTENER 100 - CONTINUE")
    
          } else {
            console.log("WALLET 404 - NOT FOUND");
          }
        } catch (error) {
          console.log(error)
        }
    };

    const pushNft = async () => {
        try {
        console.log("WALLET 100 - WALLET CHECK")
        const { ethereum } = window;
      
          if (ethereum) {
            const provider = new ethers.BrowserProvider(window.ethereum);
            await provider.send("eth_requestAccounts", []);
            const signer = provider.getSigner();
            const LabNFT = new ethers.Contract(CONTRACT_ADDRESS, contractABI, signer);
            console.log("WALLET 103 - GAS CHECK")
            let nftTxn = await LabNFT.mintNFT(mintAmt);
            console.log("CHAIN 201 - Created & mining")
            await nftTxn.wait();
            console.log(`CHAIN 202 - ${NETSCAN_URL}${nftTxn.hash}`);
          } else {
            console.log("WALLET 404 - NOT FOUND");
        }
      } catch (error) {
        console.log(error)
    }
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
                <div className='form-container'>
                    <img alt="nft-preview-svg" className="nft-preview" src={nftPreview} />
                    <input
                              type="range"
                              min="1"
                              max={TOTAL_MINT_COUNT}
                              start={1}
                              style={getBackgroundSize()}
                              value={mintAmt}
                              onChange={e => setMintAmt(e.target.value)}
                          />
                    <div className={ network.includes("Polygon") ? "poly-wallet" : "eth-wallet"}><img alt="Network logo" className="logo" src={ network.includes("Polygon") ? polygonLogo : ethLogo} /> {currentAccount.slice(0, 6)}...{currentAccount.slice(-4)} </div>
                    <div className="zero-row">
                      <Grid container spacing={4} sx={{ mt: 1 }}>
                      <Grid item xs={16} sm={16}>
                          <Button
                            fullWidth="false"
                            variant="contained"
                            color="error"
                            /* onClick={pushNft} */ //TODO - fix NFT GAS
                          >
                            <h4>MINT x {mintAmt}</h4>
                          </Button>
                      <Button
                        fullWidth
                        variant="contained"
                        color="secondary"
                        onClick={() => window.open(SCAN_LINK, '_blank')}
                      >
                        PolygonScan
                      </Button>
                      <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        onClick={() => window.open(OPENSEA_LINK, '_blank')}
                      >
                        OpenSea
                      </Button>
                      </Grid>
                      </Grid>
                      </div>
                      </div>
              </div>
            );
        };

    return (
      <div className="App">
        <Labslab></Labslab>
        <h2>MINT PORTAL</h2>
        <SnackbarProvider maxSnack={3}>
        <ErrorBoundary>
          <div className="form-container">
            <div className="mint-container">
            {!currentAccount && renderNotConnectedContainer()}
            </div>
            {currentAccount ? <>
              <div className='mint-container'>
                  {currentAccount && renderInput()}
              </div>
              </> : <></>}
              <Footer />
            </div>
              </ErrorBoundary>
          </SnackbarProvider>
          </div>
  );
};

export default MintSite;