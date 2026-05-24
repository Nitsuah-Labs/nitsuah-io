/**
 * Resume utility functions
 */

/** Identifier used in job names to mark subcontracted positions */
export const SUBCONTRACT_IDENTIFIER = "sub.";

export function isContractingRole(companyName: string): boolean {
  const normalized = companyName.toLowerCase();
  return (
    /\bsub[.:]\b/.test(normalized) ||
    normalized.includes(SUBCONTRACT_IDENTIFIER)
  );
}

export function formatDate(dateStr: string): string {
  if (!dateStr) return "";

  const dateOnlyMatch = dateStr.match(/^(\d{4})-(\d{2})/);
  if (dateOnlyMatch) {
    const year = Number(dateOnlyMatch[1]);
    const monthIndex = Number(dateOnlyMatch[2]) - 1;
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    if (monthIndex >= 0 && monthIndex < months.length) {
      return `${months[monthIndex]} ${year}`;
    }
  }

  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
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
  return getSkillLevelMeta(level).score;
}

export type NormalizedSkillLevel =
  | "beginner"
  | "intermediate"
  | "advanced"
  | "expert";

export function normalizeProficiencyLevel(
  level?: string,
): NormalizedSkillLevel {
  const normalized = level?.trim().toLowerCase();

  if (normalized === "master" || normalized === "expert") return "expert";
  if (normalized === "advanced") return "advanced";
  if (normalized === "beginner" || normalized === "novice") return "beginner";

  return "intermediate";
}

export function getSkillLevelMeta(level?: string): {
  normalized: NormalizedSkillLevel;
  score: number;
  label: string;
} {
  const normalized = normalizeProficiencyLevel(level);

  const metaByLevel: Record<
    NormalizedSkillLevel,
    { score: number; label: string }
  > = {
    beginner: { score: 1, label: "Beginner" },
    intermediate: { score: 2, label: "Intermediate" },
    advanced: { score: 3, label: "Advanced" },
    expert: { score: 5, label: "Expert" },
  };

  return {
    normalized,
    score: metaByLevel[normalized].score,
    label: metaByLevel[normalized].label,
  };
}

export function parseSkillKeywords(keywords: string[] = []): string[] {
  const seen = new Set<string>();

  return keywords
    .flatMap((entry) => entry.split(","))
    .map((keyword) => keyword.trim())
    .filter((keyword) => keyword.length > 0)
    .filter((keyword) => {
      const normalized = keyword.toLowerCase();
      if (seen.has(normalized)) return false;
      seen.add(normalized);
      return true;
    });
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
    if (excludeSubcontracted && isContractingRole(job.name)) {
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

  // Deterministic local logos for the top resume companies.
  const localCompanyLogos: { [key: string]: string } = {
    netflix: "/images/netflix-logo.svg",
    coinbase: "/images/coinbase-logo.svg",
    blackboard: "/images/blackboard-logo.svg",
  };

  for (const key in localCompanyLogos) {
    if (lowerName.includes(key)) {
      return localCompanyLogos[key];
    }
  }

  // Map company substrings to their domains for logo.dev API
  const companyDomains: { [key: string]: string } = {
    netflix: "netflix.com",
    coinbase: "coinbase.com",
    blackboard: "blackboard.com",
  };

  // Use Logo.dev API for company logos; fall back to Clearbit when token is not set
  const token = process.env.NEXT_PUBLIC_LOGO_DEV_TOKEN;

  for (const key in companyDomains) {
    if (lowerName.includes(key)) {
      const domain = companyDomains[key];
      if (token) {
        return `https://img.logo.dev/${domain}?token=${encodeURIComponent(token)}&size=200`;
      }
      // Clearbit fallback – no auth required, works without env var
      return `https://logo.clearbit.com/${domain}`;
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
