import { render, screen } from "@testing-library/react";
import { DemoHeader } from "../DemoHeader";

describe("DemoHeader", () => {
  it("renders title, subtitle, icon and actions", () => {
    render(
      <DemoHeader
        title="Test Title"
        subtitle="Sub"
        icon="✨"
        actions={<button>Action</button>}
      />,
    );

    expect(screen.getByText(/Test Title/)).toBeInTheDocument();
    expect(screen.getByText(/Sub/)).toBeInTheDocument();
    expect(screen.getByText(/✨/)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Action/ })).toBeInTheDocument();
  });
});
