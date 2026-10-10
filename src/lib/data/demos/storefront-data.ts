/**
 * Mock data for Storefront Demo (E-Commerce)
 * Using placeholder images from picsum.photos - replace with actual product photos
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
    img: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&h=800&fit=crop",
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
    img: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&h=800&fit=crop",
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
    img: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&h=800&fit=crop",
    category: "Computers",
    description: "16GB RAM, 512GB SSD, Intel i7, 15.6-inch display",
    inStock: 5,
    isFeatured: true,
  },
  {
    id: 4,
    name: "Camera Kit",
    price: 899,
    img: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&h=800&fit=crop",
    category: "Photography",
    description: "24MP, 4K video, includes 2 lenses and carrying case",
    inStock: 12,
  },
  {
    id: 5,
    name: "Wireless Earbuds",
    price: 149,
    img: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800&h=800&fit=crop",
    category: "Audio",
    description: "Active noise cancellation, 8-hour battery, touch controls",
    inStock: 25,
  },
  {
    id: 6,
    name: "Gaming Mouse",
    price: 79,
    originalPrice: 99,
    img: "https://images.unsplash.com/photo-1527814050087-3793815479db?w=800&h=800&fit=crop",
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
    img: "https://images.unsplash.com/photo-1587831990711-23ca64414476?w=800&h=800&fit=crop",
  },
  {
    id: "bundle-2",
    name: "Fitness Enthusiast Pack",
    products: [2, 5],
    price: 449,
    savings: 39,
    img: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=800&fit=crop",
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
