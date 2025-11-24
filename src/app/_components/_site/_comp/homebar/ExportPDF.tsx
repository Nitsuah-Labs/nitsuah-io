"use client";
import Button from "@mui/material/Button";
import React from "react";

const ExportPDF: React.FC<{ visible: boolean }> = ({ visible }) => {
  if (!visible) return null;
  return (
    <Button color="inherit" onClick={() => window.print()}>
      Export PDF
    </Button>
  );
};

export default ExportPDF;
