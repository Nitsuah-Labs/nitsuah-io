import { render, screen } from "@testing-library/react";
import SkillsSection from "../SkillsSection";

describe("SkillsSection", () => {
  it("renders skills categories", () => {
    render(<SkillsSection />);
    expect(screen.getByText(/Technical Skills/i)).toBeInTheDocument();
    expect(screen.getByText(/Frontend/i)).toBeInTheDocument();
    expect(screen.getByText(/Backend/i)).toBeInTheDocument();
  });
});
