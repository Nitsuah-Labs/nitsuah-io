"use client";
import React from "react";

export const SkillsSection: React.FC = () => {
  const groups = [
    {
      category: "Frontend",
      skills: ["React", "TypeScript", "Next.js", "Tailwind"],
    },
    {
      category: "Backend",
      skills: ["Node.js", "Python", "PostgreSQL", "Redis"],
    },
    {
      category: "DevOps",
      skills: ["AWS", "Docker", "GitHub Actions", "Terraform"],
    },
    { category: "Tools", skills: ["Git", "VS Code", "Figma", "Jira"] },
  ];

  return (
    <section style={{ marginBottom: "2rem" }}>
      <h2
        style={{
          fontSize: "1.5rem",
          fontWeight: "700",
          color: "#6366f1",
          marginBottom: "1rem",
          borderBottom: "2px solid rgba(99, 102, 241, 0.3)",
          paddingBottom: "0.5rem",
        }}
      >
        Technical Skills
      </h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "1rem",
        }}
      >
        {groups.map((group, idx) => (
          <div
            key={idx}
            style={{
              background: "rgba(99, 102, 241, 0.05)",
              border: "1px solid rgba(99, 102, 241, 0.2)",
              borderRadius: "8px",
              padding: "1rem",
            }}
          >
            <h3
              style={{
                fontSize: "1rem",
                fontWeight: "600",
                color: "#6366f1",
                marginBottom: "0.75rem",
              }}
            >
              {group.category}
            </h3>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
              {group.skills.map((skill) => (
                <span
                  key={skill}
                  style={{
                    padding: "0.375rem 0.75rem",
                    background: "rgba(99, 102, 241, 0.15)",
                    border: "1px solid rgba(99, 102, 241, 0.3)",
                    borderRadius: "16px",
                    fontSize: "0.875rem",
                    color: "rgba(255, 255, 255, 0.9)",
                    fontWeight: "500",
                  }}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SkillsSection;
