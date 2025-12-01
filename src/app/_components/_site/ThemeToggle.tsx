"use client";

import React from "react";
import { useTheme } from "../../../contexts/ThemeContext";

export default function ThemeToggle(): React.ReactElement {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      aria-pressed={isDark}
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
      onClick={toggleTheme}
      title={`Switch to ${isDark ? "light" : "dark"} mode`}
      style={{
        padding: "0.5rem",
        borderRadius: 8,
        border: "1px solid var(--color-border)",
        background: "var(--color-surface)",
        color: "var(--color-text-primary)",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "1.25rem",
        transition: "all 0.2s ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = "var(--color-surface-elevated)";
        e.currentTarget.style.borderColor = "var(--color-border-hover)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = "var(--color-surface)";
        e.currentTarget.style.borderColor = "var(--color-border)";
      }}
    >
      {isDark ? "☀️" : "🌙"}
    </button>
  );
}
