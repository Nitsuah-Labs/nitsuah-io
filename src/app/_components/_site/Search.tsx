"use client";
import React from "react";

export default function Search(): React.ReactElement {
  return (
    <div style={{ display: "inline-flex", alignItems: "center" }}>
      <input
        aria-label="Search"
        placeholder="Search"
        style={{
          padding: "0.25rem 0.5rem",
          borderRadius: 6,
          border: "1px solid #ddd",
        }}
      />
    </div>
  );
}
