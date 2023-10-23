'use client'
import React from "react";
import '../../_components/_styles/labs.css';
import { SnackbarProvider } from 'notistack';
import Labslab from './components/Labslab.jsx';
import Footer from './components/footer';

const DaoSite = () => {
	return (
		<div className="App">
			<div className="container">
			<div className='form-container'>
			<SnackbarProvider maxSnack={3}>
			<Labslab />
			</SnackbarProvider>
        		<h2>DAO HERE!</h2>
			  </div>
			  <Footer />
		  </div> 
    </div>
	);
};
  
export default DaoSite;