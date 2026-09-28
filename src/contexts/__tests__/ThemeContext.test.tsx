import { act, render, screen } from "@testing-library/react";
import React from "react";
import { ThemeProvider, useTheme } from "../ThemeContext";

const STORAGE_KEY = "nitsuah-theme";

function Probe() {
  const { theme, toggleTheme } = useTheme();
  return (
    <button type="button" onClick={toggleTheme}>
      {theme}
    </button>
  );
}

function renderWithProvider() {
  return render(
    <ThemeProvider>
      <Probe />
    </ThemeProvider>,
  );
}

describe("ThemeProvider", () => {
  const realStorage = Object.getOwnPropertyDescriptor(window, "localStorage")!;

  beforeEach(() => {
    window.localStorage.clear();
    document.documentElement.removeAttribute("data-theme");
    document.documentElement.className = "";
  });

  afterEach(() => {
    Object.defineProperty(window, "localStorage", realStorage);
    jest.restoreAllMocks();
  });

  it("restores a saved theme and applies it to the document", () => {
    window.localStorage.setItem(STORAGE_KEY, "light");
    renderWithProvider();
    expect(screen.getByRole("button")).toHaveTextContent("light");
    expect(document.documentElement).toHaveAttribute("data-theme", "light");
    expect(document.documentElement).toHaveClass("light");
  });

  it("ignores an invalid saved value", () => {
    window.localStorage.setItem(STORAGE_KEY, "sepia");
    renderWithProvider();
    expect(screen.getByRole("button")).toHaveTextContent("dark");
  });

  it("persists toggles", () => {
    renderWithProvider();
    act(() => screen.getByRole("button").click());
    expect(screen.getByRole("button")).toHaveTextContent("light");
    expect(window.localStorage.getItem(STORAGE_KEY)).toBe("light");
    expect(document.documentElement).toHaveClass("light");
    expect(document.documentElement).not.toHaveClass("dark");
  });

  // Node 25+ defines a global localStorage accessor that yields undefined
  // (rather than the name being absent), and browsers can do the same with
  // storage disabled. Either way the provider must fall back, not crash.
  it("falls back to the default theme when storage yields undefined", () => {
    const warn = jest.spyOn(console, "warn").mockImplementation(() => {});
    Object.defineProperty(window, "localStorage", {
      configurable: true,
      get: () => undefined,
    });

    renderWithProvider();

    expect(screen.getByRole("button")).toHaveTextContent("dark");
    expect(document.documentElement).toHaveAttribute("data-theme", "dark");
    act(() => screen.getByRole("button").click());
    expect(screen.getByRole("button")).toHaveTextContent("light");
    expect(warn).toHaveBeenCalledWith(
      "Failed to load theme from localStorage:",
      expect.any(TypeError),
    );
    expect(warn).toHaveBeenCalledWith(
      "Failed to save theme to localStorage:",
      expect.any(TypeError),
    );
  });

  it("falls back when storage access throws", () => {
    jest.spyOn(console, "warn").mockImplementation(() => {});
    Object.defineProperty(window, "localStorage", {
      configurable: true,
      get: () => {
        throw new DOMException("denied", "SecurityError");
      },
    });

    renderWithProvider();
    expect(screen.getByRole("button")).toHaveTextContent("dark");
  });
});

describe("useTheme outside a provider", () => {
  it("returns safe defaults", () => {
    render(<Probe />);
    expect(screen.getByRole("button")).toHaveTextContent("dark");
  });
});
