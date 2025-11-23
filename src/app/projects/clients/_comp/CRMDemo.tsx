// Salesforce-style CRM Demo
"use client";
import React, { useState } from "react";
import { DashboardView } from "./crm/DashboardView";
import { ContactsView } from "./crm/ContactsView";
import { DealsView } from "./crm/DealsView";
import { TasksView } from "./crm/TasksView";

export const CRMDemo: React.FC = () => {
  const [currentView, setCurrentView] = useState<
    "dashboard" | "contacts" | "deals" | "tasks"
  >("dashboard");

  if (currentView === "contacts") {
    return <ContactsView onBack={() => setCurrentView("dashboard")} />;
  }

  if (currentView === "deals") {
    return <DealsView onBack={() => setCurrentView("dashboard")} />;
  }

  if (currentView === "tasks") {
    return <TasksView onBack={() => setCurrentView("dashboard")} />;
  }

  return (
    <DashboardView
      onViewContacts={() => setCurrentView("contacts")}
      onViewDeals={() => setCurrentView("deals")}
      onViewTasks={() => setCurrentView("tasks")}
    />
  );
};
