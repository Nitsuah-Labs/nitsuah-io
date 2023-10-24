// LOOKUP - src/app/labs/lookup/page.tsx  //TODO
'use client'
import React, { useEffect, useState } from "react";
import "../_components/_styles/labs.css";
import LabNav from '../../_components/_labs/LabNav';
import LabFooter from '../../_components/_labs/LabFooter';
import { Button, TextField, Grid, Box } from '@mui/material';

import Image from 'next/image';

const NSLookupSite = () => {
	return (
		<div className="App">
			<div className="container">
			<div className='form-container'>
			<LabNav />
       			 <h2>LOOKUP HERE!</h2>
			  </div>
			<LabFooter />
		  </div> 
    </div>
	);
};
  
export default NSLookupSite;