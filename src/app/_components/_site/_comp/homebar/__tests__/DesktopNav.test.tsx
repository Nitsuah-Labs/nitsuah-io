import { render, screen } from "@testing-library/react";
import DesktopNav from "../DesktopNav";

describe("DesktopNav top-level items", () => {
  const pages = ["about", "resume", "projects"];

  test("renders each top-level page as a single link", () => {
    render(<DesktopNav pages={pages} />);
    expect(screen.getByRole("link", { name: /about/i })).toHaveAttribute(
      "href",
      "/about",
    );
    expect(screen.getByRole("link", { name: /resume/i })).toHaveAttribute(
      "href",
      "/resume",
    );
  });

  test("does not nest a button inside the link", () => {
    const { container } = render(<DesktopNav pages={pages} />);
    expect(screen.queryByRole("button", { name: /about/i })).toBeNull();
    expect(screen.queryByRole("button", { name: /resume/i })).toBeNull();
    expect(container.querySelectorAll("a button")).toHaveLength(0);
  });

  test("keeps the Projects toggle as a collapsed button", () => {
    render(<DesktopNav pages={pages} />);
    expect(screen.getByRole("button", { name: /projects/i })).toHaveAttribute(
      "aria-expanded",
      "false",
    );
  });
});
