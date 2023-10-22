import React, { useEffect, useState } from "react";
import "../styles/home.css";
import HomeBar from "../components/Homebar";
import HomeFooter from "../components/Footer";
import dao from "../../public/images/dao.png";
import ledger from "../../public/images/ledger.png";
import trail from "../../public/images/trailblazer.png";
import mint from "../../public/images/mint.gif";
import ape from "../../public/images/ape.png";
import gaad from "../../public/images/gaad-poap.gif";
import Button from '@mui/material/Button';
  
const CryptoSite = () => {
	
	return (
		<div className="App">
			<div className="lab-container">
			<HomeBar />
				<div className="form-container">
					<Button onClick={() => window.open("https://www.coinbase.com/livecrypto")} variant="contained" color="primary">
					<h2>#LIVECRYPTO</h2>
					</Button>
					{/* // TODO replace table with GRID */}
					<table>
					<tr>
					<td scope="row">
						<div className="projects-card bg-blur">
						<div className="projects-subtitle"><h4>Trailblazer</h4></div>	
							<img alt="" className="proj-logo" src={trail}  onClick={() => window.open("https://opensea.io/assets/matic/0xb62c2b82a8fe234c96ab1a4c9d50305fd19ef079/259")}/>
						</div>
					</td>
					<td scope="row">
						<div className="projects-card bg-blur">
						<div className="projects-subtitle"><h4>Ledger</h4></div>	
							<img alt="" className="proj-logo" src={ledger}  onClick={() => window.open("https://opensea.io/assets/matic/0xb62c2b82a8fe234c96ab1a4c9d50305fd19ef079/376")}/>
						</div>
					</td>
					</tr>
					<tr>
					<td scope="row">
						<div className="projects-card bg-blur">
						<div className="projects-subtitle"><h4>DAO</h4></div>	
							<img alt="" className="proj-logo" src={dao}  onClick={() => window.open("https://opensea.io/assets/matic/0xc94a4a1a6c12f9c9f56894ba00d99f766a800e39/0")}/>
						</div>
					</td>
					<td scope="row">
						<div className="projects-card bg-blur">
						<div className="projects-subtitle"><h4>#MintMadness</h4></div>	
							<img alt="" className="proj-logo" src={mint}  onClick={() => window.open("https://opensea.io/assets/matic/0xc94a4a1a6c12f9c9f56894ba00d99f766a800e39/2")}/>
						</div>
					</td>
					</tr>
					<tr>
					<td scope="row">
						<div className="projects-card bg-blur">
						<div className="projects-subtitle"><h4>#GAAD</h4></div>	
							<img alt="" className="proj-logo" src={gaad}  onClick={() => window.open("https://app.poap.xyz/token/6633244")}/>
						</div>
					</td>
					</tr>
				</table>
					</div>
				<div className="footer-container">
					<HomeFooter />
				</div>
			</div>
		</div>
	);
};
  
export default CryptoSite;