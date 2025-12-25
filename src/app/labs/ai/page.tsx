// IMAGEN - src/app/labs/ai/imagen/page.tsx // TODO
"use client";

import LabFooter from "../../_components/_labs/LabFooter";
import LabNav from "../../_components/_labs/LabNav";
import LabSubNav from "../../_components/_labs/LabSubNav";
import "../../_components/_styles/labs.css";
import { Connect } from "../../_components/_web3/Connect";
import { Connected } from "../../_components/_web3/Connected";
// UI imports were unused here; keep file minimal until features are added

const ImagenSite = () => {
  return (
    <div className="App">
      <div className="container">
        <LabNav />
        <LabSubNav />
        <main
          id="main"
          role="main"
          aria-label="AI Lab Content"
          style={{ paddingBottom: "80px" }}
        >
          <h1>IMAGEN AI HERE!</h1>
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
                  <p>AI UI goes here — connected wallet detected.</p>
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

export default ImagenSite;
