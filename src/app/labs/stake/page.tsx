// STAKE - src/app/labs/stake/page.tsx //TODO
'use client'
import React, { useEffect, useState } from "react";
import Image from 'next/image';
import { Button, TextField, Grid, Box } from '@mui/material';

// LAB STYLES
import "../../_components/_styles/labs.css";
import LabNav from '../../_components/_labs/LabNav';
import LabFooter from '../../_components/_labs/LabFooter';

const StakeSite = () => {
	return (
		<div className="App">
			<div className="container">
			<div className='form-container'>
				<LabNav />
        		<h2>STAKING HERE!</h2>
			</div>
			<LabFooter />
		  </div> 
    </div>
	);
};
  
export default StakeSite;