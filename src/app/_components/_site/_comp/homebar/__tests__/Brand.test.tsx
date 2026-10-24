import { render, screen } from "@testing-library/react";
import Brand from "../Brand";

test("renders brand with default short name", () => {
  render(
    <Brand showFullName={false} isHovering={false} setIsHovering={() => {}} />,
  );
  expect(screen.getByText(/NITSUAH/i)).toBeInTheDocument();
});

test("renders full name when requested", () => {
  render(
    <Brand showFullName={true} isHovering={false} setIsHovering={() => {}} />,
  );
  expect(screen.getByText(/AUSTIN H\./i)).toBeInTheDocument();
});

test("brand accessibility", () => {
  render(
    <Brand showFullName={false} isHovering={false} setIsHovering={() => {}} />,
  );
  const link = screen.getByRole("link", {
    name: /home - Navigate to homepage/i,
  });
  expect(link).toHaveAttribute(
    "aria-label",
    "NITSUAH home - Navigate to homepage",
  );
});
