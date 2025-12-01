import { fireEvent, render, screen } from "@testing-library/react";
import { DemoCard } from "../DemoCard";

describe("DemoCard", () => {
  it("renders children content", () => {
    render(
      <DemoCard>
        <div>Card Content</div>
      </DemoCard>,
    );
    expect(screen.getByText("Card Content")).toBeInTheDocument();
  });

  it("calls onClick when card is clicked", () => {
    const handleClick = jest.fn();
    render(
      <DemoCard onClick={handleClick}>
        <div>Clickable Card</div>
      </DemoCard>,
    );

    const card = screen.getByText("Clickable Card").parentElement;
    fireEvent.click(card!);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("applies hover class when hover prop is true", () => {
    const { container } = render(
      <DemoCard hover={true}>
        <div>Hover Card</div>
      </DemoCard>,
    );
    const card = container.firstChild as HTMLElement;

    expect(card.className).toContain("hoverable");
  });

  it("does not apply hover class when hover prop is false", () => {
    const { container } = render(
      <DemoCard hover={false}>
        <div>No Hover</div>
      </DemoCard>,
    );
    const card = container.firstChild as HTMLElement;

    expect(card.className).not.toContain("hoverable");
  });

  it("applies clickable class when onClick is provided", () => {
    const { container } = render(
      <DemoCard onClick={() => {}}>
        <div>Test</div>
      </DemoCard>,
    );
    const card = container.firstChild as HTMLElement;

    expect(card.className).toContain("clickable");
  });
});
