// Navigation configuration for Homebar
export const pages = ["about", "resume", "portfolio"];

export const labsSub = [
  { href: "/labs", label: "Hub" },
  { href: "/labs/register", label: "Register" },
  { href: "/labs/mint", label: "Mint" },
  { href: "/labs/domains", label: "Domains" },
  // Disabled for now:
  // { href: "/labs/lookup", label: "Lookup" },
  // { href: "/labs/stake", label: "Stake" },
  // { href: "/labs/token", label: "Token" },
  // { href: "/labs/dao", label: "DAO" },
  // { href: "/labs/ai", label: "AI" },
];

export const portfolioSub = [
  { href: "/projects", label: "Projects" },
  { href: "/projects/clients", label: "Clients" },
  { href: "/projects/blogs", label: "Blogs" },
  { href: "/crypto", label: "Crypto" },
  { label: "Labs", expandable: true, children: labsSub },
];

export const navStyles = {
  appBar: {
    backgroundColor: "rgba(24, 24, 24, 0.9)",
    zIndex: 1000,
  },
  link: {
    textDecoration: "none",
    color: "#f97316",
    display: "flex",
    alignItems: "center",
    transition: "all 0.3s ease",
    fontSize: "clamp(1rem, 2.2vw, 1.25rem)",
    fontWeight: 700,
    letterSpacing: "-0.05em",
    padding: "0.5rem 0",
  },
  menuPaper: {
    backgroundColor: "#1a1a1a",
    border: "2px solid #f97316",
    borderRadius: "8px",
  },
  inlinePopout: {
    background: "#0f1720",
    border: "1px solid rgba(249,115,22,0.9)",
    borderRadius: "6px",
    padding: "0.25rem",
    display: "flex",
    gap: "0.5rem",
    alignItems: "center",
    boxShadow: "0 6px 18px rgba(0,0,0,0.5)",
  },
};
