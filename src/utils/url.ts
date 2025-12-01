/**
 * Utility functions for working with URLs and routing
 */

/**
 * Build absolute URL from relative path using site's base URL
 * @param path - Relative path (with or without leading slash)
 * @returns Absolute URL
 * @example
 * getAbsoluteUrl('/about') // 'https://nitsuah.io/about'
 * getAbsoluteUrl('projects') // 'https://nitsuah.io/projects'
 */
export function getAbsoluteUrl(path: string): string {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://nitsuah.io";
  return `${baseUrl}${path.startsWith("/") ? path : `/${path}`}`;
}

/**
 * Get current page URL with optional query parameters
 * @param path - Page path
 * @param params - Optional query parameters as key-value pairs
 * @returns Full URL with query string
 * @example
 * getCurrentUrl('/search', { q: 'web3', filter: 'featured' })
 * // 'https://nitsuah.io/search?q=web3&filter=featured'
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
 * Parse query string to key-value object
 * @param queryString - URL query string (with or without leading '?')
 * @returns Object with parsed parameters
 * @example
 * parseQueryString('?page=1&sort=desc') // { page: '1', sort: 'desc' }
 * parseQueryString('search=web3') // { search: 'web3' }
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
 * Build query string from object (filters out null/undefined values)
 * @param params - Object with parameters to serialize
 * @returns URL-encoded query string (without leading '?')
 * @example
 * buildQueryString({ page: 1, filter: 'active', empty: null })
 * // 'page=1&filter=active'
 */
export function buildQueryString(
  params: Record<string, string | number | boolean | null | undefined>,
): string {
  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== null && value !== undefined) {
      searchParams.append(key, String(value));
    }
  });

  return searchParams.toString();
}

/**
 * Check if link is external (points to different origin)
 * @param url - URL to check
 * @returns true if URL points to external domain
 * @example
 * isExternalLink('https://github.com') // true
 * isExternalLink('/about') // false
 * isExternalLink('https://nitsuah.io/projects') // false (same origin)
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
 * Add UTM tracking parameters to URL for analytics
 * @param url - Base URL to add parameters to
 * @param params - UTM parameters (source, medium, campaign, term, content)
 * @returns URL with UTM parameters appended
 * @example
 * addUtmParams('https://example.com', {
 *   source: 'twitter',
 *   medium: 'social',
 *   campaign: 'product_launch'
 * })
 * // 'https://example.com?utm_source=twitter&utm_medium=social&utm_campaign=product_launch'
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
