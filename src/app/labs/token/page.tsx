// Token - src/app/labs/token/page.tsx //TODO
"use client";

// LAB STYLES
import LabFooter from "../../_components/_labs/LabFooter";
import LabNav from "../../_components/_labs/LabNav";
import "../../_components/_styles/labs.css";

const TokenSite = () => {
  return (
    <div className="App">
      <div className="container">
        <div className="form-container">
          <LabNav />
          <h2>TOKEN MAKER HERE!</h2>
        </div>
        <LabFooter />
      </div>
    </div>
  );
};

export default TokenSite;
