// SaaS Analytics Dashboard Demo
"use client";
import React, { useState } from "react";

export const SaaSDemo: React.FC = () => {
  const [currentView, setCurrentView] = useState<
    "dashboard" | "reports" | "settings"
  >("dashboard");

  const metrics = [
    { label: "Total Users", value: "12,543", change: "+12%", icon: "👥" },
    { label: "Revenue", value: "$45,231", change: "+8%", icon: "💰" },
    { label: "Active Projects", value: "89", change: "+15%", icon: "📊" },
    { label: "Conversion Rate", value: "3.2%", change: "+2%", icon: "📈" },
  ];

  return (
    <div style={{ fontFamily: "system-ui, sans-serif" }}>
      {/* Top Bar */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "1rem 1.5rem",
          background: "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)",
          borderRadius: "8px 8px 0 0",
        }}
      >
        <span style={{ fontSize: "1.5rem", fontWeight: "700", color: "#fff" }}>
          📊 MetricsHub
        </span>
        <div style={{ display: "flex", gap: "0.5rem" }}>
          <button
            style={{
              background: "rgba(255, 255, 255, 0.2)",
              border: "1px solid rgba(255, 255, 255, 0.4)",
              color: "#fff",
              padding: "0.5rem 1rem",
              borderRadius: "6px",
              cursor: "pointer",
              fontSize: "0.875rem",
            }}
          >
            Export Data
          </button>
          <button
            style={{
              background: "#fff",
              border: "none",
              color: "#3b82f6",
              padding: "0.5rem 1rem",
              borderRadius: "6px",
              cursor: "pointer",
              fontWeight: "600",
              fontSize: "0.875rem",
            }}
          >
            👤 Admin
          </button>
        </div>
      </div>

      {/* Sidebar Navigation */}
      <div style={{ display: "flex" }}>
        <div
          style={{
            width: "200px",
            background: "rgba(59, 130, 246, 0.1)",
            padding: "1.5rem 1rem",
            borderRight: "2px solid rgba(59, 130, 246, 0.3)",
          }}
        >
          {[
            { id: "dashboard", label: "Dashboard", icon: "📊" },
            { id: "reports", label: "Reports", icon: "📄" },
            { id: "settings", label: "Settings", icon: "⚙️" },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setCurrentView(item.id as any)}
              style={{
                width: "100%",
                padding: "0.75rem",
                marginBottom: "0.5rem",
                background:
                  currentView === item.id
                    ? "rgba(59, 130, 246, 0.3)"
                    : "transparent",
                border:
                  currentView === item.id
                    ? "2px solid #3b82f6"
                    : "2px solid transparent",
                color:
                  currentView === item.id
                    ? "#3b82f6"
                    : "rgba(255, 255, 255, 0.7)",
                borderRadius: "6px",
                cursor: "pointer",
                textAlign: "left",
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
        </div>

        {/* Main Content */}
        <div style={{ flex: 1, padding: "2rem" }}>
          {currentView === "dashboard" && (
            <div>
              <h2
                style={{
                  fontSize: "1.75rem",
                  fontWeight: "700",
                  color: "#3b82f6",
                  marginBottom: "1.5rem",
                }}
              >
                Analytics Dashboard
              </h2>

              {/* Metrics Grid */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
                  gap: "1rem",
                  marginBottom: "2rem",
                }}
              >
                {metrics.map((metric, idx) => (
                  <div
                    key={idx}
                    style={{
                      background: "rgba(59, 130, 246, 0.1)",
                      border: "2px solid rgba(59, 130, 246, 0.3)",
                      borderRadius: "8px",
                      padding: "1rem",
                    }}
                  >
                    <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>
                      {metric.icon}
                    </div>
                    <div
                      style={{
                        fontSize: "0.75rem",
                        color: "rgba(255, 255, 255, 0.6)",
                        marginBottom: "0.25rem",
                      }}
                    >
                      {metric.label}
                    </div>
                    <div
                      style={{
                        fontSize: "1.5rem",
                        fontWeight: "700",
                        color: "#fff",
                        marginBottom: "0.25rem",
                      }}
                    >
                      {metric.value}
                    </div>
                    <div
                      style={{
                        fontSize: "0.875rem",
                        color: "#10b981",
                        fontWeight: "600",
                      }}
                    >
                      {metric.change}
                    </div>
                  </div>
                ))}
              </div>

              {/* Chart Placeholder */}
              <div
                style={{
                  background: "rgba(59, 130, 246, 0.1)",
                  border: "2px solid rgba(59, 130, 246, 0.3)",
                  borderRadius: "8px",
                  padding: "1.5rem",
                  marginBottom: "1rem",
                }}
              >
                <h3
                  style={{
                    fontSize: "1.25rem",
                    fontWeight: "600",
                    color: "#3b82f6",
                    marginBottom: "1rem",
                  }}
                >
                  Revenue Over Time
                </h3>
                <div
                  style={{
                    height: "200px",
                    display: "flex",
                    alignItems: "flex-end",
                    gap: "0.5rem",
                  }}
                >
                  {[40, 60, 45, 70, 55, 80, 65, 90, 75, 85].map(
                    (height, idx) => (
                      <div
                        key={idx}
                        style={{
                          flex: 1,
                          height: `${height}%`,
                          background:
                            "linear-gradient(to top, #3b82f6, #60a5fa)",
                          borderRadius: "4px 4px 0 0",
                          transition: "all 0.3s",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background =
                            "linear-gradient(to top, #2563eb, #3b82f6)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background =
                            "linear-gradient(to top, #3b82f6, #60a5fa)";
                        }}
                      />
                    ),
                  )}
                </div>
              </div>
            </div>
          )}

          {currentView === "reports" && (
            <div>
              <h2
                style={{
                  fontSize: "1.75rem",
                  fontWeight: "700",
                  color: "#3b82f6",
                  marginBottom: "1.5rem",
                }}
              >
                Reports
              </h2>
              {[
                "Monthly Revenue Report",
                "User Activity Report",
                "Conversion Analysis",
              ].map((report, idx) => (
                <div
                  key={idx}
                  style={{
                    background: "rgba(59, 130, 246, 0.1)",
                    border: "2px solid rgba(59, 130, 246, 0.3)",
                    borderRadius: "8px",
                    padding: "1rem",
                    marginBottom: "1rem",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <div>
                    <div
                      style={{
                        fontWeight: "600",
                        color: "#fff",
                        marginBottom: "0.25rem",
                      }}
                    >
                      {report}
                    </div>
                    <div
                      style={{
                        fontSize: "0.875rem",
                        color: "rgba(255, 255, 255, 0.6)",
                      }}
                    >
                      Generated {idx + 1} day ago
                    </div>
                  </div>
                  <button
                    style={{
                      padding: "0.5rem 1rem",
                      background: "#3b82f6",
                      border: "none",
                      color: "#fff",
                      borderRadius: "6px",
                      cursor: "pointer",
                      fontWeight: "600",
                    }}
                  >
                    Download
                  </button>
                </div>
              ))}
            </div>
          )}

          {currentView === "settings" && (
            <div>
              <h2
                style={{
                  fontSize: "1.75rem",
                  fontWeight: "700",
                  color: "#3b82f6",
                  marginBottom: "1.5rem",
                }}
              >
                Settings
              </h2>
              <div
                style={{
                  background: "rgba(59, 130, 246, 0.1)",
                  border: "2px solid rgba(59, 130, 246, 0.3)",
                  borderRadius: "8px",
                  padding: "1.5rem",
                }}
              >
                {[
                  "Email Notifications",
                  "Data Export Format",
                  "Dashboard Theme",
                  "API Access",
                ].map((setting, idx) => (
                  <div
                    key={idx}
                    style={{
                      padding: "1rem",
                      borderBottom:
                        idx < 3 ? "1px solid rgba(59, 130, 246, 0.2)" : "none",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <span style={{ color: "#fff", fontWeight: "500" }}>
                      {setting}
                    </span>
                    <button
                      style={{
                        padding: "0.375rem 0.75rem",
                        background: "rgba(59, 130, 246, 0.3)",
                        border: "1px solid #3b82f6",
                        color: "#3b82f6",
                        borderRadius: "4px",
                        cursor: "pointer",
                        fontSize: "0.875rem",
                      }}
                    >
                      Configure
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <div
        style={{
          textAlign: "center",
          padding: "1rem",
          borderTop: "2px solid rgba(59, 130, 246, 0.3)",
          color: "rgba(255, 255, 255, 0.6)",
          fontSize: "0.875rem",
        }}
      >
        © 2025 MetricsHub - SaaS Dashboard Demo
      </div>
    </div>
  );
};
