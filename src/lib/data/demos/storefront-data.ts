/**
 * Mock data for Storefront Demo (E-Commerce)
 */

export interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  img: string;
  category: string;
  description: string;
  inStock: number;
  isOnSale?: boolean;
  isFeatured?: boolean;
}

export interface Bundle {
  id: string;
  name: string;
  products: number[];
  price: number;
  savings: number;
  img: string;
}

export interface CartItem {
  productId: number;
  quantity: number;
}

export interface CheckoutInfo {
  name: string;
  email: string;
  address: string;
  city: string;
  zip: string;
  cardNumber: string;
}

export const mockProducts: Product[] = [
  {
    id: 1,
    name: "Premium Headphones",
    price: 299,
    img: "🎧",
    category: "Audio",
    description:
      "Noise-canceling over-ear headphones with 30-hour battery life",
    inStock: 15,
  },
  {
    id: 2,
    name: "Smart Watch Pro",
    price: 339,
    originalPrice: 399,
    img: "⌚",
    category: "Wearables",
    description: "Fitness tracking, heart rate monitor, GPS, water resistant",
    inStock: 8,
    isOnSale: true,
    isFeatured: true,
  },
  {
    id: 3,
    name: "Laptop Pro 15",
    price: 1299,
    img: "💻",
    category: "Computers",
    description: "16GB RAM, 512GB SSD, Intel i7, 15.6-inch display",
    inStock: 5,
    isFeatured: true,
  },
  {
    id: 4,
    name: "Camera Kit",
    price: 899,
    img: "📷",
    category: "Photography",
    description: "24MP, 4K video, includes 2 lenses and carrying case",
    inStock: 12,
  },
  {
    id: 5,
    name: "Wireless Earbuds",
    price: 149,
    img: "🎵",
    category: "Audio",
    description: "Active noise cancellation, 8-hour battery, touch controls",
    inStock: 25,
  },
  {
    id: 6,
    name: "Gaming Mouse",
    price: 79,
    originalPrice: 99,
    img: "🖱️",
    category: "Accessories",
    description: "16000 DPI, RGB lighting, programmable buttons",
    inStock: 30,
    isOnSale: true,
  },
];

export const mockBundles: Bundle[] = [
  {
    id: "bundle-1",
    name: "Work From Home Setup",
    products: [1, 3, 6],
    price: 1599,
    savings: 78,
    img: "💼",
  },
  {
    id: "bundle-2",
    name: "Fitness Enthusiast Pack",
    products: [2, 5],
    price: 449,
    savings: 39,
    img: "🏃",
  },
];

export const initialCheckoutInfo: CheckoutInfo = {
  name: "",
  email: "",
  address: "",
  city: "",
  zip: "",
  cardNumber: "",
};
