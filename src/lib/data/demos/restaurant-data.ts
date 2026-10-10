/**
 * Mock data for Restaurant Demo - "Bella Vista" Italian Restaurant
 * Using placeholder images from unsplash - replace with actual food photography
 */

export interface MenuItem {
  name: string;
  price: string;
  description: string;
  image: string;
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
        image:
          "https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?w=800&h=600&fit=crop",
      },
      {
        name: "Calamari Fritti",
        price: "$16",
        description: "Crispy fried calamari with marinara sauce",
        image:
          "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=800&h=600&fit=crop",
      },
      {
        name: "Caprese Salad",
        price: "$14",
        description: "Fresh mozzarella, tomatoes, and basil",
        image:
          "https://images.unsplash.com/photo-1608897013039-887f21d8c804?w=800&h=600&fit=crop",
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
        image:
          "https://images.unsplash.com/photo-1612874742237-6526221588e3?w=800&h=600&fit=crop",
      },
      {
        name: "Penne Arrabbiata",
        price: "$20",
        description: "Spicy tomato sauce with garlic",
        image:
          "https://images.unsplash.com/photo-1617093727343-374698b1b08d?w=800&h=600&fit=crop",
      },
      {
        name: "Fettuccine Alfredo",
        price: "$21",
        description: "Rich cream sauce with parmesan",
        image:
          "https://images.unsplash.com/photo-1645112411341-6c44006e28d2?w=800&h=600&fit=crop",
      },
      {
        name: "Lasagna Bolognese",
        price: "$24",
        description: "Layered pasta with meat sauce and béchamel",
        image:
          "https://images.unsplash.com/photo-1574894709920-11b28e7367e3?w=800&h=600&fit=crop",
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
        image:
          "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=800&h=600&fit=crop",
      },
      {
        name: "Diavola",
        price: "$21",
        description: "Spicy salami with chili flakes",
        image:
          "https://images.unsplash.com/photo-1604068549290-cea0e7a31078?w=800&h=600&fit=crop",
      },
      {
        name: "Quattro Formaggi",
        price: "$23",
        description: "Four cheese blend",
        image:
          "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=800&h=600&fit=crop",
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
        image:
          "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&h=600&fit=crop",
      },
      {
        name: "Branzino al Forno",
        price: "$34",
        description: "Oven-roasted Mediterranean sea bass",
        image:
          "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=800&h=600&fit=crop",
      },
      {
        name: "Pollo alla Parmigiana",
        price: "$28",
        description: "Breaded chicken with marinara and mozzarella",
        image:
          "https://images.unsplash.com/photo-1632736626730-69c89d1c7f9b?w=800&h=600&fit=crop",
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
        image:
          "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=800&h=600&fit=crop",
      },
      {
        name: "Panna Cotta",
        price: "$9",
        description: "Silky vanilla cream with berry compote",
        image:
          "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=800&h=600&fit=crop",
      },
      {
        name: "Cannoli Siciliani",
        price: "$11",
        description: "Crispy shells filled with sweet ricotta",
        image:
          "https://images.unsplash.com/photo-1551024506-0bccd828d307?w=800&h=600&fit=crop",
      },
    ],
  },
];
