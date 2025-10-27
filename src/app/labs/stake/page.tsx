// STAKE - src/app/labs/stake/page.tsx //TODO
"use client";

// LAB STYLES
import LabFooter from "../../_components/_labs/LabFooter";
import LabNav from "../../_components/_labs/LabNav";
import "../../_components/_styles/labs.css";

const StakeSite = () => {
  return (
    <div className="App">
      <div className="container">
        <div className="form-container">
          <LabNav />
          <h2>STAKING HERE!</h2>
        </div>
        <LabFooter />
      </div>
    </div>
  );
};

export default StakeSite;
