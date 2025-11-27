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
    <section className="resume-section">
      <h2 className="resume-section-title">Technical Skills</h2>
      <div className="resume-skills-grid">
        {groups.map((group, idx) => (
          <div key={idx} className="skill-card">
            <h3
              style={{
                fontSize: "1rem",
                fontWeight: 600,
                color: "#6366f1",
                marginBottom: "0.75rem",
              }}
            >
              {group.category}
            </h3>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
              {group.skills.map((skill) => (
                <span key={skill} className="skill-pill">
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
