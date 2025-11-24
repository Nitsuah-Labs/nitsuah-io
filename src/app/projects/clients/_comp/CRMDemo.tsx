// Salesforce-style CRM Demo
"use client";
import { mockContacts, mockDeals, mockTasks } from "@/lib/data/demos/crm-data";
import { getCRMStatusColor, getPipelineStats } from "@/lib/utils/demo-helpers";
import React, { useState } from "react";

// Subcomponents
import { ContactsList } from "./crm/ContactsList";
import { Dashboard } from "./crm/Dashboard";
import { DealsView } from "./crm/DealsView";

export const CRMDemo: React.FC = () => {
  const [currentView, setCurrentView] = useState<
    "dashboard" | "contacts" | "deals" | "tasks"
  >("dashboard");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedContact, setSelectedContact] = useState<number | null>(null);

  // Use imported data
  const contacts = mockContacts;
  const deals = mockDeals;
  const tasks = mockTasks;

  const stats = getPipelineStats(deals);

  const filteredContacts = contacts.filter(
    (c) =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.email.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", height: "100%" }}>
      <style>{`
        @media (max-width: 768px) {
          .crm-metrics-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 0.75rem !important;
          }
          
          .crm-pipeline-grid {
            grid-template-columns: repeat(3, 1fr) !important;
            gap: 0.5rem !important;
          }
          
          .crm-header-actions {
            flex-direction: column !important;
            gap: 0.5rem !important;
          }
          
          .crm-sync-text {
            display: none !important;
          }
        }
        
        @media (max-width: 480px) {
          .crm-metrics-grid {
            grid-template-columns: 1fr !important;
          }
          
          .crm-pipeline-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
          
          .crm-nav-tabs {
            gap: 0.25rem !important;
          }
          
          .crm-nav-tab {
            padding: 0.4rem 0.75rem !important;
            font-size: 0.75rem !important;
          }
          
          .crm-contact-card {
            padding: 1rem !important;
          }
          
          .crm-card-content {
            flex-direction: column !important;
            gap: 1rem !important;
          }
        }
      `}</style>
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
          className="crm-nav-tabs"
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
            className="crm-nav-tab"
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
            className="crm-nav-tab"
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
            className="crm-nav-tab"
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
            className="crm-nav-tab"
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
          <Dashboard stats={stats} contacts={contacts} deals={deals} />
        )}

        {/* CONTACTS VIEW */}
        {currentView === "contacts" && (
          <ContactsList
            contacts={filteredContacts}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            onSelectContact={setSelectedContact}
            getStatusColor={getCRMStatusColor}
          />
        )}

        {/* DEALS VIEW */}
        {currentView === "deals" && (
          <DealsView deals={deals} getStatusColor={getCRMStatusColor} />
        )}

        {/* TASKS VIEW */}
        {currentView === "tasks" && (
          <TasksView tasks={tasks} getStatusColor={getCRMStatusColor} />
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
