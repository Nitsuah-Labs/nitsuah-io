"use client";

import React, { useEffect, useState } from "react";

interface Heading {
  id: string;
  text: string;
  level: number;
}

export default function TableOfContents() {
  const [headings, setHeadings] = useState<Heading[]>([]);

  useEffect(() => {
    const nodes = document.querySelectorAll(
      ".blog-content h2, .blog-content h3",
    );
    const extracted: Heading[] = [];
    nodes.forEach((node) => {
      const level = node.tagName === "H2" ? 2 : 3;
      const id =
        node.id || node.textContent?.replace(/\s+/g, "-").toLowerCase() || "";
      if (id) {
        extracted.push({ id, text: node.textContent || "", level });
      }
    });
    setHeadings(extracted);
  }, []);

  if (headings.length === 0) return null;

  return (
    <nav
      className="toc"
      style={{
        position: "sticky",
        top: "100px",
        maxWidth: "200px",
        marginLeft: "2rem",
        padding: "1rem",
        background: "rgba(0,0,0,0.4)",
        border: "1px solid rgba(59,130,246,0.3)",
        borderRadius: "8px",
        fontSize: "0.9rem",
      }}
    >
      <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
        {headings.map((h) => (
          <li
            key={h.id}
            style={{
              marginBottom: "0.5rem",
              marginLeft: h.level === 3 ? "1rem" : "0",
            }}
          >
            <a
              href={`#${h.id}`}
              style={{ color: "#3b82f6", textDecoration: "none" }}
            >
              {h.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
