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
