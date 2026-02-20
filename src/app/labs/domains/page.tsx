// DOMAINS - cleaned implementation
"use client";

import { useEffect, useState } from "react";
import "../../_components/_styles/labs.css";

// LAB STYLES
import DomainsNotConnected from "../../_components/_labs/DomainsNotConnected";
import LabFooter from "../../_components/_labs/LabFooter";
import LabNav from "../../_components/_labs/LabNav";
import LabSubNav from "../../_components/_labs/LabSubNav";

// Test mode stub component
const DomainsContentTest = (): React.ReactElement => {
  return (
    <>
      <h1>SUB-DOMAIN PORTAL</h1>
      <div className="form-container">
        <div className="mint-container">
          <div data-testid="domains-test-helpers" style={{ marginTop: 12 }}>
            <div data-testid="network-info">Network: testnet</div>
          </div>
          <DomainsNotConnected />
        </div>
      </div>
    </>
  );
};

// Inner component that conditionally loads production or test version
const DomainsContent = (): React.ReactElement => {
  const [mounted, setMounted] = useState(false);
  const testHelpersMode = process.env.NEXT_PUBLIC_TEST_HELPERS === "1";

  useEffect(() => {
    setMounted(true);
  }, []);

  // Show loading state until mounted
  if (!mounted) {
    return (
      <>
        <h1>SUB-DOMAIN PORTAL</h1>
        <div className="form-container">
          <div className="mint-container">
            <div className="labs-card">
              <div className="labs-card-header">
                <h2 className="labs-card-title">Loading...</h2>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  // Render test stub in test mode - don't call wagmi hooks to avoid crashes
  if (testHelpersMode) {
    return <DomainsContentTest />;
  }

  // Production mode - load real wagmi component
  // Import lazily to avoid loading wagmi in test mode
  const DomainsContentProduction =
    require("./DomainsContentProduction").default;
  return <DomainsContentProduction />;
};

// Wrapper component that always renders layout
const DomainSite = (): React.ReactElement => {
  return (
    <div className="App">
      <LabNav />
      <LabSubNav />
      <main
        id="main"
        role="main"
        aria-label="Domains Content"
        style={{ paddingBottom: "80px" }}
      >
        <DomainsContent />
      </main>
      <LabFooter />
    </div>
  );
};

export default DomainSite;
