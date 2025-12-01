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

  it("renders without subtitle", () => {
    render(<DemoHeader title="Title Only" />);

    expect(screen.getByText(/Title Only/)).toBeInTheDocument();
    expect(screen.queryByText(/Sub/)).not.toBeInTheDocument();
  });

  it("renders without icon and actions", () => {
    render(<DemoHeader title="Simple Header" subtitle="Description" />);

    expect(screen.getByText(/Simple Header/)).toBeInTheDocument();
    expect(screen.getByText(/Description/)).toBeInTheDocument();
  });
});
