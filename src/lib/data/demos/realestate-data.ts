/**
 * Mock data for Real Estate Demo
 * Using placeholder images from unsplash - replace with actual property photos
 */

export interface Property {
  id: number;
  title: string;
  type: "sale" | "rent";
  price: string;
  priceNum: number;
  beds: number;
  baths: number;
  sqft: string;
  image: string;
  location: string;
  description: string;
  features: string[];
}

export const mockProperties: Property[] = [
  {
    id: 1,
    title: "Modern Downtown Loft",
    type: "sale",
    price: "$850,000",
    priceNum: 850000,
    beds: 2,
    baths: 2,
    sqft: "1,200",
    image:
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop",
    location: "Downtown",
    description:
      "Stunning modern loft with floor-to-ceiling windows, hardwood floors, and city views. Open concept living with chef's kitchen.",
    features: [
      "Granite Counters",
      "Stainless Appliances",
      "Parking Included",
      "Pet Friendly",
    ],
  },
  {
    id: 2,
    title: "Suburban Family Home",
    type: "sale",
    price: "$625,000",
    priceNum: 625000,
    beds: 4,
    baths: 3,
    sqft: "2,500",
    image:
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop",
    location: "Suburbs",
    description:
      "Spacious family home with large backyard, updated kitchen, and finished basement. Great schools nearby.",
    features: [
      "Large Yard",
      "Updated Kitchen",
      "Finished Basement",
      "2-Car Garage",
    ],
  },
  {
    id: 3,
    title: "Luxury Penthouse",
    type: "rent",
    price: "$4,500/mo",
    priceNum: 4500,
    beds: 3,
    baths: 3,
    sqft: "2,100",
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop",
    location: "City Center",
    description:
      "Exclusive penthouse with panoramic city views, private terrace, and premium finishes throughout.",
    features: [
      "Rooftop Terrace",
      "Concierge Service",
      "Gym Access",
      "City Views",
    ],
  },
  {
    id: 4,
    title: "Cozy Studio Apartment",
    type: "rent",
    price: "$1,800/mo",
    priceNum: 1800,
    beds: 1,
    baths: 1,
    sqft: "650",
    image:
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop",
    location: "Midtown",
    description:
      "Efficient studio with modern amenities, perfect for young professionals. Walking distance to transit.",
    features: [
      "In-Unit Laundry",
      "Fitness Center",
      "Near Transit",
      "Modern Kitchen",
    ],
  },
  {
    id: 5,
    title: "Beachfront Villa",
    type: "sale",
    price: "$1,200,000",
    priceNum: 1200000,
    beds: 5,
    baths: 4,
    sqft: "3,800",
    image:
      "https://images.unsplash.com/photo-1499793983690-e89da5f9053e?w=800&h=600&fit=crop",
    location: "Coastal",
    description:
      "Magnificent beachfront property with private beach access, infinity pool, and spectacular ocean views.",
    features: ["Ocean Views", "Private Beach", "Pool", "Guest House"],
  },
  {
    id: 6,
    title: "Historic Brownstone",
    type: "sale",
    price: "$975,000",
    priceNum: 975000,
    beds: 3,
    baths: 2,
    sqft: "2,200",
    image:
      "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&h=600&fit=crop",
    location: "Historic District",
    description:
      "Beautifully restored brownstone with original details, modern updates, and charming garden.",
    features: [
      "Original Details",
      "Renovated Kitchen",
      "Private Garden",
      "Walk to Shops",
    ],
  },
];
