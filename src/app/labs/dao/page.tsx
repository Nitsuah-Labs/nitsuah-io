// DAO - src/app/labs/DAO/page.tsx //TODO
"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Button, TextField, Grid, Box } from "@mui/material";

// LAB STYLES
import "../../_components/_styles/labs.css";
import LabNav from "../../_components/_labs/LabNav";
import LabFooter from "../../_components/_labs/LabFooter";

// LAB ASSETS
import mumbai from "../../_components/_web3/_assets/mumbai.png";
import polygonLogo from "../../_components/_web3/_assets/polygonlogo.png";
import ethLogo from "../../_components/_web3/_assets/ethlogo.png";

const DaoSite = () => {
  return (
    <div className="App">
      <div className="container">
        <div className="form-container">
          <LabNav />
          <h2>DAO HERE!</h2>
        </div>
        <LabFooter />
      </div>
    </div>
  );
};

export default DaoSite;
