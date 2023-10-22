import React, { useEffect, useState } from "react";
import "../_components/_styles/labs.css";
import polygonLogo from '../../../assets/polygonlogo.png';
import mumbaiLogo from '../../../assets/mumbai.png';
import ethLogo from '../../../assets/ethlogo.png';
import { Button, TextField, Grid, Box } from '@mui/material';
import { networks } from '../../../../../../nitsuah/LAB/labs/utils/networks';
import Image from 'next/image';

const settings = ['LOGOUT',];

const OPENSEA_URL = "https://testnets.opensea.io/assets/";
const NETSCAN_URL = "https://mumbai.polygonscan.com/tx/";
const SCAN_LINK = "https://mumbai.polygonscan.com/address/";
const OPENSEA_LINK = "https://testnets.opensea.io/collection/";
const MetaMaskURL = "https://metamask.io/download/";
const CBWalletURL = "https://chrome.google.com/webstore/detail/coinbase-wallet-extension/hnfanknocfeofbddgcijnmhnfnkdnaad/";


const WalletPanel = () => {
    const [currentAccount, setCurrentAccount] = useState('');
    const [network, setNetwork] = useState('');
	
    const connectWallet = async () => {
		try {
		const { ethereum } = window;

		if (!ethereum) {
			const key = props.enqueueSnackbar('No connection!', { 
				variant: 'error',
				persist: true,
			});
        	console.log('WALLET 404 - Not Found NAVBAR');
			return;
		}
				
		const accounts = await ethereum.request({ method: "eth_requestAccounts" });

		setCurrentAccount(accounts[0]);
		} catch (error) {
			alert(error);
		}
	}

	const checkIfWalletIsConnected = async () => {
		const { ethereum } = window;

		if (!ethereum) {
			console.log('WALLET 404 - Not Found');
			return;
		} else {
			console.log('Wallet Found', ethereum);
		}

		const accounts = await ethereum.request({ method: 'eth_accounts' });

		if (accounts.length !== 0) {
			const account = accounts[0];
			console.log('Account Found:', account);
			setCurrentAccount(account);
		} else {
			console.log('Wallet 403 - Not Connected');
			return;
		}
		const chainId = await ethereum.request({ method: 'eth_chainId' });
			setNetwork(network[chainId]);

			ethereum.on('chainChanged', handleChainChanged);
			
			// Reload the page when they change networks
			function handleChainChanged(_chainId) {
			window.location.reload();
			}
	};

	const switchNetwork = async () => {
		if (window.ethereum) {
		  try {
			// Try to switch to the Mumbai testnet
			await window.ethereum.request({
			  method: 'wallet_switchEthereumChain',
			  params: [{ chainId: '0x13881' }], // Check networks.js for hexadecimal network ids
			});
		  } catch (error) {
			// This error code means that the chain we want has not been added to MetaMask
			// In this case we ask the user to add it to their MetaMask
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
		  // If window.ethereum is not found then MetaMask is not installed
		  alert('MetaMask is not installed. Please install it to use this app: https://metamask.io/download.html');
		} 
	}
    
    useEffect(() => {
		checkIfWalletIsConnected();
	}, []);

	// This will run any time currentAccount or network are changed
	useEffect(() => {
		if (network === 'Polygon Mumbai Testnet') {
		}
	}, [currentAccount, network]);

    // Render methods
	const renderNotConnectedContainer = () => (
		<div className="connect-wallet-container">
        {/* Call the connectWallet function we just wrote when the button is clicked */}
		<button onClick={connectWallet} className="cta-button connect-wallet-button"><div className="connect-wallet-container img">Connect Wallet</div></button>
		</div>
	);
	
	const renderSwitch = () => {
		// If not on Polygon Mumbai Testnet, render the switch button
		if (network !== 'Polygon Mumbai Testnet') {
			return (
				<div>
				<div className="connect-wallet-container">
				  <div className="zero-row">
					<div className='neutral-wallet'><h4>STEP 3: Switch network</h4></div>
					<Button onClick={() => { switchNetwork(); }} variant="contained" color="secondary">
					<Image className="logo" src={mumbaiLogo} alt="polygon logo grey"/>POLYGON MUMBAI
					</Button>
				  </div>
				</div>
				<div className="zero-row">
					{/* Return the current Wallet */}
					{ currentAccount ? <div className={ network.includes("Polygon") ? "poly-wallet" : "eth-wallet"}><Image alt="Network logo" className="logo" src={ network.includes("Polygon") ? polygonLogo : ethLogo} /> {currentAccount.slice(0, 6)}...{currentAccount.slice(-4)} </div> : <Button typeof='error'> Not connected </Button> }	
				</div>
		  </div>
			);
		}
        return (
            <div className="form-container">
            </div>
          );
        }

return (
    <div className="connect-wallet-container">
			<Box sx={{ flexGrow: 0 }}>
				{!currentAccount && renderNotConnectedContainer()}
				{/* Render the input form if an account is connected */}
				<div className="zero-row">
						{/* Return the current Wallet */}
						{ currentAccount ? <div className={ network.includes("Polygon") ? "poly-wallet" : "eth-wallet"}><Image alt="Network logo" className="logo" src={ network.includes("Polygon") ? polygonLogo : ethLogo} /> {currentAccount.slice(0, 6)}...{currentAccount.slice(-4)} </div> : <Button typeof='error'> Not connected </Button> }	
					</div>
			</Box>
    </div>
);
}

export default WalletPanel;
