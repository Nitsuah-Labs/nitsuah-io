export default function SSRHeader() {
  return (
    <header
      role="banner"
      style={{ position: "fixed", top: 0, left: 0, right: 0 }}
    >
      <nav
        aria-label="Main navigation"
        style={{ display: "flex", gap: "1rem", padding: "1rem" }}
      >
        <a href="/about">About</a>
        <a href="/resume">Resume</a>
        <a href="/crypto">Crypto</a>
        <a href="/projects">Projects</a>
      </nav>
    </header>
  );
}
