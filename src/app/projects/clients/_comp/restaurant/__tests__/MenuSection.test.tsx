import { fireEvent, render, screen } from "@testing-library/react";
import { MenuSection } from "../MenuSection";

const mockMenu = [
  {
    name: "Starters",
    items: [
      {
        name: "Bruschetta",
        emoji: "🍞",
        price: "$6",
        description: "Toasted bread with tomatoes",
      },
    ],
  },
  {
    name: "Mains",
    items: [
      {
        name: "Lasagna",
        emoji: "🍝",
        price: "$14",
        description: "Layers of pasta and cheese",
      },
    ],
  },
];

describe("MenuSection", () => {
  it("renders categories and calls addToCart", () => {
    const add = jest.fn();
    const setCategory = jest.fn();

    render(
      <MenuSection
        menuData={mockMenu as any}
        categories={["All", "Starters", "Mains"]}
        selectedCategory="All"
        setSelectedCategory={setCategory}
        addToCart={add}
      />,
    );

    // category buttons (use role to target the button specifically)
    expect(
      screen.getByRole("button", { name: /Starters/ }),
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Mains/ })).toBeInTheDocument();

    // click category button
    fireEvent.click(screen.getByRole("button", { name: /Starters/ }));
    expect(setCategory).toHaveBeenCalledWith("Starters");

    // click first "Add to Pickup Order" button
    const addButtons = screen.getAllByRole("button", {
      name: /Add to Pickup Order/i,
    });
    expect(addButtons.length).toBeGreaterThan(0);
    fireEvent.click(addButtons[0]);
    expect(add).toHaveBeenCalled();
  });

  it("filters menu items by selected category", () => {
    const add = jest.fn();
    const setCategory = jest.fn();

    // Render with "Starters" selected
    render(
      <MenuSection
        menuData={mockMenu as any}
        categories={["All", "Starters", "Mains"]}
        selectedCategory="Starters"
        setSelectedCategory={setCategory}
        addToCart={add}
      />,
    );

    // Should show Starters items
    expect(screen.getByText("Bruschetta")).toBeInTheDocument();
    // Should NOT show Mains items when filtered
    expect(screen.queryByText("Lasagna")).not.toBeInTheDocument();
  });
});
