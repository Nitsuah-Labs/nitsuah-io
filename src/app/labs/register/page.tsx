// REGISTER - src/app/labs/register/page.tsx //REVIEW
import React, { useState } from "react";
import LabNav from '../../_components/_labs/LabNav';
import LabFooter from '../../_components/_labs/LabFooter';
import { Button, TextField, Grid } from '@mui/material';
import registerABI from '../../_components/_labs/_utils/registerABI.json';

// CONSTANTS
const SCAN_LINK = "https://mumbai.polygonscan.com/address/0x94b40dDa4ACfDe42c7B334A60f25a0f86CE163d8";
const contractAddress = "0x94b40dDa4ACfDe42c7B334A60f25a0f86CE163d8";
const contractABI = registerABI.abi;

const RegisterSite = () => {
  const [message, setMessage] = useState("");

  const register = async () => {
    // FIXME Your registration logic here
  };

  const renderInput = () => (
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
              onChange={(e) => setMessage(e.target.value)}
            />
          </Grid>
          <Grid item xs={8} sm={4}>
            <Button
              fullWidth
              variant="contained"
              color="primary"
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
    </div>
  );

  return (
    <div className="App">
      <LabNav />
        <h2>REGISTRATION PORTAL</h2>
        <div className='form-container'>
          <div className="mint-container">
            {renderInput()}
          </div>
        </div>
      <LabFooter />
    </div>
  );
};

export default RegisterSite;
