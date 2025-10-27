// LABS - src/app/labs/page.tsx
"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Button, TextField, Grid, Box } from "@mui/material";

// LAB STYLES
import "../_components/_styles/labs.css";
import LabNav from "../_components/_labs/LabNav";
import LabFooter from "../_components/_labs/LabFooter";

// LAB ASSETS
import mumbai from "../_components/_web3/_assets/mumbai.png";
import polygonLogo from "../_components/_web3/_assets/polygonlogo.png";
import ethLogo from "../_components/_web3/_assets/ethlogo.png";

function renderOutput() {
  return (
    <>
      <table>
        <thead></thead>
        <tbody>
          <tr>
            <th scope="col">
              <div className="h4">NETWORK</div>
            </th>
            <td scope="row">
              <div className="mumbai-wallet">
                <h2>
                  <Image
                    className="logo"
                    src={polygonLogo}
                    alt="Polygon logo"
                  />
                  MUMBAI
                </h2>
              </div>
            </td>
          </tr>
          <tr>
            <th scope="col">
              <div className="h4">FUNDS</div>
            </th>
            <td scope="row">
              <div
                className="purp-wallet"
                onClick={() =>
                  window.open(
                    "https://wiki.polygon.technology/docs/develop/tools/matic-faucet/",
                  )
                }
              >
                <h4>
                  <Image className="logo" src={mumbai} alt="Polygon logo" />
                  FAUCET
                </h4>
              </div>
            </td>
          </tr>
          <tr>
            <th scope="col">
              <div className="h4">SIGNUP</div>
            </th>
            <td>
              <div
                className="purp-wallet"
                onClick={() => window.open("/labs/register", "_self")}
              >
                <h4>REGISTER</h4>
              </div>
            </td>
          </tr>
          <tr>
            <th scope="col">
              <div className="h4">MINT</div>
            </th>
            <td>
              <div
                className="purp-wallet"
                onClick={() => window.open("/labs/mint", "_self")}
              >
                <h4>LANDPLOT</h4>
              </div>
            </td>
          </tr>
          <tr>
            <th scope="col">
              <div className="h4">DOMAINS</div>
            </th>
            <td>
              <div
                className="purp-wallet"
                onClick={() => window.open("/labs/domains", "_self")}
              >
                <h4>SUBDOMAIN</h4>
              </div>
            </td>
          </tr>
          <tr>
            <th>
              <div
                className="eth-wallet"
                onClick={() => window.open("/", "_self")}
              >
                <h4>GO HOME</h4>
              </div>
            </th>
          </tr>
        </tbody>
        <tfoot></tfoot>
      </table>
    </>
  );
}

const LabHome = () => {
  return (
    <div className="App">
      <div>
        <LabNav />
        {renderOutput()}
        <LabFooter />
      </div>
    </div>
  );
};

export default LabHome;
