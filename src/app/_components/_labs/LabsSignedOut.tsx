"use client";
import React from "react";
import { Connect } from "../_web3/Connect";

/** Signed-out state for wallet-gated /labs pages: says why the page is empty and offers Connect. */
export default function LabsSignedOut(): React.ReactElement {
  return (
    <div className="labs-card labs-spacing-md">
      <div className="labs-card-header">
        <h2 className="labs-card-title">Connect a wallet</h2>
      </div>
      <div className="labs-card-body">
        <p>This lab needs a connected wallet to continue.</p>
        <Connect />
      </div>
    </div>
  );
}
