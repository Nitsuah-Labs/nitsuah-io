/**
 * Mock data for CRM Demo (Salesforce-style)
 */

export interface Contact {
  id: number;
  name: string;
  company: string;
  email: string;
  phone: string;
  status: "lead" | "prospect" | "customer";
  value: number;
  lastContact: string;
}

export interface Deal {
  id: number;
  name: string;
  company: string;
  value: number;
  stage: "lead" | "qualified" | "proposal" | "negotiation" | "won" | "lost";
  probability: number;
  closeDate: string;
  contactId: number;
}

export interface Task {
  id: number;
  title: string;
  dueDate: string;
  priority: "high" | "medium" | "low";
  status: "pending" | "completed";
  assignedTo: string;
  relatedTo: string;
}

export const mockContacts: Contact[] = [
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

export const mockDeals: Deal[] = [
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

export const mockTasks: Task[] = [
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
