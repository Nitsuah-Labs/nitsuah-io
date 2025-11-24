"use client";
import React from "react";

export const ExperienceSection: React.FC = () => {
  const jobs = [
    {
      title: "Senior Software Engineer",
      company: "Tech Corp",
      period: "2021 - Present",
      points: [
        "Led development of customer portal serving 50k+ users",
        "Reduced API response time by 40% through optimization",
        "Mentored 5 junior developers",
      ],
    },
    {
      title: "Software Engineer",
      company: "StartupXYZ",
      period: "2018 - 2021",
      points: [
        "Built e-commerce platform from scratch",
        "Implemented CI/CD pipeline with 99.9% uptime",
        "Collaborated with design team on UX improvements",
      ],
    },
    {
      title: "Junior Developer",
      company: "WebSolutions Inc",
      period: "2016 - 2018",
      points: [
        "Developed client websites using React and Node.js",
        "Contributed to open-source projects",
        "Participated in agile development process",
      ],
    },
  ];

  return (
    <div style={{ maxWidth: "900px", margin: "0 auto" }}>
      {/* Professional Summary */}
      <section style={{ marginBottom: "2rem" }}>
        <h2
          style={{
            fontSize: "1.5rem",
            fontWeight: "700",
            color: "#6366f1",
            marginBottom: "0.75rem",
            borderBottom: "2px solid rgba(99, 102, 241, 0.3)",
            paddingBottom: "0.5rem",
          }}
        >
          Professional Summary
        </h2>
        <p
          style={{
            color: "rgba(255, 255, 255, 0.8)",
            lineHeight: "1.6",
            margin: 0,
          }}
        >
          Experienced software engineer with 8+ years building scalable web
          applications. Specialized in React, TypeScript, and cloud
          architecture. Passionate about creating efficient, user-friendly
          solutions.
        </p>
      </section>

      {/* Work Experience */}
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
          Work Experience
        </h2>
        <div
          style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}
        >
          {jobs.map((job, idx) => (
            <div
              key={idx}
              style={{
                background: "rgba(99, 102, 241, 0.05)",
                border: "1px solid rgba(99, 102, 241, 0.2)",
                borderRadius: "8px",
                padding: "1.25rem",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  marginBottom: "0.75rem",
                  flexWrap: "wrap",
                  gap: "0.5rem",
                }}
              >
                <div>
                  <h3
                    style={{
                      fontSize: "1.1rem",
                      fontWeight: "600",
                      color: "#fff",
                      margin: "0 0 0.25rem 0",
                    }}
                  >
                    {job.title}
                  </h3>
                  <p
                    style={{
                      fontSize: "0.95rem",
                      color: "#6366f1",
                      margin: 0,
                      fontWeight: "500",
                    }}
                  >
                    {job.company}
                  </p>
                </div>
                <span
                  style={{
                    padding: "0.25rem 0.75rem",
                    background: "rgba(99, 102, 241, 0.2)",
                    border: "1px solid rgba(99, 102, 241, 0.4)",
                    borderRadius: "12px",
                    fontSize: "0.875rem",
                    color: "#6366f1",
                    fontWeight: "600",
                  }}
                >
                  {job.period}
                </span>
              </div>
              <ul
                style={{
                  margin: 0,
                  paddingLeft: "1.25rem",
                  color: "rgba(255, 255, 255, 0.7)",
                  lineHeight: "1.6",
                }}
              >
                {job.points.map((point, pidx) => (
                  <li key={pidx} style={{ marginBottom: "0.25rem" }}>
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Education */}
      <section>
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
          Education
        </h2>
        <div
          style={{
            background: "rgba(99, 102, 241, 0.05)",
            border: "1px solid rgba(99, 102, 241, 0.2)",
            borderRadius: "8px",
            padding: "1.25rem",
          }}
        >
          <h3
            style={{
              fontSize: "1.1rem",
              fontWeight: "600",
              color: "#fff",
              margin: "0 0 0.25rem 0",
            }}
          >
            Bachelor of Science in Computer Science
          </h3>
          <p
            style={{
              fontSize: "0.95rem",
              color: "#6366f1",
              margin: "0 0 0.5rem 0",
              fontWeight: "500",
            }}
          >
            University of California, Berkeley
          </p>
          <span
            style={{
              padding: "0.25rem 0.75rem",
              background: "rgba(99, 102, 241, 0.2)",
              border: "1px solid rgba(99, 102, 241, 0.4)",
              borderRadius: "12px",
              fontSize: "0.875rem",
              color: "#6366f1",
              fontWeight: "600",
            }}
          >
            2012 - 2016
          </span>
        </div>
      </section>
    </div>
  );
};

export default ExperienceSection;
