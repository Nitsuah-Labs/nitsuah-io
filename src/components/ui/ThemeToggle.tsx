import React from "react";
import { useTheme } from "../../contexts/ThemeContext";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      aria-label="Toggle dark mode"
      onClick={toggleTheme}
      style={{
        background: "none",
        border: "none",
        cursor: "pointer",
        fontSize: 24,
        padding: 8,
      }}
    >
      {theme === "dark" ? "🌙" : "☀️"}
    </button>
  );
}
