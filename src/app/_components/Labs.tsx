import React, { useEffect, useState } from "react";
import '../styles/labs.css';
import Labslab from '../components/Labslab';
import { Button, TextField, Grid, Box } from '@mui/material';
import Footer from '../_components/Footer';
import mumbaiLogo from '../../assets/mumbai.png';
import ethLogo from '../../assets/ethlogo.png';

const MetaMaskURL = "https://metamask.io/download/";
const CBWalletURL = "https://chrome.google.com/webstore/detail/coinbase-wallet-extension/hnfanknocfeofbddgcijnmhnfnkdnaad";

function Lab() {

	// CONSTANTS
	const [currentAccount, setCurrentAccount] = useState('');
	const [network, setNetwork] = useState('');

	function refreshPage() {
		window.location.reload(false);
	  }

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
			console.log('WALLET 403 - Not Connected');
			return;
		}
		const chainId = await ethereum.request({ method: 'eth_chainId' });
			setNetwork(networks[chainId]);

			ethereum.on('chainChanged', handleChainChanged);
			
			// Reload the page when they change networks
			function handleChainChanged(_chainId) {
			window.location.reload();
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

	// DETECT NW/ACCT SHIFT
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
				  <div>
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
				</div>
				);
		}
		} catch (error) {
		console.log(error)
		}
	}

	const renderInput = () => {
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
		}
		
		return (
			<div>
			<table>
				<thead></thead>
				<tbody>
				<tr>
					<th scope="col"><div className="h4">NETWORK</div></th>
					<td scope="row"><div className="mumbai-wallet"><h2><img className="logo" src={mumbaiLogo} alt="Polygon logo" />MUMBAI</h2></div></td>
				</tr>
				<tr>
					<th scope="col"><div className="h4">FUNDS</div></th>
					<td scope="row"><div className="purp-wallet"onClick={() => window.open("https://wiki.polygon.technology/docs/develop/tools/matic-faucet/")} ><h4><img className="logo" src={mumbaiLogo} alt="Polygon logo"/>FAUCET</h4></div></td>
				</tr>
				<tr>
					<th scope="col"><div className="h4">SIGNUP</div></th>
					<td><div className="purp-wallet" onClick={() => window.open("/labs/register", '_self')}><h4>REGISTER</h4></div></td>		
				</tr>
				<tr>
					<th scope="col"><div className="h4">MINT</div></th>
					<td><div className="purp-wallet" onClick={() => window.open("/labs/mint", '_self')}><h4>LANDPLOT</h4></div></td>
				</tr>
				<tr>
					<th scope="col"><div className="h4">DOMAINS</div></th>
					<td><div className="purp-wallet" onClick={() => window.open("/labs/domains", '_self')}><h4>SUBDOMAIN</h4></div></td>
				</tr>
				<tr>
					<th><div className="eth-wallet" onClick={() => window.open("/", '_self')}><h4>GO HOME</h4></div></th>
				</tr>
				</tbody>
				<tfoot></tfoot>
			</table>
			</div>
		);
	}

	return (
	<div className="App">
		<Labslab />
		<h2>LABS HOME</h2>
		<div className="form-container">
			<div className="mint-container">
				{!currentAccount && renderNotConnectedContainer()}
			</div>
			<div className='mint-container'>
				{currentAccount && renderInput()}
			</div>
		</div>
		<div className='footer-container'>
			<Footer />
		</div>
	</div>
	);
}
  
export default Lab;