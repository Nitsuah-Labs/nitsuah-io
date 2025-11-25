// Navigation configuration for Homebar
export const pages = [
  "about",
  "resume",
  "crypto",
  "projects",
  "blogs",
  "clients",
  "labs",
];

export const projectsSub = [
  { href: "/projects", label: "All Projects" },
  { href: "/projects/clients", label: "Clients" },
  { href: "/projects/blogs", label: "Blogs" },
];

export const labsSub = [
  { href: "/labs", label: "Hub" },
  { href: "/labs/register", label: "Register" },
  { href: "/labs/mint", label: "Mint" },
  { href: "/labs/domains", label: "Domains" },
  { href: "/labs/lookup", label: "Lookup" },
  { href: "/labs/stake", label: "Stake" },
  { href: "/labs/token", label: "Token" },
  { href: "/labs/dao", label: "DAO" },
  { href: "/labs/ai", label: "AI" },
];

export const navStyles = {
  appBar: {
    backgroundColor: "rgba(24, 24, 24, 0.9)",
    zIndex: 1000,
  },
  link: {
    textDecoration: "none",
    color: "#10b981",
    display: "flex",
    alignItems: "center",
    transition: "all 0.3s ease",
    fontSize: "clamp(1.5rem, 3vw, 2.5rem)",
    fontWeight: 900,
    letterSpacing: "-0.05em",
    padding: "0.5rem 0",
  },
  menuPaper: {
    backgroundColor: "#1a1a1a",
    border: "2px solid #f97316",
    borderRadius: "8px",
  },
};
