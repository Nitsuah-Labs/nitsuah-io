/**
 * Mock data for NFT Demo
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
    image: "🌌",
    creator: "0x1234...5678",
  },
  {
    id: 2,
    name: "Digital Dreams #7",
    price: "0.3 ETH",
    image: "🎨",
    creator: "0xabcd...ef01",
  },
  {
    id: 3,
    name: "Pixel Punk #156",
    price: "0.8 ETH",
    image: "👾",
    creator: "0x9876...5432",
  },
  {
    id: 4,
    name: "Abstract Wave #23",
    price: "0.4 ETH",
    image: "🌊",
    creator: "0x5678...1234",
  },
  {
    id: 5,
    name: "Neon City #91",
    price: "0.6 ETH",
    image: "🏙️",
    creator: "0xfedc...ba98",
  },
  {
    id: 6,
    name: "Crystal Gem #5",
    price: "0.7 ETH",
    image: "💎",
    creator: "0x4321...8765",
  },
];
