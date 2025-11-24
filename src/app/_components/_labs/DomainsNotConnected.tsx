"use client";
import React from "react";
import { Connect } from "../_web3/Connect";

export default function DomainsNotConnected(): React.ReactElement {
  return (
    <div className="labs-card">
      <div className="labs-card-header">
        <h2 className="labs-card-title">Connect a Wallet</h2>
      </div>
      <div className="labs-card-body" style={{ textAlign: "center" }}>
        <Connect />
      </div>
    </div>
  );
}
