// DOMAINS - src/app/labs/domains/page.tsx //FIXME - props/etc
'use client'
import React, { useEffect, useState } from "react";
import Image from 'next/image';
import { Button, TextField, Grid, Box } from '@mui/material';

// LAB STYLES
import "../../_components/_styles/labs.css";
import LabNav from '../../_components/_labs/LabNav';
import LabFooter from '../../_components/_labs/LabFooter';

// LAB ASSETS
import mumbai from '../../_components/_web3/_assets/mumbai.png';	
import polygonLogo from '../../_components/_web3/_assets/polygonlogo.png';
import ethLogo from '../../_components/_web3/_assets/ethlogo.png';

// CONSTANTS
const tld = '.nitsuah.eth';
const SCAN_LINK = "https://mumbai.polygonscan.com/address/0xBbDF8C47BC3FF87aaC2396493C3F98a89C399163";
const OPENSEA_LINK = "https://testnets.opensea.io/collection/nitsuah-name-service-grnrwqs5vq";
const CONTRACT_ADDRESS = '0xBbDF8C47BC3FF87aaC2396493C3F98a89C399163';
const MetaMaskURL = "https://metamask.io/download/";
const CBWalletURL = "https://chrome.google.com/webstore/detail/coinbase-wallet-extension/hnfanknocfeofbddgcijnmhnfnkdnaad/";

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

