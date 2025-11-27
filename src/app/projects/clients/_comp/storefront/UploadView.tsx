// Upload View Component for Storefront Demo
import React from "react";

interface UploadViewProps {
  onSubmit: () => void;
}

export const UploadView: React.FC<UploadViewProps> = ({ onSubmit }) => {
  return (
    <div style={{ maxWidth: "600px", margin: "0 auto" }}>
      <h2
        style={{
          fontSize: "2rem",
          fontWeight: "700",
          color: "#f59e0b",
          marginBottom: "1.5rem",
          textAlign: "center",
        }}
      >
        List a New Item
      </h2>
      <div
        style={{
          background: "rgba(245, 158, 11, 0.1)",
          border: "2px solid rgba(245, 158, 11, 0.3)",
          borderRadius: "12px",
          padding: "2rem",
        }}
      >
        <div style={{ marginBottom: "1.5rem" }}>
          <label
            style={{
              display: "block",
              color: "#f59e0b",
              fontWeight: "600",
              marginBottom: "0.5rem",
            }}
          >
            Product Name
          </label>
          <input
            type="text"
            placeholder="e.g., Wireless Keyboard"
            style={{
              width: "100%",
              padding: "0.75rem",
              background: "rgba(0, 0, 0, 0.3)",
              border: "2px solid rgba(245, 158, 11, 0.3)",
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
              color: "#f59e0b",
              fontWeight: "600",
              marginBottom: "0.5rem",
            }}
          >
            Category
          </label>
          <select
            style={{
              width: "100%",
              padding: "0.75rem",
              background: "rgba(0, 0, 0, 0.3)",
              border: "2px solid rgba(245, 158, 11, 0.3)",
              borderRadius: "6px",
              color: "#fff",
              fontSize: "1rem",
            }}
          >
            <option>Audio</option>
            <option>Wearables</option>
            <option>Computers</option>
            <option>Photography</option>
            <option>Accessories</option>
          </select>
        </div>

        <div
          className="store-form-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "1rem",
            marginBottom: "1.5rem",
          }}
        >
          <div>
            <label
              style={{
                display: "block",
                color: "#f59e0b",
                fontWeight: "600",
                marginBottom: "0.5rem",
              }}
            >
              Price ($)
            </label>
            <input
              type="number"
              placeholder="0.00"
              style={{
                width: "100%",
                padding: "0.75rem",
                background: "rgba(0, 0, 0, 0.3)",
                border: "2px solid rgba(245, 158, 11, 0.3)",
                borderRadius: "6px",
                color: "#fff",
                fontSize: "1rem",
              }}
            />
          </div>
          <div>
            <label
              style={{
                display: "block",
                color: "#f59e0b",
                fontWeight: "600",
                marginBottom: "0.5rem",
              }}
            >
              Stock
            </label>
            <input
              type="number"
              placeholder="0"
              style={{
                width: "100%",
                padding: "0.75rem",
                background: "rgba(0, 0, 0, 0.3)",
                border: "2px solid rgba(245, 158, 11, 0.3)",
                borderRadius: "6px",
                color: "#fff",
                fontSize: "1rem",
              }}
            />
          </div>
        </div>

        <div style={{ marginBottom: "1.5rem" }}>
          <label
            style={{
              display: "block",
              color: "#f59e0b",
              fontWeight: "600",
              marginBottom: "0.5rem",
            }}
          >
            Description
          </label>
          <textarea
            rows={4}
            placeholder="Describe your product..."
            style={{
              width: "100%",
              padding: "0.75rem",
              background: "rgba(0, 0, 0, 0.3)",
              border: "2px solid rgba(245, 158, 11, 0.3)",
              borderRadius: "6px",
              color: "#fff",
              fontSize: "1rem",
              fontFamily: "system-ui, sans-serif",
              resize: "none",
            }}
          />
        </div>

        <div style={{ marginBottom: "1.5rem" }}>
          <label
            style={{
              display: "block",
              color: "#f59e0b",
              fontWeight: "600",
              marginBottom: "0.5rem",
            }}
          >
            Images
          </label>
          <div
            style={{
              border: "2px dashed rgba(245, 158, 11, 0.3)",
              borderRadius: "8px",
              padding: "2rem",
              textAlign: "center",
              color: "rgba(255, 255, 255, 0.6)",
              cursor: "pointer",
            }}
          >
            <div style={{ fontSize: "3rem", marginBottom: "0.5rem" }}>📁</div>
            <p>Click to upload or drag and drop</p>
            <p style={{ fontSize: "0.875rem" }}>PNG, JPG, GIF up to 10MB</p>
          </div>
        </div>

        <button
          onClick={onSubmit}
          style={{
            width: "100%",
            padding: "1rem",
            background: "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)",
            border: "none",
            color: "#fff",
            borderRadius: "8px",
            fontSize: "1.1rem",
            fontWeight: "700",
            cursor: "pointer",
          }}
        >
          List Item for Sale
        </button>
      </div>
    </div>
  );
};
