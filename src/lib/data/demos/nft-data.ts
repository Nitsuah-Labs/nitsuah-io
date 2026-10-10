/**
 * Mock data for NFT Demo
 * Using placeholder images - replace with actual NFT artwork
 */

export interface NFT {
  id: number;
  name: string;
  price: string;
  image: string;
  creator: string;
}

export const mockNFTCollection: NFT[] = [
  {
    id: 1,
    name: "Cosmic Explorer #42",
    price: "0.5 ETH",
    image:
      "https://images.unsplash.com/photo-1635378464720-9447c2651c5c?w=512&h=512&fit=crop",
    creator: "0x1234...5678",
  },
  {
    id: 2,
    name: "Digital Dreams #7",
    price: "0.3 ETH",
    image:
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=512&h=512&fit=crop",
    creator: "0xabcd...ef01",
  },
  {
    id: 3,
    name: "Pixel Punk #156",
    price: "0.8 ETH",
    image:
      "https://images.unsplash.com/photo-1636523945913-b4d0e4b3e7e6?w=512&h=512&fit=crop",
    creator: "0x9876...5432",
  },
  {
    id: 4,
    name: "Abstract Wave #23",
    price: "0.4 ETH",
    image:
      "https://images.unsplash.com/photo-1616928128852-1c1c86b4d60f?w=512&h=512&fit=crop",
    creator: "0x5678...1234",
  },
  {
    id: 5,
    name: "Neon City #91",
    price: "0.6 ETH",
    image:
      "https://images.unsplash.com/photo-1624107475983-0871d5e368a7?w=512&h=512&fit=crop",
    creator: "0xfedc...ba98",
  },
  {
    id: 6,
    name: "Crystal Gem #5",
    price: "0.7 ETH",
    image:
      "https://images.unsplash.com/photo-1608793965820-5a8707dfc44c?w=512&h=512&fit=crop",
    creator: "0x4321...8765",
  },
];
