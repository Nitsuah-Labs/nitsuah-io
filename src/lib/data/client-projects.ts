// src/lib/data/client-projects.ts
export type ProjectType =
  | "web3"
  | "ecommerce"
  | "saas"
  | "service"
  | "portfolio"
  | "all";

export interface ClientProject {
  id: string;
  name: string;
  type: ProjectType;
  description: string;
  technologies: string[];
  features: string[];
  status: "live" | "demo" | "mockup";
  icon?: string;
}

export const clientProjects: ClientProject[] = [
  {
    id: "storefront",
    name: "Storefront",
    type: "ecommerce",
    description:
      "Modern e-commerce platform with cart, checkout, and inventory management",
    technologies: ["Next.js", "Stripe", "Headless CMS"],
    features: [
      "Product Catalog",
      "Shopping Cart",
      "Payment Integration",
      "Order Management",
    ],
    status: "demo",
    icon: "🛒",
  },
  {
    id: "restaurant",
    name: "Restaurant",
    type: "service",
    description:
      "Italian restaurant website with menu, reservations, and gallery",
    technologies: ["React", "Node.js", "PostgreSQL"],
    features: [
      "Menu Display",
      "Table Reservations",
      "Online Ordering",
      "Photo Gallery",
    ],
    status: "demo",
    icon: "🍝",
  },
  {
    id: "realestate",
    name: "Real Estate",
    type: "service",
    description:
      "Property listing platform with search, filters, and map views",
    technologies: ["Next.js", "Mapbox", "Sanity CMS"],
    features: [
      "Property Search",
      "Map Integration",
      "Virtual Tours",
      "Agent Profiles",
    ],
    status: "demo",
    icon: "🏠",
  },
  {
    id: "booking",
    name: "Dental Office",
    type: "service",
    description:
      "Dentist office appointment booking with patient management and SMS reminders",
    technologies: ["React", "Calendar API", "Twilio"],
    features: [
      "Calendar Schedule",
      "Patient Records",
      "SMS Reminders",
      "Insurance Processing",
    ],
    status: "demo",
    icon: "🦷",
  },
  {
    id: "portfolio",
    name: "Creative Portfolio",
    type: "portfolio",
    description: "Portfolio showcase for photographers, designers, and artists",
    technologies: ["Next.js", "Framer Motion", "Cloudinary"],
    features: [
      "Gallery Grid",
      "Lightbox View",
      "Project Details",
      "Contact Form",
    ],
    status: "demo",
    icon: "🎨",
  },
  {
    id: "resume-site",
    name: "Resume Website",
    type: "portfolio",
    description:
      "Professional resume template with clean layout and downloadable PDF",
    technologies: ["Next.js", "TypeScript", "CSS Grid"],
    features: [
      "Work History",
      "Skills Showcase",
      "PDF Download",
      "Contact Section",
    ],
    status: "demo",
    icon: "📄",
  },
  {
    id: "nft-mint",
    name: "NFT Minting",
    type: "web3",
    description:
      "Web3 NFT minting demo with wallet connection and network switching",
    technologies: ["React", "wagmi", "Web3", "Ethereum"],
    features: [
      "Wallet Connect",
      "NFT Minting",
      "Network Switching",
      "Account Management",
    ],
    status: "demo",
    icon: "✨",
  },
  {
    id: "marketplace",
    name: "NFT Marketplace",
    type: "web3",
    description: "Decentralized marketplace for buying and selling NFTs",
    technologies: ["React", "Solidity", "IPFS", "ethers.js"],
    features: [
      "NFT Listing",
      "Auction System",
      "Wallet Integration",
      "Gas Optimization",
    ],
    status: "demo",
    icon: "🖼️",
  },
  {
    id: "crm",
    name: "Customer CRM",
    type: "saas",
    description:
      "Salesforce-style CRM with contacts, pipeline, tasks, and deals tracking",
    technologies: ["React", "TypeScript", "Real-time Sync"],
    features: [
      "Contact Management",
      "Sales Pipeline",
      "Task Tracking",
      "Deal Flow",
    ],
    status: "demo",
    icon: "📈",
  },
  {
    id: "blog-cms",
    name: "Content Mgmt",
    type: "saas",
    description: "Blog CMS with markdown support, SEO tools, and analytics",
    technologies: ["Next.js", "MDX", "Vercel Analytics"],
    features: [
      "Rich Text Editor",
      "SEO Tools",
      "Draft System",
      "Analytics Dashboard",
    ],
    status: "demo",
    icon: "📝",
  },
  {
    id: "dashboard",
    name: "SaaS Analytics",
    type: "saas",
    description:
      "Analytics dashboard for tracking KPIs, metrics, and business insights",
    technologies: ["React", "D3.js", "Chart.js", "REST API"],
    features: [
      "Real-time Analytics",
      "Custom Reports",
      "Data Visualization",
      "Export Tools",
    ],
    status: "demo",
    icon: "📊",
  },
];
