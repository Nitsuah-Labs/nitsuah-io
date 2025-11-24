"use client";
import React from "react";

export const ContactForm: React.FC = () => {
  return (
    <div className="contact-container">
      <h2
        style={{
          fontSize: "2rem",
          fontWeight: 700,
          color: "#6366f1",
          marginBottom: "1.5rem",
          textAlign: "center",
        }}
      >
        Get In Touch
      </h2>
      <div className="contact-card">
        <div className="form-row">
          <label className="form-label">Name</label>
          <input className="form-input" type="text" placeholder="Your name" />
        </div>

        <div className="form-row">
          <label className="form-label">Email</label>
          <input
            className="form-input"
            type="email"
            placeholder="your@email.com"
          />
        </div>

        <div className="form-row">
          <label className="form-label">Subject</label>
          <input
            className="form-input"
            type="text"
            placeholder="What's this about?"
          />
        </div>

        <div className="form-row">
          <label className="form-label">Message</label>
          <textarea
            className="form-textarea"
            rows={5}
            placeholder="Tell me more..."
          />
        </div>

        <button
          className="btn-primary"
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.transform = "scale(1.02)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.transform = "scale(1)";
          }}
        >
          Send Message
        </button>
      </div>

      <div className="resume-contact-grid">
        {[
          { icon: "📧", label: "Email", value: "jordan@email.com" },
          { icon: "📱", label: "Phone", value: "+1 (555) 123-4567" },
          { icon: "📍", label: "Location", value: "San Francisco, CA" },
        ].map((item, idx) => (
          <div key={idx} className="contact-item">
            <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>
              {item.icon}
            </div>
            <div className="label">{item.label}</div>
            <div className="value">{item.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContactForm;
