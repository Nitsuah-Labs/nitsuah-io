// IMAGEN - src/app/labs/ai/imagen/page.tsx // TODO
"use client";
import LabFooter from "../../_components/_labs/LabFooter";
import LabNav from "../../_components/_labs/LabNav";
import "../../_components/_styles/labs.css";
import { Connect } from "../../_components/_web3/Connect";
import { Connected } from "../../_components/_web3/Connected";
// UI imports were unused here; keep file minimal until features are added

const ImagenSite = () => {
  return (
    <div className="App">
      <div className="container">
        <div className="form-container">
          <LabNav />
          <h2>IMAGEN AI HERE!</h2>
          <div className="connect-wallet-container">
            <Connect />
          </div>
          <Connected>
            <p>AI UI goes here — connected wallet detected.</p>
          </Connected>
        </div>
        <LabFooter />
      </div>
    </div>
  );
};

export default ImagenSite;
