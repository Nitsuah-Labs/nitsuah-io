export type Project = {
  id: string;
  title: string;
  short: string;
  description: string;
  github?: string;
  demo?: string;
  highlight: string;
  tags: string[];
  category: "Apps" | "Web3" | "AI/ML" | "Design" | "Featured";
  status: "active" | "maintained" | "archived" | "planned";
  featured: boolean;
  isComingSoon?: boolean;
  icon?: any;
  externalLink?: string;
  infoUrl?: string;
  infoText?: string;
};

const projects: Project[] = [
  {
    id: "kryptos",
    title: "Kryptos",
    short:
      "Cryptanalysis toolkit solving classical ciphers with testable pipelines.",
    description:
      "Advanced Python cryptography research toolkit featuring comprehensive cipher-solving algorithms, automated cryptanalysis pipelines, and statistical analysis tools for classical cryptographic systems.",
    github: "https://github.com/nitsuah/kryptos",
    demo: "",
    highlight:
      "Research-grade pipelines, comprehensive test suites, scoring heuristics",
    tags: ["python", "cryptography", "research", "algorithms"],
    category: "Apps",
    status: "active",
    featured: true,
  },
  {
    id: "gcp",
    title: "GCP Tools",
    short: "Google Drive reporting & migration scripts (Drive API automation).",
    description:
      "Enterprise-grade Google Cloud Platform automation suite featuring Google Drive API integration, automated reporting systems, and migration helpers for large-scale data operations.",
    github: "https://github.com/nitsuah/gcp",
    demo: "",
    highlight: "CLI-style scripts, security configs, enterprise automation",
    tags: ["python", "gcp", "automation", "enterprise"],
    category: "Apps",
    status: "maintained",
    featured: true,
  },
  {
    id: "stash",
    title: "Stash",
    short:
      "Collection of sysadmin scripts (PowerShell, VBA, Atlassian helpers).",
    description:
      "Comprehensive system administration toolkit containing PowerShell automation scripts, VBA macros for Office integration, and Atlassian workflow helpers for enterprise IT operations.",
    github: "https://github.com/nitsuah/stash",
    demo: "",
    highlight:
      "Practical enterprise tooling, IT automation, workflow optimization",
    tags: ["powershell", "vba", "devops", "sysadmin"],
    category: "Apps",
    status: "maintained",
    featured: true,
  },
  {
    id: "nitsuah-io",
    title: "Portfolio Site",
    short: "This portfolio website built with Next.js and Web3 integrations.",
    description:
      "Modern portfolio website featuring Next.js 14, TypeScript, Web3 wallet integration, 3D Spline animations, and experimental blockchain tools in the labs section.",
    github: "https://github.com/Nitsuah-Labs/nitsuah-io",
    demo: "https://nitsuah.io",
    highlight: "Web3 integration, modern React patterns, 3D graphics",
    tags: ["nextjs", "typescript", "portfolio", "react"],
    category: "Apps",
    status: "active",
    featured: false,
  },
  // WEB3 & BLOCKCHAIN PROJECTS - Ordered as requested
  {
    id: "labs",
    title: "/labs",
    short: "Experimental Web3 features and blockchain tools.",
    description:
      "Collection of Web3 experiments including ENS domains, NFT minting, token management, and DAO governance tools.",
    demo: "/labs/",
    highlight: "Web3 experiments and blockchain tools",
    tags: ["web3", "blockchain", "experiments"],
    category: "Web3",
    status: "active",
    featured: false,
  },
  {
    id: "darkmoon",
    title: "darkmoon.dev",
    short: "Custom domain showcasing additional projects.",
    description:
      "Alternative portfolio site featuring specialized projects and blockchain applications.",
    externalLink: "https://darkmoon.dev",
    highlight: "Alternative portfolio and project showcase",
    tags: ["web3", "blockchain"],
    category: "Web3",
    status: "active",
    featured: false,
  },
  {
    id: "nights-weekends",
    title: "N+W S1",
    short: "Nights + Weekends Season 1 cohort participation.",
    description:
      "Participation in Buildspace's Nights + Weekends Season 1 program, building Web3 projects in a community setting.",
    externalLink:
      "https://opensea.io/assets/matic/0x3cd266509d127d0eac42f4474f57d0526804b44e/22083",
    infoUrl: "https://buildspace.so/nw",
    infoText: "Nights + Weekends program",
    highlight: "Community building and Web3 education",
    tags: ["buildspace", "web3", "community"],
    category: "Web3",
    status: "archived",
    featured: false,
  },
  {
    id: "eth-core",
    title: "ETH Core",
    short: "Core Ethereum and Solidity development course project.",
    description:
      "Foundational Ethereum smart contract development project covering Solidity programming and Web3 integration.",
    externalLink:
      "https://opensea.io/assets/matic/0x3cd266509d127d0eac42f4474f57d0526804b44e/18457",
    infoUrl: "https://buildspace.so/p/build-solidity-web3-app",
    infoText: "Learn Ethereum core development",
    highlight: "Smart contract fundamentals",
    tags: ["ethereum", "solidity", "web3"],
    category: "Web3",
    status: "archived",
    featured: false,
  },
  {
    id: "eth-dapp",
    title: "ETH dApp",
    short: "Ethereum NFT minting dApp.",
    description:
      "Full-featured Ethereum dApp for minting NFT collections with smart contract integration.",
    externalLink:
      "https://opensea.io/assets/matic/0x3cd266509d127d0eac42f4474f57d0526804b44e/18857",
    infoUrl: "https://buildspace.so/p/mint-nft-collection",
    infoText: "Build an NFT minting dApp",
    highlight: "NFT minting smart contracts",
    tags: ["ethereum", "nft", "web3", "dapp"],
    category: "Web3",
    status: "maintained",
    featured: false,
  },
  {
    id: "nft-store",
    title: "NFT Store",
    short: "Solana NFT collection with payment integration.",
    description:
      "Complete NFT storefront built on Solana with payment processing and collection management.",
    externalLink:
      "https://opensea.io/assets/matic/0x3cd266509d127d0eac42f4474f57d0526804b44e/19051",
    infoUrl: "https://buildspace.so/p/ship-solana-nft-collection",
    infoText: "Build your own Solana NFT store",
    highlight: "Solana NFT marketplace",
    tags: ["nft", "solana", "web3", "marketplace"],
    category: "Web3",
    status: "maintained",
    featured: false,
  },
  {
    id: "ens-nft",
    title: "ENS NFT",
    short: "Polygon ENS subdomain NFT project.",
    description:
      "ENS (Ethereum Name Service) subdomain NFT implementation on Polygon, allowing users to mint custom subdomain names as NFTs.",
    externalLink:
      "https://opensea.io/assets/matic/0x3cd266509d127d0eac42f4474f57d0526804b44e/18179",
    infoUrl: "https://buildspace.so/p/build-polygon-ens",
    infoText: "Learn to build ENS on Polygon",
    highlight: "ENS subdomains on Polygon",
    tags: ["nft", "ens", "polygon", "web3"],
    category: "Web3",
    status: "maintained",
    featured: false,
  },
  {
    id: "sol-core",
    title: "SOL Core",
    short: "Solana core development and fundamentals.",
    description:
      "Core Solana blockchain development course covering Rust, Anchor framework, and Solana program architecture.",
    externalLink: "https://darkmoon.dev/about",
    infoUrl: "https://buildspace.so/p/solana-core",
    infoText: "Master Solana core concepts",
    highlight: "Solana fundamentals and Rust",
    tags: ["solana", "rust", "web3"],
    category: "Web3",
    status: "archived",
    featured: false,
  },
  {
    id: "sol-dapp",
    title: "SOL dApp",
    short: "Solana Web3 application.",
    description:
      "Decentralized application built on Solana blockchain with wallet integration and on-chain interactions.",
    externalLink:
      "https://opensea.io/assets/matic/0x3cd266509d127d0eac42f4474f57d0526804b44e/19995",
    infoUrl: "https://buildspace.so/p/build-solana-web3-app",
    infoText: "Learn Solana dApp development",
    highlight: "Solana blockchain development",
    tags: ["solana", "web3", "dapp"],
    category: "Web3",
    status: "maintained",
    featured: false,
  },
  {
    id: "devdao",
    title: "DevDAO",
    short: "DAO governance project with JavaScript.",
    description:
      "Decentralized Autonomous Organization (DAO) implementation using JavaScript for governance and voting mechanisms.",
    demo: "/labs/dao",
    infoUrl: "https://buildspace.so/p/build-dao-with-javascript",
    infoText: "Build a DAO with JavaScript",
    highlight: "DAO governance and voting",
    tags: ["dao", "web3", "javascript"],
    category: "Web3",
    status: "archived",
    featured: false,
  },
  // END WEB3 PROJECTS
  {
    id: "games",
    title: "Nitsuah Arcade",
    short: "Collection of browser-based games and interactive experiences.",
    description:
      "Browser-based game collection featuring classic arcade games and modern interactive experiences built with vanilla JavaScript and canvas.",
    demo: "https://nitsuah-arcade.netlify.app/",
    github: "https://github.com/nitsuah/games",
    highlight: "Game development and canvas animations",
    tags: ["games", "javascript", "canvas"],
    category: "Apps",
    status: "active",
    featured: false,
  },
  {
    id: "spline3d",
    title: "3DX",
    short: "Interactive 3D experiences using Spline.",
    description:
      "Interactive 3D graphics and animations created with Spline, showcasing modern web graphics capabilities.",
    demo: "/",
    externalLink: "https://spline.design/",
    infoUrl: "https://spline.design/",
    infoText: "Created with Spline - https://spline.design/",
    highlight: "3D graphics and interactive experiences",
    tags: ["3d", "spline", "graphics"],
    category: "Design",
    status: "active",
    featured: false,
  },

  {
    id: "clients",
    title: "CLIENTS",
    short: "Client project showcase and storefront.",
    description:
      "Professional client work examples and storefront demonstrating commercial project capabilities.",
    demo: "/projects/clients",
    highlight: "Client projects and commercial work",
    tags: ["portfolio", "clients"],
    category: "Featured",
    status: "active",
    featured: false,
  },

  {
    id: "blender",
    title: "Blender",
    short: "3D modeling and animation work.",
    description:
      "3D modeling and animation projects created with Blender, showcasing CGI and rendering capabilities.",
    externalLink: "https://www.youtube.com/watch?v=nIoXOplUvAw",
    infoUrl: "https://www.youtube.com/watch?v=nIoXOplUvAw",
    infoText: "Blender tutorial walkthrough",
    highlight: "3D modeling and CGI",
    tags: ["3d", "blender", "animation"],
    category: "Design",
    status: "archived",
    featured: false,
  },
  {
    id: "autogpt",
    title: "AutoGPT",
    short: "GPT-3 powered AI writing assistant.",
    description:
      "AI-powered writing assistant using GPT-3 API for automated content generation and creative writing support.",
    externalLink: "https://buildspace.so/@nitsuah",
    infoUrl: "https://buildspace.so/p/build-ai-writing-assistant-gpt3",
    infoText: "Build an AI ghost-writer with GPT-3",
    highlight: "AI-powered writing automation",
    tags: ["ai", "gpt3", "automation"],
    category: "AI/ML",
    status: "archived",
    featured: false,
  },

  {
    id: "paint3d",
    title: "Paint3D",
    short: "3D art created with Microsoft Paint 3D.",
    description:
      "3D artwork and models created using Microsoft Paint 3D, demonstrating accessible 3D design tools.",
    externalLink:
      "https://opensea.io/assets/matic/0x2953399124f0cbb46d2cbacd8a89cf0599974963/60508307908081726032856631071720531552206552958895219492912716482941726752788",
    infoUrl:
      "https://support.microsoft.com/en-us/windows/basic-3d-modeling-with-paint-3d-78a27393-4cc5-1c9a-5929-3b4644eb5a94",
    infoText: "Learn basic 3D modeling with Paint 3D",
    highlight: "Accessible 3D art tools",
    tags: ["3d", "art", "modeling"],
    category: "Design",
    status: "archived",
    featured: false,
  },
  {
    id: "imagen",
    title: "ImaGen",
    short: "AI avatar generation using machine learning.",
    description:
      "AI-powered avatar generation tool using machine learning models to create unique profile pictures and digital art.",
    demo: "/labs/ai",
    infoUrl: "https://buildspace.so/p/build-ai-avatars",
    infoText: "Create AI-generated avatars",
    highlight: "AI image generation",
    tags: ["ai", "ml", "image-generation"],
    category: "AI/ML",
    status: "archived",
    featured: false,
  },
  {
    id: "ai-coming-soon",
    title: "Coming Soon...",
    short: "More AI & ML projects in development.",
    description:
      "Exciting new AI and machine learning projects are currently in development. Stay tuned for innovative tools in natural language processing, computer vision, and more.",
    infoText: "More AI projects coming soon",
    highlight: "Future AI/ML innovations",
    tags: ["ai", "ml", "coming-soon"],
    category: "AI/ML",
    status: "planned",
    featured: false,
    isComingSoon: true,
  },
];

// Export filtered lists for different use cases
export const featuredProjects = projects.filter((project) => project.featured);
export const portfolioProjects = projects.filter(
  (project) => !project.featured,
);
export const activeProjects = projects.filter(
  (project) => project.status === "active",
);
export const allProjects = projects;

export default projects;
