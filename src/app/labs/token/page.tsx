// Token - src/app/labs/token/page.tsx //TODO
"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Button, TextField, Grid, Box } from "@mui/material";

// LAB STYLES
import "../../_components/_styles/labs.css";
import LabNav from "../../_components/_labs/LabNav";
import LabFooter from "../../_components/_labs/LabFooter";

const TokenSite = () => {
  return (
    <div className="App">
      <div className="container">
        <div className="form-container">
          <LabNav />
          <h2>TOKEN MAKER HERE!</h2>
        </div>
        <LabFooter />
      </div>
    </div>
  );
};

export default TokenSite;
