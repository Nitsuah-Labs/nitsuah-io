// LOOKUP - src/app/labs/lookup/page.tsx  //TODO
"use client";

// LAB STYLES
import LabFooter from "../../_components/_labs/LabFooter";
import LabNav from "../../_components/_labs/LabNav";
import LabsSignedOut from "../../_components/_labs/LabsSignedOut";
import LabSubNav from "../../_components/_labs/LabSubNav";
import "../../_components/_styles/labs.css";
import { Connected } from "../../_components/_web3/Connected";

// LAB ASSETS (unused logos removed until needed)

const NSLookupSite = () => {
  return (
    <div className="App">
      <div className="container">
        <LabNav />
        <LabSubNav />
        <main
          id="main"
          role="main"
          aria-label="Lookup Content"
          style={{ paddingBottom: "80px" }}
        >
          <h1>LOOKUP HERE!</h1>
          <div className="form-container">
            <LabsSignedOut />

            <Connected>
              <div className="labs-card labs-spacing-md">
                <div className="labs-card-body">
                  <p>Lookup UI goes here — connected wallet detected.</p>
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

export default NSLookupSite;
