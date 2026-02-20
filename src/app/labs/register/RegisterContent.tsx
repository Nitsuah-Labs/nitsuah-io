"use client";

import { useEffect, useState } from "react";
import "../../_components/_styles/labs.css";

export default function RegisterContent() {
  const [mounted, setMounted] = useState(false);
  // Always check this - it's baked in at build time
  const testHelpersMode = process.env.NEXT_PUBLIC_TEST_HELPERS === "1";

  useEffect(() => {
    setMounted(true);
  }, []);

  // Render test helpers UI immediately if in test mode - don't call wagmi hooks
  if (testHelpersMode) {
    return (
      <>
        <h1>REGISTRATION PORTAL</h1>
        <div className="form-container">
          <div className="mint-container">
            <div className="labs-card">
              <div className="labs-card-header">
                <h2 className="labs-card-title">Connect Wallet</h2>
              </div>
              <div className="labs-card-body">
                <div
                  data-testid="register-test-helpers"
                  style={{
                    marginTop: "16px",
                    display: "flex",
                    gap: "12px",
                    flexDirection: "column",
                  }}
                >
                  <button
                    className="labs-btn labs-btn-primary"
                    aria-label="Connect Wallet"
                    data-testid="register-connect-button"
                    type="button"
                  >
                    Connect Wallet
                  </button>
                  <div data-testid="network-info">testnet</div>
                  <input
                    type="text"
                    placeholder="domain"
                    aria-label="domain-input"
                    data-testid="domain-input"
                    disabled
                    style={{ padding: "8px", borderRadius: "6px" }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  // Show loading state until mounted
  if (!mounted) {
    return (
      <>
        <h1>REGISTRATION PORTAL</h1>
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

  // Production mode - use real wagmi component
  // Import lazily to avoid loading wagmi in test mode
  const RegisterContentProduction =
    require("./RegisterContentProduction").default;
  return <RegisterContentProduction />;
}