const DomainSite = () => {
	const [currentAccount, setCurrentAccount] = useState('');
	const [domain, setDomain] = useState('');
  	const [record, setRecord] = useState('');
	const [network, setNetwork] = useState('');
	const [editing, setEditing] = useState(false);
	const [loading, setLoading] = useState(false);

	// Add a stateful array at the top next to all the other useState calls
	const [mints, setMints] = useState([]);

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
			console.log('Wallet 403 - Not Connected');
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

	const mintDomain = async () => {
		// Don't run if the domain is empty
		if (!domain) {
			alert('Domain cannot be empty');
			return;
		}

		// Alert the user if the domain is too long
		if (domain.length > 6) {
			alert('Domain cannot be more than 6 characters long');
			return;
		}

		// Special Character control
		function containsSpecialChars(str) {
			const specialChars = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
			return specialChars.test(str);
		  }

		if (containsSpecialChars(domain)) {
			alert('⛔️ Domain cannot contain special characters');
			return;
		  }

		// Calculate price based on length of domain (change this to match your contract)	
		// 1 chars = 100 MATIC, 2 chars = 50 MATIC, 3 chars = 25 MATIC, 4 chars = 12 MATIC, 5 or more = 10 MATIC
		const price = domain.length === 1 ? '1' : domain.length === 2 ? '.5' : domain.length === 3 ? '.2' : domain.length === 4 ? '.1' : '.1';
		console.log("MINTING DOMAIN:", domain, " PRICE:", price);
		try {
			const { ethereum } = window;
			if (ethereum) {
				const provider = new ethers.providers.Web3Provider(ethereum);
				const signer = provider.getSigner();
				const contract = new ethers.Contract(CONTRACT_ADDRESS, contractAbi.abi, signer);

				console.log("Going to pop wallet now to pay gas...")
				let tx = await contract.register(domain, {value: ethers.utils.parseEther(price)});
				// Wait for the transaction to be mined - //TODO - replace with snackbar
					alert("Confirming mint - please dont refresh! https://mumbai.polygonscan.com/tx/"+tx.hash);
					const receipt = await tx.wait();

				// Check if the transaction was successfully completed
				if (receipt.status === 1) {
					alert("Domain minted! https://mumbai.polygonscan.com/tx/"+tx.hash);
					
					// Set the record for the domain
					tx = await contract.setRecord(domain, record);
					await tx.wait();

					alert("Record set! https://mumbai.polygonscan.com/tx/"+tx.hash);
        
					// Call fetchMints after 2 seconds
					setTimeout(() => {
					  fetchMints();
					}, 4000);
			
					setRecord('');
					setDomain('');
				  } else {
					alert("Transaction failed! Please try again");
				  }
				  }
				} catch(error) {
				  alert(error);
			}
		}

	// Add this function anywhere in your component (maybe after the mint function)
	const fetchMints = async () => {
		try {
		const { ethereum } = window;
		if (ethereum) {
			// TODO - THIS IS BROKEN CURRENTLY!
			const provider = new ethers.providers.Web3Provider(ethereum);
			const signer = provider.getSigner();
			const contract = new ethers.Contract(CONTRACT_ADDRESS, contractAbi.abi, signer);
			
			// Get all the domain names from our contract
			const names = await contract.getAllNames();
			
			// For each name, get the record and the address
			const mintRecords = await Promise.all(names.map(async (name) => {
			const mintRecord = await contract.records(name);
			const owner = await contract.domains(name);
			return {
			id: names.indexOf(name),
			name: name,
			record: mintRecord,
			owner: owner,
			};
		}));
	
		console.log("MINTS FETCHED ", mintRecords);
		setMints(mintRecords);
		}
		} catch(error){
		console.log(error);
		}
	}

	useEffect(() => {
		checkIfWalletIsConnected();
	}, []);

	// This will run any time currentAccount or network are changed
	useEffect(() => {
		if (network === 'Polygon Mumbai Testnet') {
		fetchMints();
		}
	}, [currentAccount, network]);
	
	const updateDomain = async () => {
		if (!record || !domain) { return }
		setLoading(true);
		console.log("Updating domain", domain, "with record", record);
		  try {
		  const { ethereum } = window;
		  if (ethereum) {
			const provider = new ethers.providers.Web3Provider(ethereum);
			const signer = provider.getSigner();
			const contract = new ethers.Contract(CONTRACT_ADDRESS, contractAbi.abi, signer);
	  
			let tx = await contract.setRecord(domain, record);
			await tx.wait();
			console.log("Record set https://mumbai.polygonscan.com/tx/"+tx.hash);
	  
			fetchMints();
			setRecord('');
			setDomain('');
		  }
		  } catch(error) {
			console.log(error);
		  }
		setLoading(false);
	  }

	// Render methods
	const renderNotConnectedContainer = () => (
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
	
	const renderInputForm = () => {
		// If not on Polygon Mumbai Testnet, render the switch button
		if (network !== 'Polygon Mumbai Testnet') {
			return (
              <div>
                  <div className="connect-wallet-container">
                    <div className="zero-row">
                      <div className='neutral-wallet'><h4>STEP 3: Switch network</h4></div>
                      <Button onClick={() => { switchNetwork(); refreshPage(); }} variant="contained" color="secondary">
                      <img className="logo" src={mumbai} alt="polygon mumbai logo grey"/>POLYGON MUMBAI
                      </Button>
                    </div>
                  </div>
                <div className="zero-row">
                  <div className={ network.includes("Polygon") ? "poly-wallet" : "eth-wallet"}><img alt="Network logo" className="logo" src={ network.includes("Polygon") ? polygonLogo : ethLogo} /> {currentAccount} </div>
                </div>
            </div>
			);
		}
		
		return (
		  <div className="form-container">
			<div className="zero-row">
				<span  style={{ position: 'relative', display: 'inline-block' }}>
					<img src={icons180} alt="svg icon 180" />
					<h3 style={{
						position: 'absolute',
						bottom: 0,
						right: 0,
						zIndex: 1,
						margin: '10px',
						color: 'white',
						textShadow: '2px 2px 4px #000000',
						}}>
							{domain}{tld}
						</h3>
				</span>
			</div>
			<div className="first-row">
			  <input
				type="text"
				value={domain}
				placeholder="subdomain"
				onChange={e => setDomain(e.target.value)}
			  />
			  <p className='tld' color="black"> {tld} </p>
			</div>
			<input
			  type="text"
			  value={record}
			  placeholder={currentAccount}
			  onChange={e => setRecord(e.target.value)}
			/>
			{/* Return the current Wallet */}
			{ currentAccount ? <div className={ network.includes("Polygon") ? "poly-wallet" : "eth-wallet"}><img alt="Network logo" className="logo" src={ network.includes("Polygon") ? polygonLogo : ethLogo} /> {currentAccount.slice(0, 6)}...{currentAccount.slice(-4)} </div> : <Button variant='error'> Not connected </Button> }
			<div className="zero-row">
					<Grid container spacing={2}>
						<Grid item xs={16} sm={10}>
							{/* If the editing variable is true, return the "Set record" and "Cancel" button */}
							{editing ? (
							<div className="zero-row">
								<button className='cta-button mint-button' disabled={loading} onClick={updateDomain}>SET RECORD</button>
								<button className='cta-button mint-button' onClick={() => {setEditing(false)}}>CANCEL</button>
							</div>) : (<div className="zero-row"><Button fullWidth variant="contained" color="error" disabled={loading} onClick={mintDomain}>MINT</Button></div>)}
						</Grid>
						<Grid item xs={16} sm={10}>
						<Button
							fullWidth
							variant="contained"
							color="secondary"
							onClick={() => window.open(SCAN_LINK, '_blank')}
						>
							PolygonScan
						</Button>
						<br />
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
		);
	  }

	// Add this render function next to your other render functions
	const renderMints = () => {
		if (currentAccount && mints.length > 0) {
		return (
			<div className="long-container">
				<p className="subtitle">RECENT MINTS:</p>
				<div className="mint-list">
					{ mints.map((mint, index) => {
					return (
						<div className="mint-item" key={index}>
						<div className='mint-row'>
							<a className="link" href={`https://testnets.opensea.io/assets/mumbai/${CONTRACT_ADDRESS}/${mint.id}`} target="_blank" rel="noopener noreferrer">
							<p className="underlined">{' '}{mint.name}{tld}{' '}</p>
							</a>
							{/* If mint.owner is currentAccount, add an "edit" button*/}
							{ mint.owner.toLowerCase() === currentAccount.toLowerCase() ?
							<button className="edit-button" onClick={() => editRecord(mint.name)}>
								<img className="edit-icon" src="https://img.icons8.com/metro/26/000000/pencil.png" alt="Edit button" />
							</button>
							:
							null
							}
						</div>
					<p> {mint.record} </p>
				</div>)
				})}
				</div>
			</div>
		);
		}
	};
	
	// This will take us into edit mode and show us the edit buttons!
	const editRecord = (name) => {
		console.log("Editing record for", name);
		setEditing(true);
		setDomain(name);
	}

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

export default DomainSite;