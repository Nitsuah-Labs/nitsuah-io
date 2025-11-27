/**
 * Mock data for Restaurant Demo - "Bella Vista" Italian Restaurant
 */

export interface MenuItem {
  name: string;
  price: string;
  description: string;
  emoji: string;
}

export interface MenuCategory {
  name: string;
  items: MenuItem[];
}

export const mockRestaurantMenu: MenuCategory[] = [
  {
    name: "Antipasti",
    items: [
      {
        name: "Bruschetta al Pomodoro",
        price: "$12",
        description: "Grilled bread with tomatoes, basil, and olive oil",
        emoji: "🍞",
      },
      {
        name: "Calamari Fritti",
        price: "$16",
        description: "Crispy fried calamari with marinara sauce",
        emoji: "🦑",
      },
      {
        name: "Caprese Salad",
        price: "$14",
        description: "Fresh mozzarella, tomatoes, and basil",
        emoji: "🧀",
      },
    ],
  },
  {
    name: "Pasta",
    items: [
      {
        name: "Spaghetti Carbonara",
        price: "$22",
        description: "Creamy sauce with pancetta and pecorino",
        emoji: "🍝",
      },
      {
        name: "Penne Arrabbiata",
        price: "$20",
        description: "Spicy tomato sauce with garlic",
        emoji: "🌶️",
      },
      {
        name: "Fettuccine Alfredo",
        price: "$21",
        description: "Rich cream sauce with parmesan",
        emoji: "🧈",
      },
      {
        name: "Lasagna Bolognese",
        price: "$24",
        description: "Layered pasta with meat sauce and béchamel",
        emoji: "🥘",
      },
    ],
  },
  {
    name: "Pizza",
    items: [
      {
        name: "Margherita",
        price: "$18",
        description: "Classic tomato, mozzarella, and basil",
        emoji: "🍕",
      },
      {
        name: "Diavola",
        price: "$21",
        description: "Spicy salami with chili flakes",
        emoji: "🔥",
      },
      {
        name: "Quattro Formaggi",
        price: "$23",
        description: "Four cheese blend",
        emoji: "🧀",
      },
    ],
  },
  {
    name: "Secondi",
    items: [
      {
        name: "Osso Buco",
        price: "$38",
        description: "Braised veal shanks in wine sauce",
        emoji: "🥩",
      },
      {
        name: "Branzino al Forno",
        price: "$34",
        description: "Oven-roasted Mediterranean sea bass",
        emoji: "🐟",
      },
      {
        name: "Pollo alla Parmigiana",
        price: "$28",
        description: "Breaded chicken with marinara and mozzarella",
        emoji: "🍗",
      },
    ],
  },
  {
    name: "Dolci",
    items: [
      {
        name: "Tiramisu",
        price: "$10",
        description: "Coffee-soaked ladyfingers with mascarpone",
        emoji: "☕",
      },
      {
        name: "Panna Cotta",
        price: "$9",
        description: "Silky vanilla cream with berry compote",
        emoji: "🍮",
      },
      {
        name: "Cannoli Siciliani",
        price: "$11",
        description: "Crispy shells filled with sweet ricotta",
        emoji: "🥐",
      },
    ],
  },
];
