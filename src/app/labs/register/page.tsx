// REGISTER - src/app/labs/register/page.tsx
"use client";

export const dynamic = "force-dynamic";

import dynamic_import from "next/dynamic";
import LabFooter from "../../_components/_labs/LabFooter";
import LabNav from "../../_components/_labs/LabNav";
import LabSubNav from "../../_components/_labs/LabSubNav";

const RegisterContent = dynamic_import(() => import("./RegisterContent"), {
  ssr: false,
  loading: () => (
    <div className="App">
      <LabNav />
      <LabSubNav />
      <main
        id="main"
        role="main"
        aria-label="Register Domain Content"
        style={{ paddingBottom: "80px" }}
        tabIndex={-1}
      >
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
      </main>
      <LabFooter />
    </div>
  ),
});

export default function RegisterPage() {
  return <RegisterContent />;
}
