// Resume Website Demo - Professional template inspired by resume page
"use client";
import React, { useState } from "react";
import "./_styles/resumesite.css";

export const ResumeSiteDemo: React.FC = () => {
  const [view, setView] = useState<"resume" | "contact">("resume");

  return (
    <div style={{ fontFamily: "system-ui, sans-serif" }}>
      {/* Header */}
      <div
        className="resume-header"
        style={{
          background: "linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)",
          padding: "2.5rem 2rem",
          borderRadius: "8px 8px 0 0",
          textAlign: "center",
        }}
      >
        <h1
          style={{
            fontSize: "2.5rem",
            fontWeight: "700",
            color: "#fff",
            margin: "0 0 0.5rem 0",
          }}
        >
          Jordan Smith
        </h1>
        <p
          style={{
            fontSize: "1.2rem",
            color: "rgba(255, 255, 255, 0.9)",
            margin: "0 0 0.5rem 0",
            fontWeight: "500",
          }}
        >
          Senior Software Engineer
        </p>
        <p
          style={{
            fontSize: "0.95rem",
            color: "rgba(255, 255, 255, 0.8)",
            margin: 0,
          }}
        >
          📍 San Francisco, CA • 📧 person@email.com • 💼 LinkedIn • 🐙 GitHub
        </p>
      </div>

      {/* Navigation */}
      <div
        className="resume-nav"
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "1rem",
          padding: "1rem",
          background: "rgba(99, 102, 241, 0.1)",
          borderBottom: "2px solid rgba(99, 102, 241, 0.3)",
        }}
      >
        {[
          { id: "resume", label: "Resume", icon: "📄" },
          { id: "contact", label: "Contact", icon: "✉️" },
        ].map((item) => (
          <button
            key={item.id}
            className="resume-nav-btn"
            onClick={() => setView(item.id as any)}
            style={{
              padding: "0.75rem 1.5rem",
              background:
                view === item.id ? "rgba(99, 102, 241, 0.3)" : "transparent",
              border:
                view === item.id
                  ? "2px solid #6366f1"
                  : "2px solid rgba(99, 102, 241, 0.3)",
              color: view === item.id ? "#6366f1" : "rgba(255, 255, 255, 0.7)",
              borderRadius: "8px",
              cursor: "pointer",
              fontWeight: "600",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
            }}
          >
            <span>{item.icon}</span>
            {item.label}
          </button>
        ))}
        <button
          style={{
            padding: "0.75rem 1.5rem",
            background: "linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)",
            border: "none",
            color: "#fff",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "600",
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "scale(1.05)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "scale(1)";
          }}
        >
          <span>⬇️</span>
          Download PDF
        </button>
      </div>

      {/* Content */}
      <div style={{ padding: "2rem 1.5rem", minHeight: "450px" }}>
        {view === "resume" && (
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
                Experienced software engineer with 8+ years building scalable
                web applications. Specialized in React, TypeScript, and cloud
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
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "1.5rem",
                }}
              >
                {[
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
                ].map((job, idx) => (
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

            {/* Skills */}
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
                {[
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
                  {
                    category: "Tools",
                    skills: ["Git", "VS Code", "Figma", "Jira"],
                  },
                ].map((group, idx) => (
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
                    <div
                      style={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: "0.5rem",
                      }}
                    >
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
        )}

        {view === "contact" && (
          <div style={{ maxWidth: "600px", margin: "0 auto" }}>
            <h2
              style={{
                fontSize: "2rem",
                fontWeight: "700",
                color: "#6366f1",
                marginBottom: "1.5rem",
                textAlign: "center",
              }}
            >
              Get In Touch
            </h2>
            <div
              style={{
                background: "rgba(99, 102, 241, 0.1)",
                border: "2px solid rgba(99, 102, 241, 0.3)",
                borderRadius: "12px",
                padding: "2rem",
              }}
            >
              <div style={{ marginBottom: "1.5rem" }}>
                <label
                  style={{
                    display: "block",
                    color: "#6366f1",
                    fontWeight: "600",
                    marginBottom: "0.5rem",
                  }}
                >
                  Name
                </label>
                <input
                  type="text"
                  placeholder="Your name"
                  style={{
                    width: "100%",
                    padding: "0.75rem",
                    background: "rgba(0, 0, 0, 0.3)",
                    border: "2px solid rgba(99, 102, 241, 0.3)",
                    borderRadius: "6px",
                    color: "#fff",
                    fontSize: "1rem",
                  }}
                />
              </div>

              <div style={{ marginBottom: "1.5rem" }}>
                <label
                  style={{
                    display: "block",
                    color: "#6366f1",
                    fontWeight: "600",
                    marginBottom: "0.5rem",
                  }}
                >
                  Email
                </label>
                <input
                  type="email"
                  placeholder="your@email.com"
                  style={{
                    width: "100%",
                    padding: "0.75rem",
                    background: "rgba(0, 0, 0, 0.3)",
                    border: "2px solid rgba(99, 102, 241, 0.3)",
                    borderRadius: "6px",
                    color: "#fff",
                    fontSize: "1rem",
                  }}
                />
              </div>

              <div style={{ marginBottom: "1.5rem" }}>
                <label
                  style={{
                    display: "block",
                    color: "#6366f1",
                    fontWeight: "600",
                    marginBottom: "0.5rem",
                  }}
                >
                  Subject
                </label>
                <input
                  type="text"
                  placeholder="What's this about?"
                  style={{
                    width: "100%",
                    padding: "0.75rem",
                    background: "rgba(0, 0, 0, 0.3)",
                    border: "2px solid rgba(99, 102, 241, 0.3)",
                    borderRadius: "6px",
                    color: "#fff",
                    fontSize: "1rem",
                  }}
                />
              </div>

              <div style={{ marginBottom: "1.5rem" }}>
                <label
                  style={{
                    display: "block",
                    color: "#6366f1",
                    fontWeight: "600",
                    marginBottom: "0.5rem",
                  }}
                >
                  Message
                </label>
                <textarea
                  rows={5}
                  placeholder="Tell me more..."
                  style={{
                    width: "100%",
                    padding: "0.75rem",
                    background: "rgba(0, 0, 0, 0.3)",
                    border: "2px solid rgba(99, 102, 241, 0.3)",
                    borderRadius: "6px",
                    color: "#fff",
                    fontSize: "1rem",
                    fontFamily: "system-ui, sans-serif",
                    resize: "none",
                  }}
                />
              </div>

              <button
                style={{
                  width: "100%",
                  padding: "1rem",
                  background:
                    "linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)",
                  border: "none",
                  color: "#fff",
                  borderRadius: "8px",
                  fontSize: "1.1rem",
                  fontWeight: "700",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "scale(1.02)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                }}
              >
                Send Message
              </button>
            </div>

            {/* Contact Info */}
            <div
              style={{
                marginTop: "2rem",
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                gap: "1rem",
              }}
            >
              {[
                { icon: "📧", label: "Email", value: "jordan@email.com" },
                { icon: "📱", label: "Phone", value: "+1 (555) 123-4567" },
                { icon: "📍", label: "Location", value: "San Francisco, CA" },
              ].map((item, idx) => (
                <div
                  key={idx}
                  style={{
                    background: "rgba(99, 102, 241, 0.1)",
                    border: "1px solid rgba(99, 102, 241, 0.3)",
                    borderRadius: "8px",
                    padding: "1rem",
                    textAlign: "center",
                  }}
                >
                  <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>
                    {item.icon}
                  </div>
                  <div
                    style={{
                      fontSize: "0.875rem",
                      color: "rgba(255, 255, 255, 0.6)",
                      marginBottom: "0.25rem",
                    }}
                  >
                    {item.label}
                  </div>
                  <div
                    style={{
                      fontSize: "0.95rem",
                      color: "#6366f1",
                      fontWeight: "600",
                    }}
                  >
                    {item.value}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div
        style={{
          textAlign: "center",
          padding: "1rem",
          borderTop: "2px solid rgba(99, 102, 241, 0.3)",
          color: "rgba(255, 255, 255, 0.6)",
          fontSize: "0.875rem",
        }}
      >
        © 2025 Jordan Smith - Resume Website Demo
      </div>
    </div>
  );
};
