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
        <LabNav />
        <main style={{ paddingBottom: "80px" }}>
          <h1>TOKEN MAKER HERE!</h1>
          <div className="form-container">
            <div className="labs-card labs-spacing-md">
              <div className="labs-card-header">
                <h2 className="labs-card-title">Connect Wallet</h2>
              </div>
              <div className="labs-card-body">
                <Connect />
              </div>
            </div>

            <Connected>
              <div className="labs-card labs-spacing-md">
                <div className="labs-card-body">
                  <p>Token UI goes here — connected wallet detected.</p>
                  <p
                    style={{
                      opacity: 0.7,
                      fontSize: "0.9rem",
                      marginTop: "10px",
                    }}
                  >
                    This feature is under development.
                  </p>
                </div>
              </div>
            </Connected>
          </div>
        </main>
        <LabFooter />
      </div>
    </div>
  );
};

export default TokenSite;
