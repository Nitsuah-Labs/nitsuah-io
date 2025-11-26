"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useDisconnect } from "wagmi";
import Footer from "../_components/_site/Footer";
import HomeBar from "../_components/_site/Homebar";

export default function LogoutContent() {
  const router = useRouter();
  const { disconnect } = useDisconnect();

  useEffect(() => {
    // Disconnect wallet
    disconnect();

    // Redirect to homepage after a brief delay
    const timer = setTimeout(() => {
      router.push("/");
    }, 1000);

    return () => clearTimeout(timer);
  }, [disconnect, router]);

  return (
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
            Disconnecting...
          </div>
          <div
            style={{
              fontSize: "1rem",
              color: "#6b7280",
            }}
          >
            Taking you back home
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}
