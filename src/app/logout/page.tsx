"use client";

export const dynamic = "error";

import dynamic_import from "next/dynamic";
import Footer from "../_components/_site/Footer";
import HomeBar from "../_components/_site/Homebar";

const LogoutContent = dynamic_import(() => import("./LogoutContent"), {
  ssr: false,
  loading: () => (
    <div className="App">
      <div className="container">
        <div className="header">
          <HomeBar />
        </div>
        <div
          className="middle-row"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "60vh",
            gap: "1rem",
          }}
        >
          <div
            style={{
              fontSize: "2rem",
              fontWeight: "600",
            }}
          >
            Loading...
          </div>
        </div>
        <Footer />
      </div>
    </div>
  ),
});

export default function LogoutPage() {
  return <LogoutContent />;
}
