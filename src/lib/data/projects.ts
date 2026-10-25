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
  // Flagship Projects (first five are shown on the home page)
  {
    id: "vigil",
    title: "Vigil",
    short:
      "Every repo graded, every TASKS.md rolled up, and your agents can ask what to work on next.",
    description:
      "A dashboard and MCP server for everyone with too many GitHub repos. Health grades for every repo, one ranked list of open work across all of them, a map of which repo uses which, and Claude can read it all.",
    github: "https://github.com/nitsuah/vigil",
    demo: "https://gh-vigil.netlify.app",
    infoUrl: "https://nitsuah.github.io/vigil/",
    highlight:
      "Repo health grades, cross-repo task rollup, dependency map, MCP server",
    tags: ["typescript", "mcp", "ai", "devops"],
    category: "Apps",
    status: "active",
    featured: true,
  },
  {
    id: "motor-pool",
    title: "motor-pool",
    short:
      "Your local AI ops cockpit. Local models, tools and agents in one cockpit, one docker compose up.",
    description:
      "A local-first control room for multi-model AI: chat, local models, MCP tool containers and live system state in one Docker stack on your own machine.",
    github: "https://github.com/nitsuah/motor-pool",
    demo: "https://nitsuah.github.io/motor-pool/",
    highlight:
      "Local models, safety rails, MCP tool containers, live observability",
    tags: ["ai", "devops", "docker"],
    category: "AI/ML",
    status: "active",
    featured: true,
  },
  {
    id: "ats-fill",
    title: "ats-fill",
    short:
      "The same 20 questions on 47 different forms. Fill the form, keep the receipts.",
    description:
      "A local-first Chrome extension that fills Greenhouse, Lever, Ashby and Workday application forms from your saved profile. You review every field and press submit. Pipeline tracker, job search across 16 boards, analytics and interview prep. No server, no account.",
    github: "https://github.com/nitsuah/ats-fill",
    demo: "https://nitsuah.github.io/ats-fill/",
    externalLink:
      "https://chromewebstore.google.com/detail/ats-fill/amofaeopfmaicbiijgjaojenedkkadmn",
    highlight: "Chrome Web Store, local-first, no server, no account",
    tags: ["javascript", "ai", "chrome"],
    category: "Apps",
    status: "active",
    featured: true,
  },
  {
    id: "fire",
    title: "fire",
    short:
      "When can I retire? Self-hosted net worth and retirement projections. Your money, your machine.",
    description:
      "A self-hosted Financial Independence, Retire Early tracker. Net worth, retirement projections and insights in one dashboard, a read-only MCP server for Claude, and your data stays on your machine.",
    github: "https://github.com/nitsuah/fire",
    demo: "https://lifefire.netlify.app",
    infoUrl: "https://nitsuah.github.io/fire/",
    highlight: "Self-hosted, retirement projections, read-only MCP server",
    tags: ["javascript", "mcp", "finance"],
    category: "Apps",
    status: "active",
    featured: true,
  },
  {
    id: "vhs",
    title: "VHS Box",
    short:
      "Snap the shelf. AI reads the spines. Every tape gets an ID, a condition and a price.",
    description:
      "Catalog every tape you own. Photograph your tape shelf, AI reads the spines, and every tape gets an ID, a condition and a price. Self-hosted, open source.",
    github: "https://github.com/nitsuah/vhs",
    demo: "https://vhsbox.netlify.app",
    infoUrl: "https://nitsuah.github.io/vhs/",
    highlight: "AI vision spine reading, condition and price tracking",
    tags: ["ai", "postgres", "vision"],
    category: "AI/ML",
    status: "active",
    featured: true,
  },
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
    featured: false,
  },
  {
    id: "darkmoon",
    title: "darkmoon.dev",
    short:
      "3D browser combat game built with React 19, Three.js and Socket.io. Solo combat is live.",
    description:
      "3D browser combat game built with React 19, Three.js and Socket.io. Solo combat is live; multiplayer and mobile gameplay are in active development.",
    github: "https://github.com/nitsuah/darkmoon",
    externalLink: "https://darkmoon.dev",
    infoUrl: "https://darkmoon.dev",
    highlight: "Real-time 3D combat in the browser, multiplayer in progress",
    tags: ["typescript", "threejs", "games", "3d"],
    category: "Apps",
    status: "active",
    featured: false,
  },
  {
    id: "bb-mcp",
    title: "Blackboard MCP",
    short:
      "Production-ready MCP server providing multi-persona access to Blackboard LMS data.",
    description:
      "Full-stack AI product engineering demonstration as an MCP server, exposing Blackboard LMS data across student, instructor, admin, and parent personas with RBAC, PII handling, rate limiting, and streaming response support.",
    github: "https://github.com/nitsuah/bb-mcp",
    highlight:
      "Multi-persona tools, RBAC, streaming responses, institutional compliance",
    tags: ["typescript", "mcp", "ai", "api"],
    category: "Apps",
    status: "active",
    featured: false,
  },
  {
    id: "stash",
    title: "Stash",
    short:
      "15 years of enterprise automation: Atlassian, AWS IaC, SSO flows, and a role-based AI agent system.",
    description:
      "15 years of enterprise automation artifacts — Atlassian config templates, AWS IaC, OAuth/SAML/OIDC flows, SaaS API examples (Okta, Datadog, PagerDuty, Slack), and a role-based AI agent system for personal ops and product delivery.",
    github: "https://github.com/nitsuah/stash",
    demo: "",
    highlight:
      "Practical enterprise tooling, IT automation, workflow optimization",
    tags: ["powershell", "vba", "devops", "sysadmin", "ai"],
    category: "Apps",
    status: "maintained",
    featured: false,
  },
  // Additional Projects
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
    featured: false,
  },
  {
    id: "nitsuah-io",
    title: "Portfolio Site",
    short: "This portfolio website built with Next.js and Web3 integrations.",
    description:
      "Modern portfolio website featuring Next.js 16, TypeScript, Web3 wallet integration, 3D Spline animations, and experimental blockchain tools in the labs section.",
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
  // END WEB3 PROJECTS
  {
    id: "games",
    title: "Nitsuah Arcade",
    short: "Collection of browser-based games and interactive experiences.",
    description:
      "Browser-based game collection featuring classic arcade games and modern interactive experiences built with vanilla JavaScript and canvas.",
    // demo: "https://nitsuah-arcade.netlify.app/", // offline (Netlify site-not-found); restore when the site is back
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
