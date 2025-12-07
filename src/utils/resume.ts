/**
 * Resume utility functions
 */

export function formatDate(dateStr: string): string {
  if (!dateStr) return "";
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
}

export function calculateDuration(startDate: string, endDate?: string): string {
  if (!startDate) return "";

  const start = new Date(startDate);
  const end = endDate ? new Date(endDate) : new Date();

  const diffMs = end.getTime() - start.getTime();
  const diffMonths = diffMs / (1000 * 60 * 60 * 24 * 30.44);
  const years = Math.floor(diffMonths / 12);
  const months = Math.round(diffMonths % 12);

  const decimalYears = (diffMonths / 12).toFixed(1);

  if (years === 0) {
    return `${months} month${months !== 1 ? "s" : ""} (${(diffMonths / 12).toFixed(1)} years)`;
  } else if (months === 0) {
    return `${years} year${years !== 1 ? "s" : ""} (${decimalYears} years)`;
  } else {
    return `${years} year${years !== 1 ? "s" : ""}, ${months} month${months !== 1 ? "s" : ""} (${decimalYears} years)`;
  }
}

export function extractDurationText(duration: string): string {
  return duration.match(/\(([^)]+)\)/)?.[1] || duration;
}

export function getProficiencyLevel(level?: string): number {
  const levels: { [key: string]: number } = {
    Beginner: 1,
    Intermediate: 2,
    Advanced: 3,
    Expert: 4,
  };
  return level ? levels[level] || 3 : 3;
}

/**
 * Get company logo URL from Clearbit Logo API
 * @param companyName - The company name to look up
 * @returns Logo URL or null if not found
 */
export function getCompanyLogoUrl(companyName: string): string | null {
  const lowerName = companyName.toLowerCase();

  // Use Clearbit Logo API for high-quality company logos
  if (lowerName.includes("netflix"))
    return "https://logo.clearbit.com/netflix.com";
  if (lowerName.includes("coinbase"))
    return "https://logo.clearbit.com/coinbase.com";
  if (lowerName.includes("blackboard"))
    return "https://logo.clearbit.com/blackboard.com";

  return null;
}

/**
 * Get institution logo for education section
 * @param institutionName - The institution name
 * @returns Logo path or URL
 */
export function getInstitutionLogo(institutionName: string): string | null {
  const lowerName = institutionName.toLowerCase();

  // Map known institutions to their logo paths
  if (lowerName.includes("virginia tech") || lowerName.includes("vt")) {
    return "/assets/vt-logo.png";
  }

  // Could add more institutions here
  // if (lowerName.includes("mit")) return "/assets/mit-logo.png";

  return null;
}
