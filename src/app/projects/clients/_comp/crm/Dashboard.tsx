// Dashboard View Component for CRM Demo
import React from "react";

interface Deal {
  id: number;
  stage: string;
}

interface Contact {
  id: number;
  name: string;
}

interface Stats {
  totalValue: number;
  wonDeals: number;
  avgDealSize: number;
  byStage: { [key: string]: number };
}

interface DashboardProps {
  stats: Stats;
  contacts: Contact[];
  deals: Deal[];
}

export const Dashboard: React.FC<DashboardProps> = ({
  stats,
  contacts,
  deals,
}) => {
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
        Sales Dashboard
      </h2>

      <div
        className="crm-metrics-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "1rem",
          marginBottom: "2rem",
        }}
      >
        <div
          style={{
            background: "linear-gradient(135deg, #4f46e5 0%, #3730a3 100%)",
            padding: "1.5rem",
            borderRadius: "8px",
            color: "#fff",
          }}
        >
          <div style={{ fontSize: "0.875rem", opacity: 0.9 }}>
            Total Pipeline
          </div>
          <div
            style={{
              fontSize: "2rem",
              fontWeight: "700",
              marginTop: "0.5rem",
            }}
          >
            ${(stats.totalValue / 1000).toFixed(0)}K
          </div>
        </div>
        <div
          style={{
            background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
            padding: "1.5rem",
            borderRadius: "8px",
            color: "#fff",
          }}
        >
          <div style={{ fontSize: "0.875rem", opacity: 0.9 }}>Deals Won</div>
          <div
            style={{
              fontSize: "2rem",
              fontWeight: "700",
              marginTop: "0.5rem",
            }}
          >
            {stats.wonDeals}
          </div>
        </div>
        <div
          style={{
            background: "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)",
            padding: "1.5rem",
            borderRadius: "8px",
            color: "#fff",
          }}
        >
          <div style={{ fontSize: "0.875rem", opacity: 0.9 }}>
            Avg Deal Size
          </div>
          <div
            style={{
              fontSize: "2rem",
              fontWeight: "700",
              marginTop: "0.5rem",
            }}
          >
            ${(stats.avgDealSize / 1000).toFixed(0)}K
          </div>
        </div>
        <div
          style={{
            background: "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)",
            padding: "1.5rem",
            borderRadius: "8px",
            color: "#fff",
          }}
        >
          <div style={{ fontSize: "0.875rem", opacity: 0.9 }}>
            Total Contacts
          </div>
          <div
            style={{
              fontSize: "2rem",
              fontWeight: "700",
              marginTop: "0.5rem",
            }}
          >
            {contacts.length}
          </div>
        </div>
      </div>

      <div style={{ marginBottom: "2rem" }}>
        <h3
          style={{
            fontSize: "1.25rem",
            fontWeight: "600",
            color: "#4f46e5",
            marginBottom: "1rem",
          }}
        >
          Sales Pipeline
        </h3>
        <div
          className="crm-pipeline-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
            gap: "0.75rem",
          }}
        >
          {["lead", "qualified", "proposal", "negotiation", "won"].map(
            (stage) => (
              <div
                key={stage}
                style={{
                  background: "rgba(79, 70, 229, 0.1)",
                  border: "2px solid rgba(79, 70, 229, 0.3)",
                  borderRadius: "8px",
                  padding: "1rem",
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    fontSize: "0.75rem",
                    color: "rgba(255,255,255,0.7)",
                    textTransform: "uppercase",
                    marginBottom: "0.5rem",
                  }}
                >
                  {stage}
                </div>
                <div
                  style={{
                    fontSize: "1.25rem",
                    fontWeight: "700",
                    color: "#4f46e5",
                  }}
                >
                  ${((stats.byStage[stage] || 0) / 1000).toFixed(0)}K
                </div>
                <div
                  style={{
                    fontSize: "0.75rem",
                    color: "rgba(255,255,255,0.6)",
                    marginTop: "0.25rem",
                  }}
                >
                  {deals.filter((d) => d.stage === stage).length} deals
                </div>
              </div>
            ),
          )}
        </div>
      </div>

      <div>
        <h3
          style={{
            fontSize: "1.25rem",
            fontWeight: "600",
            color: "#4f46e5",
            marginBottom: "1rem",
          }}
        >
          Recent Activity
        </h3>
        <div
          style={{
            background: "rgba(79, 70, 229, 0.1)",
            border: "2px solid rgba(79, 70, 229, 0.3)",
            borderRadius: "8px",
            padding: "1rem",
          }}
        >
          {[
            {
              action: "Deal won",
              detail: "Enterprise License - TechCorp Inc.",
              time: "2 hours ago",
              icon: "🎉",
            },
            {
              action: "New contact added",
              detail: "Lisa Anderson - StartupHub",
              time: "5 hours ago",
              icon: "👤",
            },
            {
              action: "Task completed",
              detail: "Contract review for InnovateTech",
              time: "Yesterday",
              icon: "✅",
            },
            {
              action: "Meeting scheduled",
              detail: "Demo with CloudNine Solutions",
              time: "2 days ago",
              icon: "📅",
            },
          ].map((activity, idx) => (
            <div
              key={idx}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "0.75rem",
                borderBottom:
                  idx < 3 ? "1px solid rgba(79, 70, 229, 0.2)" : "none",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.75rem",
                }}
              >
                <span style={{ fontSize: "1.5rem" }}>{activity.icon}</span>
                <div>
                  <div style={{ fontWeight: "600", color: "#4f46e5" }}>
                    {activity.action}
                  </div>
                  <div
                    style={{
                      fontSize: "0.875rem",
                      color: "rgba(255,255,255,0.7)",
                    }}
                  >
                    {activity.detail}
                  </div>
                </div>
              </div>
              <div
                style={{
                  fontSize: "0.75rem",
                  color: "rgba(255,255,255,0.6)",
                }}
              >
                {activity.time}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
