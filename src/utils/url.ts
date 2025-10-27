/**
 * Utility functions for working with URLs and routing
 */

/**
 * Build absolute URL from relative path
 */
export function getAbsoluteUrl(path: string): string {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://nitsuah.io";
  return `${baseUrl}${path.startsWith("/") ? path : `/${path}`}`;
}

/**
 * Get current page URL with query parameters
 */
export function getCurrentUrl(
  path: string,
  params?: Record<string, string>,
): string {
  const url = getAbsoluteUrl(path);
  if (!params) return url;

  const searchParams = new URLSearchParams(params);
  return `${url}?${searchParams.toString()}`;
}

/**
 * Parse query string to object
 */
export function parseQueryString(queryString: string): Record<string, string> {
  const params = new URLSearchParams(queryString);
  const result: Record<string, string> = {};

  params.forEach((value, key) => {
    result[key] = value;
  });

  return result;
}

/**
 * Build query string from object
 */
export function buildQueryString(params: Record<string, any>): string {
  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== null && value !== undefined) {
      searchParams.append(key, String(value));
    }
  });

  return searchParams.toString();
}

/**
 * Check if link is external
 */
export function isExternalLink(url: string): boolean {
  try {
    const urlObj = new URL(url, window.location.origin);
    return urlObj.origin !== window.location.origin;
  } catch {
    return false;
  }
}

/**
 * Add UTM parameters to URL
 */
export function addUtmParams(
  url: string,
  params: {
    source?: string;
    medium?: string;
    campaign?: string;
    term?: string;
    content?: string;
  },
): string {
  const urlObj = new URL(url);

  if (params.source) urlObj.searchParams.set("utm_source", params.source);
  if (params.medium) urlObj.searchParams.set("utm_medium", params.medium);
  if (params.campaign) urlObj.searchParams.set("utm_campaign", params.campaign);
  if (params.term) urlObj.searchParams.set("utm_term", params.term);
  if (params.content) urlObj.searchParams.set("utm_content", params.content);

  return urlObj.toString();
}
