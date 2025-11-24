// Navigation configuration for Homebar
export const pages = ["about", "resume", "crypto", "projects"];

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
