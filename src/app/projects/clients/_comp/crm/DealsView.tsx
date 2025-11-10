import React from "react";

interface Deal {
  id: number;
  name: string;
  company: string;
  value: number;
  stage: "lead" | "qualified" | "proposal" | "negotiation" | "won" | "lost";
  probability: number;
  closeDate: string;
  contactId: number;
}

interface DealsViewProps {
  deals: Deal[];
}

export const DealsView: React.FC<DealsViewProps> = ({ deals }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "won":
        return "#10b981";
      case "negotiation":
        return "#3b82f6";
      case "proposal":
        return "#f59e0b";
      case "lost":
        return "#ef4444";
      default:
        return "#6b7280";
    }
  };

  return (
    <div>
      <h2
        style={{
          fontSize: "1.75rem",
          fontWeight: "700",
          color: "#4f46e5",
          marginBottom: "1.5rem",
        }}
      >
        Deal Pipeline
      </h2>

      <div style={{ display: "grid", gap: "1rem" }}>
        {deals.map((deal) => (
          <div
            key={deal.id}
            style={{
              background: "rgba(79, 70, 229, 0.1)",
              border: "2px solid rgba(79, 70, 229, 0.3)",
              borderRadius: "8px",
              padding: "1.5rem",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                marginBottom: "1rem",
              }}
            >
              <div>
                <h3
                  style={{
                    fontSize: "1.25rem",
                    fontWeight: "600",
                    color: "#4f46e5",
                    margin: "0 0 0.5rem 0",
                  }}
                >
                  {deal.name}
                </h3>
                <div
                  style={{
                    fontSize: "0.875rem",
                    color: "rgba(255,255,255,0.8)",
                  }}
                >
                  {deal.company}
                </div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div
                  style={{
                    fontSize: "1.5rem",
                    fontWeight: "700",
                    color: "#10b981",
                  }}
                >
                  ${(deal.value / 1000).toFixed(0)}K
                </div>
                <div
                  style={{
                    fontSize: "0.75rem",
                    color: "rgba(255,255,255,0.6)",
                    marginTop: "0.25rem",
                  }}
                >
                  {deal.probability}% probability
                </div>
              </div>
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                marginBottom: "0.75rem",
              }}
            >
              <span
                style={{
                  padding: "0.25rem 0.75rem",
                  borderRadius: "4px",
                  fontSize: "0.75rem",
                  fontWeight: "600",
                  background: `${getStatusColor(deal.stage)}20`,
                  color: getStatusColor(deal.stage),
                  textTransform: "capitalize",
                }}
              >
                {deal.stage}
              </span>
              <span
                style={{
                  fontSize: "0.875rem",
                  color: "rgba(255,255,255,0.7)",
                }}
              >
                • Close date: {deal.closeDate}
              </span>
            </div>

            {/* Progress Bar */}
            <div
              style={{
                background: "rgba(79, 70, 229, 0.2)",
                borderRadius: "4px",
                height: "8px",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  background: getStatusColor(deal.stage),
                  height: "100%",
                  width: `${deal.probability}%`,
                  transition: "width 0.3s ease",
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
