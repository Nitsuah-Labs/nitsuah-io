/**
 * Crypto Projects Data
 * Using Unsplash images for unique project visuals
 */

export type CryptoProject = {
  title: string;
  description: string;
  link: string;
  image: string;
  tags: string[];
  featured: boolean;
};

export const cryptoProjects: CryptoProject[] = [
  {
    title: "Crypto Trailblazer",
    description:
      "Early adopter NFT of Coinbassador education & activity program at Coinbase",
    link: "https://opensea.io/assets/matic/0xb62c2b82a8fe234c96ab1a4c9d50305fd19ef079/259",
    image:
      "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400&h=300&fit=crop",
    tags: ["NFT", "Polygon", "Coinbase"],
    featured: true,
  },
  {
    title: "Ledger NFT",
    description: "Attended a Coinbassador Hardware wallet partnership session",
    link: "https://opensea.io/assets/matic/0xb62c2b82a8fe234c96ab1a4c9d50305fd19ef079/376",
    image:
      "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=400&h=300&fit=crop",
    tags: ["NFT", "Polygon", "Coinbase"],
    featured: false,
  },
  {
    title: "DAO NFT",
    description:
      "DAO membership token for decentralized governance participation",
    link: "https://opensea.io/assets/matic/0xc94a4a1a6c12f9c9f56894ba00d99f766a800e39/0",
    image:
      "https://images.unsplash.com/photo-1639322537228-f710d846310a?w=400&h=300&fit=crop",
    tags: ["NFT", "DAO", "CryptoU", "Coinbase"],
    featured: false,
  },
  {
    title: "#MintMadness",
    description:
      "CryptoU - AI image generation minting contest participation token",
    link: "https://opensea.io/assets/matic/0xc94a4a1a6c12f9c9f56894ba00d99f766a800e39/2",
    image:
      "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=400&h=300&fit=crop",
    tags: ["NFT", "AI", "CryptoU", "Coinbase"],
    featured: false,
  },
  {
    title: "#GAAD POAP",
    description:
      "Global Accessibility Awareness Day commemorative proof of attendance protocol (POAP)",
    link: "https://app.poap.xyz/token/6633244",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop",
    tags: ["POAP", "Accessibility", "Coinbase"],
    featured: true,
  },
  {
    title: "N+W S1",
    description:
      "Participation in Buildspace's Nights + Weekends Season 1 program, building Web3 projects in a community setting.",
    link: "https://opensea.io/assets/matic/0x3cd266509d127d0eac42f4474f57d0526804b44e/22083",
    image:
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=300&fit=crop",
    tags: ["NFT", "buildspace", "Web3", "Polygon"],
    featured: false,
  },
  {
    title: "ETH Core",
    description:
      "Foundational Ethereum smart contract development project covering Solidity programming and Web3 integration.",
    link: "https://opensea.io/assets/matic/0x3cd266509d127d0eac42f4474f57d0526804b44e/18457",
    image:
      "https://images.unsplash.com/photo-1639762681057-408e52192e55?w=400&h=300&fit=crop",
    tags: ["NFT", "Ethereum", "buildspace", "Polygon"],
    featured: false,
  },
  {
    title: "ETH dApp",
    description:
      "Full-featured Ethereum dApp for minting NFT collections with smart contract integration.",
    link: "https://opensea.io/assets/matic/0x3cd266509d127d0eac42f4474f57d0526804b44e/18857",
    image:
      "https://images.unsplash.com/photo-1640340434855-6084b1f4901c?w=400&h=300&fit=crop",
    tags: ["NFT", "Ethereum", "DApp", "buildspace", "Polygon"],
    featured: false,
  },
  {
    title: "NFT Store",
    description:
      "Complete NFT storefront built on Solana with payment processing and collection management.",
    link: "https://opensea.io/assets/matic/0x3cd266509d127d0eac42f4474f57d0526804b44e/19051",
    image:
      "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400&h=300&fit=crop",
    tags: ["NFT", "Solana", "Marketplace", "buildspace", "Polygon"],
    featured: false,
  },
  {
    title: "SOL Core",
    description:
      "Core Solana blockchain development course covering Rust, Anchor framework, and Solana program architecture.",
    link: "https://darkmoon.dev/",
    image:
      "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400&h=300&fit=crop",
    tags: ["Solana", "Rust", "buildspace"],
    featured: false,
  },
  {
    title: "ENS NFT",
    description:
      "ENS (Ethereum Name Service) subdomain NFT implementation on Polygon, allowing users to mint custom subdomain names as NFTs.",
    link: "https://opensea.io/assets/matic/0x3cd266509d127d0eac42f4474f57d0526804b44e/18179",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop",
    tags: ["NFT", "ENS", "Ethereum", "buildspace", "Polygon"],
    featured: false,
  },
  {
    title: "SOL dApp",
    description:
      "Decentralized application built on Solana blockchain with wallet integration and on-chain interactions.",
    link: "https://opensea.io/assets/matic/0x3cd266509d127d0eac42f4474f57d0526804b44e/19995",
    image:
      "https://images.unsplash.com/photo-1639322537228-f710d846310a?w=400&h=300&fit=crop",
    tags: ["Solana", "DApp", "buildspace", "Polygon"],
    featured: false,
  },
];

// Tag categories for color coding
export const TAG_CATEGORIES = {
  Platform: ["Ethereum", "Polygon", "Solana", "Coinbase"],
  Technology: ["Solidity", "Rust", "Web3", "DApp"],
  Type: ["NFT", "DAO", "POAP", "Marketplace", "ENS"],
  Program: ["buildspace", "CryptoU"],
  Other: ["AI", "Accessibility"],
};

export const getTagCategory = (tag: string): keyof typeof TAG_CATEGORIES => {
  for (const [category, tags] of Object.entries(TAG_CATEGORIES)) {
    if (tags.includes(tag)) {
      return category as keyof typeof TAG_CATEGORIES;
    }
  }
  return "Other";
};
