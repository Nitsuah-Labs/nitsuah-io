import { fireEvent, render, screen } from "@testing-library/react";
import { OrderCart } from "../OrderCart";

const mockMenu = [
  {
    name: "Mains",
    items: [
      {
        name: "Spaghetti",
        emoji: "🍝",
        price: "$12",
        description: "Classic spaghetti",
      },
    ],
  },
];

describe("OrderCart", () => {
  it("shows empty state when cart is empty", () => {
    render(
      <OrderCart
        cart={{}}
        menuData={mockMenu as any}
        addToCart={() => {}}
        removeFromCart={() => {}}
        cartTotal={() => "0.00"}
      />,
    );

    expect(screen.getByText(/Your cart is empty/i)).toBeInTheDocument();
  });

  it("renders items and calls add/remove callbacks", () => {
    const add = jest.fn();
    const remove = jest.fn();

    render(
      <OrderCart
        cart={{ Spaghetti: 2 }}
        menuData={mockMenu as any}
        addToCart={add}
        removeFromCart={remove}
        cartTotal={() => "24.00"}
      />,
    );

    // item and quantity
    expect(screen.getByText(/Spaghetti/)).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();

    // total
    expect(screen.getByText("$24.00")).toBeInTheDocument();

    // click remove (−) and add (+)
    const minusButtons = screen.getAllByText("−");
    const plusButtons = screen.getAllByText("+");
    expect(minusButtons.length).toBeGreaterThan(0);
    expect(plusButtons.length).toBeGreaterThan(0);

    fireEvent.click(minusButtons[0]);
    fireEvent.click(plusButtons[0]);

    expect(remove).toHaveBeenCalledWith("Spaghetti");
    expect(add).toHaveBeenCalledWith("Spaghetti");
  });
});
