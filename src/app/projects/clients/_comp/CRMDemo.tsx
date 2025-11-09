// Salesforce-style CRM Demo
"use client";
import React, { useState } from "react";

interface Contact {
  id: number;
  name: string;
  company: string;
  email: string;
  phone: string;
  status: "lead" | "prospect" | "customer";
  value: number;
  lastContact: string;
}

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

interface Task {
  id: number;
  title: string;
  dueDate: string;
  priority: "high" | "medium" | "low";
  status: "pending" | "completed";
  assignedTo: string;
  relatedTo: string;
}

export const CRMDemo: React.FC = () => {
  const [currentView, setCurrentView] = useState<
    "dashboard" | "contacts" | "deals" | "tasks"
  >("dashboard");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedContact, setSelectedContact] = useState<number | null>(null);

  const contacts: Contact[] = [
    {
      id: 1,
      name: "Sarah Johnson",
      company: "TechCorp Inc.",
      email: "sarah.j@techcorp.com",
      phone: "(555) 123-4567",
      status: "customer",
      value: 125000,
      lastContact: "2 days ago",
    },
    {
      id: 2,
      name: "Michael Chen",
      company: "DataSystems LLC",
      email: "m.chen@datasys.com",
      phone: "(555) 234-5678",
      status: "prospect",
      value: 85000,
      lastContact: "1 week ago",
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      company: "CloudNine Solutions",
      email: "emily.r@cloudnine.io",
      phone: "(555) 345-6789",
      status: "lead",
      value: 45000,
      lastContact: "3 days ago",
    },
    {
      id: 4,
      name: "David Kim",
      company: "InnovateTech",
      email: "d.kim@innovate.tech",
      phone: "(555) 456-7890",
      status: "customer",
      value: 200000,
      lastContact: "Yesterday",
    },
    {
      id: 5,
      name: "Lisa Anderson",
      company: "StartupHub",
      email: "l.anderson@startuphub.com",
      phone: "(555) 567-8901",
      status: "lead",
      value: 30000,
      lastContact: "5 days ago",
    },
  ];

  const deals: Deal[] = [
    {
      id: 1,
      name: "Enterprise License",
      company: "TechCorp Inc.",
      value: 125000,
      stage: "won",
      probability: 100,
      closeDate: "2025-01-15",
      contactId: 1,
    },
    {
      id: 2,
      name: "Cloud Migration",
      company: "DataSystems LLC",
      value: 85000,
      stage: "negotiation",
      probability: 75,
      closeDate: "2025-02-01",
      contactId: 2,
    },
    {
      id: 3,
      name: "Software Subscription",
      company: "CloudNine Solutions",
      value: 45000,
      stage: "proposal",
      probability: 50,
      closeDate: "2025-02-15",
      contactId: 3,
    },
    {
      id: 4,
      name: "Consulting Package",
      company: "InnovateTech",
      value: 200000,
      stage: "qualified",
      probability: 60,
      closeDate: "2025-03-01",
      contactId: 4,
    },
    {
      id: 5,
      name: "Starter Package",
      company: "StartupHub",
      value: 30000,
      stage: "lead",
      probability: 25,
      closeDate: "2025-03-15",
      contactId: 5,
    },
  ];

  const tasks: Task[] = [
    {
      id: 1,
      title: "Follow up with TechCorp",
      dueDate: "Today",
      priority: "high",
      status: "pending",
      assignedTo: "You",
      relatedTo: "TechCorp Inc.",
    },
    {
      id: 2,
      title: "Send proposal to DataSystems",
      dueDate: "Tomorrow",
      priority: "high",
      status: "pending",
      assignedTo: "You",
      relatedTo: "DataSystems LLC",
    },
    {
      id: 3,
      title: "Schedule demo with CloudNine",
      dueDate: "Jan 12",
      priority: "medium",
      status: "pending",
      assignedTo: "Sales Team",
      relatedTo: "CloudNine Solutions",
    },
    {
      id: 4,
      title: "Contract review for InnovateTech",
      dueDate: "Jan 15",
      priority: "medium",
      status: "completed",
      assignedTo: "Legal",
      relatedTo: "InnovateTech",
    },
  ];

  const getPipelineStats = () => {
    const byStage = deals.reduce(
      (acc, deal) => {
        acc[deal.stage] = (acc[deal.stage] || 0) + deal.value;
        return acc;
      },
      {} as Record<string, number>,
    );

    return {
      totalValue: deals.reduce((sum, d) => sum + d.value, 0),
      avgDealSize: deals.reduce((sum, d) => sum + d.value, 0) / deals.length,
      wonDeals: deals.filter((d) => d.stage === "won").length,
      byStage,
    };
  };

  const stats = getPipelineStats();

  const getStatusColor = (status: string) => {
    switch (status) {
      case "customer":
      case "won":
      case "completed":
        return "#10b981";
      case "prospect":
      case "negotiation":
        return "#3b82f6";
      case "lead":
      case "proposal":
      case "pending":
        return "#f59e0b";
      case "lost":
        return "#ef4444";
      default:
        return "#6b7280";
    }
  };

  const filteredContacts = contacts.filter(
    (c) =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.email.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", height: "100%" }}>
      {/* Navigation Bar */}
      <nav
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "1rem 1.5rem",
          background: "linear-gradient(135deg, #4f46e5 0%, #3730a3 100%)",
          borderRadius: "8px 8px 0 0",
        }}
      >
        <div
          style={{
            display: "flex",
            gap: "0.5rem",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <span
            style={{
              fontSize: "1.5rem",
              fontWeight: "700",
              color: "#fff",
              marginRight: "1rem",
            }}
          >
            💼 SalesPro CRM
          </span>
          <button
            onClick={() => setCurrentView("dashboard")}
            style={{
              background:
                currentView === "dashboard"
                  ? "rgba(255,255,255,0.3)"
                  : "transparent",
              border: "none",
              color: "#fff",
              padding: "0.5rem 1rem",
              borderRadius: "4px",
              cursor: "pointer",
              fontWeight: "600",
              fontSize: "0.875rem",
            }}
          >
            Dashboard
          </button>
          <button
            onClick={() => setCurrentView("contacts")}
            style={{
              background:
                currentView === "contacts"
                  ? "rgba(255,255,255,0.3)"
                  : "transparent",
              border: "none",
              color: "#fff",
              padding: "0.5rem 1rem",
              borderRadius: "4px",
              cursor: "pointer",
              fontWeight: "600",
              fontSize: "0.875rem",
            }}
          >
            Contacts
          </button>
          <button
            onClick={() => setCurrentView("deals")}
            style={{
              background:
                currentView === "deals"
                  ? "rgba(255,255,255,0.3)"
                  : "transparent",
              border: "none",
              color: "#fff",
              padding: "0.5rem 1rem",
              borderRadius: "4px",
              cursor: "pointer",
              fontWeight: "600",
              fontSize: "0.875rem",
            }}
          >
            Deals
          </button>
          <button
            onClick={() => setCurrentView("tasks")}
            style={{
              background:
                currentView === "tasks"
                  ? "rgba(255,255,255,0.3)"
                  : "transparent",
              border: "none",
              color: "#fff",
              padding: "0.5rem 1rem",
              borderRadius: "4px",
              cursor: "pointer",
              fontWeight: "600",
              fontSize: "0.875rem",
            }}
          >
            Tasks
          </button>
        </div>
        <div style={{ color: "rgba(255,255,255,0.9)", fontSize: "0.875rem" }}>
          👤 Admin
        </div>
      </nav>

      {/* Page Content */}
      <div
        style={{
          padding: "1.5rem",
          minHeight: "400px",
          maxHeight: "500px",
          overflowY: "auto",
        }}
      >
        {/* DASHBOARD VIEW */}
        {currentView === "dashboard" && (
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

            {/* Key Metrics */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                gap: "1rem",
                marginBottom: "2rem",
              }}
            >
              <div
                style={{
                  background:
                    "linear-gradient(135deg, #4f46e5 0%, #3730a3 100%)",
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
                  background:
                    "linear-gradient(135deg, #10b981 0%, #059669 100%)",
                  padding: "1.5rem",
                  borderRadius: "8px",
                  color: "#fff",
                }}
              >
                <div style={{ fontSize: "0.875rem", opacity: 0.9 }}>
                  Deals Won
                </div>
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
                  background:
                    "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)",
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
                  background:
                    "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)",
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

            {/* Sales Pipeline */}
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

            {/* Recent Activity */}
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
                      <span style={{ fontSize: "1.5rem" }}>
                        {activity.icon}
                      </span>
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
        )}

        {/* CONTACTS VIEW */}
        {currentView === "contacts" && (
          <div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "1.5rem",
              }}
            >
              <h2
                style={{
                  fontSize: "1.75rem",
                  fontWeight: "700",
                  color: "#4f46e5",
                  margin: 0,
                }}
              >
                Contacts
              </h2>
              <input
                type="text"
                placeholder="Search contacts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  padding: "0.5rem 1rem",
                  borderRadius: "6px",
                  border: "2px solid rgba(79, 70, 229, 0.3)",
                  background: "rgba(0,0,0,0.3)",
                  color: "#fff",
                  fontSize: "0.875rem",
                  width: "250px",
                }}
              />
            </div>

            <div style={{ display: "grid", gap: "1rem" }}>
              {filteredContacts.map((contact) => (
                <div
                  key={contact.id}
                  style={{
                    background: "rgba(79, 70, 229, 0.1)",
                    border: "2px solid rgba(79, 70, 229, 0.3)",
                    borderRadius: "8px",
                    padding: "1.5rem",
                    cursor: "pointer",
                    transition: "all 0.2s",
                  }}
                  onClick={() => setSelectedContact(contact.id)}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "#4f46e5";
                    e.currentTarget.style.transform = "translateX(4px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor =
                      "rgba(79, 70, 229, 0.3)";
                    e.currentTarget.style.transform = "translateX(0)";
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                    }}
                  >
                    <div style={{ flex: 1 }}>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "0.75rem",
                          marginBottom: "0.5rem",
                        }}
                      >
                        <h3
                          style={{
                            fontSize: "1.25rem",
                            fontWeight: "600",
                            color: "#4f46e5",
                            margin: 0,
                          }}
                        >
                          {contact.name}
                        </h3>
                        <span
                          style={{
                            padding: "0.25rem 0.75rem",
                            borderRadius: "4px",
                            fontSize: "0.75rem",
                            fontWeight: "600",
                            background: `${getStatusColor(contact.status)}20`,
                            color: getStatusColor(contact.status),
                            textTransform: "capitalize",
                          }}
                        >
                          {contact.status}
                        </span>
                      </div>
                      <div
                        style={{
                          fontSize: "0.875rem",
                          color: "rgba(255,255,255,0.8)",
                          marginBottom: "0.5rem",
                        }}
                      >
                        🏢 {contact.company}
                      </div>
                      <div
                        style={{
                          fontSize: "0.875rem",
                          color: "rgba(255,255,255,0.7)",
                        }}
                      >
                        📧 {contact.email} • 📞 {contact.phone}
                      </div>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <div
                        style={{
                          fontSize: "1.25rem",
                          fontWeight: "700",
                          color: "#10b981",
                        }}
                      >
                        ${(contact.value / 1000).toFixed(0)}K
                      </div>
                      <div
                        style={{
                          fontSize: "0.75rem",
                          color: "rgba(255,255,255,0.6)",
                          marginTop: "0.25rem",
                        }}
                      >
                        {contact.lastContact}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* DEALS VIEW */}
        {currentView === "deals" && (
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
        )}

        {/* TASKS VIEW */}
        {currentView === "tasks" && (
          <div>
            <h2
              style={{
                fontSize: "1.75rem",
                fontWeight: "700",
                color: "#4f46e5",
                marginBottom: "1.5rem",
              }}
            >
              Tasks & Activities
            </h2>

            <div style={{ display: "grid", gap: "1rem" }}>
              {tasks.map((task) => (
                <div
                  key={task.id}
                  style={{
                    background: "rgba(79, 70, 229, 0.1)",
                    border: "2px solid rgba(79, 70, 229, 0.3)",
                    borderRadius: "8px",
                    padding: "1.5rem",
                    opacity: task.status === "completed" ? 0.6 : 1,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                    }}
                  >
                    <div style={{ flex: 1 }}>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "0.75rem",
                          marginBottom: "0.5rem",
                        }}
                      >
                        <input
                          type="checkbox"
                          checked={task.status === "completed"}
                          readOnly
                          style={{
                            width: "20px",
                            height: "20px",
                            cursor: "pointer",
                          }}
                        />
                        <h3
                          style={{
                            fontSize: "1.1rem",
                            fontWeight: "600",
                            color: "#4f46e5",
                            margin: 0,
                            textDecoration:
                              task.status === "completed"
                                ? "line-through"
                                : "none",
                          }}
                        >
                          {task.title}
                        </h3>
                      </div>
                      <div
                        style={{
                          fontSize: "0.875rem",
                          color: "rgba(255,255,255,0.7)",
                          marginLeft: "2rem",
                        }}
                      >
                        👤 {task.assignedTo} • 🏢 {task.relatedTo}
                      </div>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-end",
                        gap: "0.5rem",
                      }}
                    >
                      <span
                        style={{
                          padding: "0.25rem 0.75rem",
                          borderRadius: "4px",
                          fontSize: "0.75rem",
                          fontWeight: "600",
                          background: `${getStatusColor(task.priority)}20`,
                          color: getStatusColor(task.priority),
                          textTransform: "capitalize",
                        }}
                      >
                        {task.priority}
                      </span>
                      <div
                        style={{
                          fontSize: "0.875rem",
                          color: "rgba(255,255,255,0.7)",
                        }}
                      >
                        📅 {task.dueDate}
                      </div>
                    </div>
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
          borderTop: "2px solid rgba(79, 70, 229, 0.3)",
          color: "rgba(255, 255, 255, 0.6)",
          fontSize: "0.875rem",
        }}
      >
        © 2025 SalesPro CRM - Demo
      </div>
    </div>
  );
};
