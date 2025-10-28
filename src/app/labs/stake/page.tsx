// STAKE - src/app/labs/stake/page.tsx //TODO
"use client";

// LAB STYLES
import LabFooter from "../../_components/_labs/LabFooter";
import LabNav from "../../_components/_labs/LabNav";
import "../../_components/_styles/labs.css";
import { Connect } from "../../_components/_web3/Connect";
import { Connected } from "../../_components/_web3/Connected";

const StakeSite = () => {
  return (
    <div className="App">
      <div className="container">
        <LabNav />
        <div className="form-container">
          <h2>STAKING HERE!</h2>

          <div className="labs-card labs-spacing-md">
            <div className="labs-card-header">
              <h3 className="labs-card-title">Connect Wallet</h3>
            </div>
            <div className="labs-card-body">
              <Connect />
            </div>
          </div>

          <Connected>
            <div className="labs-card labs-spacing-md">
              <div className="labs-card-body">
                <p>Staking UI goes here — connected wallet detected.</p>
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
        <LabFooter />
      </div>
    </div>
  );
};

export default StakeSite;
