// Deals View Component for CRM Demo
import React from "react";

interface Deal {
  id: number;
  name: string;
  company: string;
  value: number;
  stage: string;
  probability: number;
  closeDate: string;
}

interface DealsViewProps {
  deals: Deal[];
  getStatusColor: (status: string) => string;
}

export const DealsView: React.FC<DealsViewProps> = ({
  deals,
  getStatusColor,
}) => {
  const stages = ["lead", "qualified", "proposal", "negotiation", "won"];

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
        Sales Pipeline
      </h2>

      <div
        className="crm-pipeline"
        style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}
      >
        {stages.map((stage) => {
          const stageDeals = deals.filter((deal) => deal.stage === stage);
          return (
            <div key={stage}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "0.75rem",
                }}
              >
                <h3
                  style={{
                    fontSize: "1.125rem",
                    fontWeight: "600",
                    color: "#4f46e5",
                    textTransform: "capitalize",
                  }}
                >
                  {stage}
                </h3>
                <span
                  style={{
                    fontSize: "0.875rem",
                    color: "rgba(255,255,255,0.7)",
                  }}
                >
                  {stageDeals.length} deals · $
                  {(
                    stageDeals.reduce((sum, d) => sum + d.value, 0) / 1000
                  ).toFixed(0)}
                  K
                </span>
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.75rem",
                }}
              >
                {stageDeals.map((deal) => (
                  <div
                    key={deal.id}
                    style={{
                      background: "rgba(79, 70, 229, 0.1)",
                      border: "2px solid rgba(79, 70, 229, 0.3)",
                      borderRadius: "8px",
                      padding: "1rem",
                      transition: "all 0.3s ease",
                      cursor: "pointer",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = "#4f46e5";
                      e.currentTarget.style.background =
                        "rgba(79, 70, 229, 0.2)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor =
                        "rgba(79, 70, 229, 0.3)";
                      e.currentTarget.style.background =
                        "rgba(79, 70, 229, 0.1)";
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "start",
                        marginBottom: "0.75rem",
                      }}
                    >
                      <div>
                        <h4
                          style={{
                            fontSize: "1rem",
                            fontWeight: "600",
                            color: "#4f46e5",
                            marginBottom: "0.25rem",
                          }}
                        >
                          {deal.name}
                        </h4>
                        <div
                          style={{
                            fontSize: "0.875rem",
                            color: "rgba(255,255,255,0.7)",
                          }}
                        >
                          {deal.company}
                        </div>
                      </div>
                      <div
                        style={{
                          fontSize: "1rem",
                          fontWeight: "700",
                          color: "#10b981",
                        }}
                      >
                        ${(deal.value / 1000).toFixed(0)}K
                      </div>
                    </div>

                    <div
                      style={{
                        display: "flex",
                        gap: "1rem",
                        fontSize: "0.75rem",
                        color: "rgba(255,255,255,0.6)",
                        marginBottom: "0.5rem",
                      }}
                    >
                      <span>Close: {deal.closeDate}</span>
                      <span>•</span>
                      <span>Probability: {deal.probability}%</span>
                    </div>

                    <div style={{ marginTop: "0.5rem" }}>
                      <div
                        style={{
                          height: "4px",
                          background: "rgba(79, 70, 229, 0.2)",
                          borderRadius: "2px",
                          overflow: "hidden",
                        }}
                      >
                        <div
                          style={{
                            height: "100%",
                            width: `${deal.probability}%`,
                            background: getStatusColor(stage),
                            transition: "width 0.3s ease",
                          }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
