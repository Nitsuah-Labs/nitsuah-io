/**
 * Helper utilities for demo components
 */

/**
 * Get color class for appointment type
 */
export function getAppointmentTypeColor(type: string): string {
  const colors: Record<string, string> = {
    checkup: "#3b82f6",
    cleaning: "#10b981",
    filling: "#f59e0b",
    emergency: "#ef4444",
    consultation: "#8b5cf6",
  };
  return colors[type] || "#6b7280";
}

/**
 * Get color class for appointment status
 */
export function getAppointmentStatusColor(status: string): string {
  const colors: Record<string, string> = {
    confirmed: "#10b981",
    pending: "#f59e0b",
    completed: "#6b7280",
    cancelled: "#ef4444",
  };
  return colors[status] || "#6b7280";
}

/**
 * Format date for display
 */
export function formatDate(date: Date): string {
  return date.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
}

/**
 * Check if date is today
 */
export function isToday(date: Date): boolean {
  const today = new Date();
  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  );
}

/**
 * Get dates for calendar week
 */
export function getCalendarWeek(startDate: Date): Date[] {
  const week: Date[] = [];
  for (let i = 0; i < 7; i++) {
    const date = new Date(startDate);
    date.setDate(startDate.getDate() + i);
    week.push(date);
  }
  return week;
}

/**
 * Get color for CRM status (contacts, deals, tasks)
 */
export function getCRMStatusColor(status: string): string {
  const colors: Record<string, string> = {
    customer: "#10b981",
    won: "#10b981",
    completed: "#10b981",
    prospect: "#3b82f6",
    negotiation: "#3b82f6",
    lead: "#f59e0b",
    proposal: "#f59e0b",
    pending: "#f59e0b",
    qualified: "#8b5cf6",
    lost: "#ef4444",
  };
  return colors[status] || "#6b7280";
}

/**
 * Calculate pipeline statistics from deals
 */
export function getPipelineStats(
  deals: Array<{ stage: string; value: number }>,
) {
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
}

/**
 * Format currency for display
 */
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Cart helper functions for e-commerce demos
 */
export function calculateCartTotal(
  cart: { [key: number]: number },
  products: Array<{ id: number; price: number }>,
): number {
  return Object.entries(cart).reduce((sum, [id, qty]) => {
    const product = products.find((p) => p.id === Number(id));
    return sum + (product?.price || 0) * qty;
  }, 0);
}

export function getTotalCartItems(cart: { [key: number]: number }): number {
  return Object.values(cart).reduce((sum, qty) => sum + qty, 0);
}

export function generateOrderNumber(): string {
  return `ORD-${Date.now().toString().slice(-8)}`;
}
