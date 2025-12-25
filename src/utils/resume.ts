/**
 * Resume utility functions
 */

/** Identifier used in job names to mark subcontracted positions */
export const SUBCONTRACT_IDENTIFIER = "sub.";

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
  // Default to Intermediate (2) as middle of scale without Master level
  return level ? levels[level] || 2 : 2;
}

/**
 * Calculate total years of work experience
 * @param work - Array of work experience entries
 * @param excludeSubcontracted - Whether to exclude subcontracted positions to avoid double counting
 * @returns Total years of experience
 */
export function calculateTotalYearsOfExperience(
  work: Array<{ name: string; startDate: string; endDate?: string }>,
  excludeSubcontracted = true,
): number {
  return work.reduce((sum, job) => {
    // Skip subcontracted work if excludeSubcontracted is true
    if (
      excludeSubcontracted &&
      job.name.toLowerCase().includes(SUBCONTRACT_IDENTIFIER)
    ) {
      return sum;
    }
    const startDate = new Date(job.startDate);
    const endDate = job.endDate ? new Date(job.endDate) : new Date();
    const years =
      (endDate.getTime() - startDate.getTime()) /
      (1000 * 60 * 60 * 24 * 365.25);
    return sum + years;
  }, 0);
}

/**
 * Get company logo URL from Logo.dev API
 * @param companyName - The company name to look up
 * @returns Logo URL or null if not found
 */
export function getCompanyLogoUrl(companyName: string): string | null {
  const lowerName = companyName.toLowerCase();

  // Map company substrings to their domains for logo.dev API
  const companyDomains: { [key: string]: string } = {
    netflix: "netflix.com",
    coinbase: "coinbase.com",
    blackboard: "blackboard.com",
  };

  // Use Logo.dev API for company logos
  for (const key in companyDomains) {
    if (lowerName.includes(key)) {
      return `https://img.logo.dev/${companyDomains[key]}?token=pk_X-omega2IGScyLoz_Uw0Q&size=200`;
    }
  }

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
