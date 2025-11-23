import React, { useState } from "react";

export const ContactView: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Handle form submission
  };

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
      <form
        onSubmit={handleSubmit}
        style={{
          background: "rgba(99, 102, 241, 0.1)",
          border: "2px solid rgba(99, 102, 241, 0.3)",
          borderRadius: "12px",
          padding: "2rem",
        }}
      >
        <div style={{ marginBottom: "1.5rem" }}>
          <label
            htmlFor="name"
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
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your name"
            required
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
            htmlFor="email"
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
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="your@email.com"
            required
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
            htmlFor="subject"
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
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            placeholder="What's this about?"
            required
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
            htmlFor="message"
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
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows={5}
            placeholder="Tell me more..."
            required
            style={{
              width: "100%",
              padding: "0.75rem",
              background: "rgba(0, 0, 0, 0.3)",
              border: "2px solid rgba(99, 102, 241, 0.3)",
              borderRadius: "6px",
              color: "#fff",
              fontSize: "1rem",
              fontFamily: "system-ui, sans-serif",
              resize: "vertical",
            }}
          />
        </div>

        <button
          type="submit"
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
            transition: "transform 0.2s",
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
      </form>

      <div
        style={{
          marginTop: "2rem",
          padding: "1.5rem",
          background: "rgba(99, 102, 241, 0.1)",
          border: "2px solid rgba(99, 102, 241, 0.3)",
          borderRadius: "12px",
          textAlign: "center",
        }}
      >
        <p
          style={{
            fontSize: "0.875rem",
            color: "rgba(255, 255, 255, 0.7)",
            marginBottom: "0.5rem",
          }}
        >
          Or reach out directly at:
        </p>
        <p
          style={{
            fontSize: "1.1rem",
            fontWeight: "600",
            color: "#6366f1",
            margin: "0 0 0.5rem 0",
          }}
        >
          person@email.com
        </p>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "1rem",
            marginTop: "1rem",
          }}
        >
          <span style={{ color: "rgba(255, 255, 255, 0.8)" }}>💼 LinkedIn</span>
          <span style={{ color: "rgba(255, 255, 255, 0.8)" }}>🐙 GitHub</span>
        </div>
      </div>
    </div>
  );
};
