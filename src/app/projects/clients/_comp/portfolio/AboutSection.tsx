import React from "react";

export const AboutSection: React.FC = () => {
  const stats = [
    { label: "Projects Completed", value: "50+" },
    { label: "Years Experience", value: "8" },
    { label: "Happy Clients", value: "30+" },
  ];

  const skills = [
    "Brand Strategy",
    "Visual Design",
    "Photography",
    "Art Direction",
    "UI/UX Design",
    "Motion Graphics",
    "Print Design",
    "Digital Marketing",
  ];

  return (
    <div style={{ maxWidth: "900px", margin: "0 auto" }}>
      <h2
        style={{
          fontSize: "2rem",
          fontWeight: "700",
          color: "#8b5cf6",
          marginBottom: "1.5rem",
          textAlign: "center",
        }}
      >
        About Me
      </h2>

      <div
        style={{
          background: "rgba(139, 92, 246, 0.1)",
          border: "2px solid rgba(139, 92, 246, 0.3)",
          borderRadius: "12px",
          padding: "2rem",
          marginBottom: "2rem",
        }}
      >
        <p
          style={{
            fontSize: "1.1rem",
            color: "rgba(255, 255, 255, 0.9)",
            lineHeight: "1.8",
            marginBottom: "1rem",
          }}
        >
          I'm a creative professional specializing in brand identity, visual
          design, and art direction. With a passion for storytelling through
          visuals, I help businesses and individuals create memorable brand
          experiences that resonate with their audience.
        </p>
        <p
          style={{
            fontSize: "1.1rem",
            color: "rgba(255, 255, 255, 0.8)",
            lineHeight: "1.8",
          }}
        >
          Over the past 8 years, I've had the privilege of working with diverse
          clients across various industries, from startups to established
          brands. My approach combines strategic thinking with creative
          execution to deliver impactful design solutions.
        </p>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "1.5rem",
          marginBottom: "2rem",
        }}
      >
        {stats.map((stat, index) => (
          <div
            key={index}
            style={{
              background: "rgba(139, 92, 246, 0.1)",
              border: "2px solid rgba(139, 92, 246, 0.3)",
              borderRadius: "12px",
              padding: "1.5rem",
              textAlign: "center",
            }}
          >
            <div
              style={{
                fontSize: "2.5rem",
                fontWeight: "700",
                color: "#8b5cf6",
                marginBottom: "0.5rem",
              }}
            >
              {stat.value}
            </div>
            <div
              style={{
                fontSize: "0.875rem",
                color: "rgba(255, 255, 255, 0.7)",
                fontWeight: "600",
              }}
            >
              {stat.label}
            </div>
          </div>
        ))}
      </div>

      <div
        style={{
          background: "rgba(139, 92, 246, 0.1)",
          border: "2px solid rgba(139, 92, 246, 0.3)",
          borderRadius: "12px",
          padding: "2rem",
        }}
      >
        <h3
          style={{
            fontSize: "1.5rem",
            fontWeight: "600",
            color: "#8b5cf6",
            marginBottom: "1rem",
          }}
        >
          Skills & Expertise
        </h3>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "0.75rem",
          }}
        >
          {skills.map((skill, index) => (
            <span
              key={index}
              style={{
                padding: "0.5rem 1rem",
                background: "rgba(139, 92, 246, 0.2)",
                border: "1px solid rgba(139, 92, 246, 0.4)",
                borderRadius: "20px",
                fontSize: "0.875rem",
                fontWeight: "600",
                color: "#8b5cf6",
              }}
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
