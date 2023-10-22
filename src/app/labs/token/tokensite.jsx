import React from "react";
import './styles/labs.css';
import { SnackbarProvider } from 'notistack';
import Labslab from './components/Labslab.jsx';
import Footer from './components/footer';

const TokenSite = () => {
	return (
		<div className="App">
			<div className="container">
			<div className='form-container'>
			<SnackbarProvider maxSnack={3}>
			<Labslab />
			</SnackbarProvider>
        <h2>TOKENS HERE!</h2>
			  </div>
			  <Footer />
		  </div> 
    </div>
	);
};
  
export default TokenSite;