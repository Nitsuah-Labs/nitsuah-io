"use client";
import React from "react";

export default function ThemeToggle(): React.ReactElement {
  const [dark, setDark] = React.useState(false);
  return (
    <button
      aria-pressed={dark}
      onClick={() => setDark((d) => !d)}
      title="Toggle theme"
      style={{
        padding: "0.25rem 0.5rem",
        borderRadius: 6,
        border: "1px solid #ddd",
        background: "transparent",
      }}
    >
      {dark ? "🌙" : "☀️"}
    </button>
  );
}
