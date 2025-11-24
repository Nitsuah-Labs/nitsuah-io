"use client";
import React from "react";

export const ContactForm: React.FC = () => {
  return (
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
            background: "linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)",
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
  );
};

export default ContactForm;
