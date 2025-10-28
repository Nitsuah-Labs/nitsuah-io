// Token - src/app/labs/token/page.tsx //TODO
"use client";

// LAB STYLES
import LabFooter from "../../_components/_labs/LabFooter";
import LabNav from "../../_components/_labs/LabNav";
import "../../_components/_styles/labs.css";
import { Connect } from "../../_components/_web3/Connect";
import { Connected } from "../../_components/_web3/Connected";

const TokenSite = () => {
  return (
    <div className="App">
      <div className="container">
        <div className="form-container">
          <LabNav />
          <h2>TOKEN MAKER HERE!</h2>
          <div className="connect-wallet-container">
            <Connect />
          </div>
          <Connected>
            <p>Token UI goes here — connected wallet detected.</p>
          </Connected>
        </div>
        <LabFooter />
      </div>
    </div>
  );
};

export default TokenSite;
