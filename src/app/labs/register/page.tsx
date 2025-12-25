// REGISTER - src/app/labs/register/page.tsx
"use client";

import LabFooter from "../../_components/_labs/LabFooter";
import LabNav from "../../_components/_labs/LabNav";
import LabSubNav from "../../_components/_labs/LabSubNav";
import RegisterContent from "./RegisterContent";

export default function RegisterPage() {
  return (
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
        <RegisterContent />
      </main>
      <LabFooter />
    </div>
  );
}
