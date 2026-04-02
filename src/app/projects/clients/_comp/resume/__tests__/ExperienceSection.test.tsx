import { render, screen } from "@testing-library/react";
import ExperienceSection from "../ExperienceSection";

describe("ExperienceSection", () => {
  it("renders professional summary and work experience", () => {
    render(<ExperienceSection />);
    expect(screen.getByText(/Professional Summary/i)).toBeInTheDocument();
    expect(screen.getByText(/Work Experience/i)).toBeInTheDocument();
    // check for one of the sample job titles
    expect(screen.getByText(/Senior Software Engineer/i)).toBeInTheDocument();
  });
});
