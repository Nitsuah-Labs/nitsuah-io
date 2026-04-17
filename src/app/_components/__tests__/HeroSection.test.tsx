/**
 * @jest-environment jsdom
 */
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import React from "react";

jest.mock("../../../hooks", () => ({
  useDelayedVisibility: () => true,
  useScrollOpacity: () => 1,
}));

describe("HeroSection", () => {
  it("hides the scroll prompt when showScrollIndicator is false", () => {
    // Import after hook mocks are applied
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const { HeroSection } = require("../HeroSection");

    render(React.createElement(HeroSection, { showScrollIndicator: false }));

    expect(screen.queryByText(/Scroll for more/i)).not.toBeInTheDocument();
  });
});
