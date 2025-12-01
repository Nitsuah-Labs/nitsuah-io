import { fireEvent, render, screen } from "@testing-library/react";
import { DemoButton } from "../DemoButton";

describe("DemoButton", () => {
  it("renders button with children", () => {
    render(<DemoButton>Click Me</DemoButton>);
    expect(
      screen.getByRole("button", { name: /Click Me/i }),
    ).toBeInTheDocument();
  });

  it("calls onClick when clicked and not disabled", () => {
    const handleClick = jest.fn();
    render(<DemoButton onClick={handleClick}>Click Me</DemoButton>);

    const button = screen.getByRole("button");
    fireEvent.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("does not call onClick when disabled", () => {
    const handleClick = jest.fn();
    render(
      <DemoButton onClick={handleClick} disabled>
        Click Me
      </DemoButton>,
    );

    const button = screen.getByRole("button");
    fireEvent.click(button);

    // onClick should not be called when disabled
    expect(handleClick).not.toHaveBeenCalled();
  });

  it("applies variant and size classes", () => {
    render(
      <DemoButton variant="success" size="large">
        Test
      </DemoButton>,
    );
    const button = screen.getByRole("button");

    expect(button.className).toContain("success");
    expect(button.className).toContain("large");
  });
});
