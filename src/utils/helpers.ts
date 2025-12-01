/**
 * Format a date string into a readable format
 * @param date - Date string or Date object
 * @param format - Format style ('short', 'long', 'relative')
 * @returns Formatted date string
 */
export function formatDate(
  date: string | Date,
  format: "short" | "long" | "relative" = "short",
): string {
  const d = typeof date === "string" ? new Date(date) : date;

  if (format === "relative") {
    return getRelativeTime(d);
  }

  const options: Intl.DateTimeFormatOptions =
    format === "long"
      ? { year: "numeric", month: "long", day: "numeric" }
      : { year: "numeric", month: "short", day: "numeric" };

  return d.toLocaleDateString("en-US", options);
}

/**
 * Get relative time string (e.g., "2 hours ago")
 */
function getRelativeTime(date: Date): string {
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) return "just now";
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
  if (diffInSeconds < 604800)
    return `${Math.floor(diffInSeconds / 86400)}d ago`;
  if (diffInSeconds < 2592000)
    return `${Math.floor(diffInSeconds / 604800)}w ago`;

  return formatDate(date, "short");
}

/**
 * Truncate text to specified length with ellipsis
 */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + "...";
}

/**
 * Generate a slug from a string (for URLs)
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "") // Remove special chars
    .replace(/\s+/g, "-") // Replace spaces with dashes
    .replace(/-+/g, "-") // Replace multiple dashes with single dash
    .trim();
}

/**
 * Capitalize first letter of each word
 */
export function capitalize(text: string): string {
  return text
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

/**
 * Debounce function calls - delays execution until after wait time has elapsed
 * since the last call. Useful for rate-limiting expensive operations like API calls.
 * @param func - Function to debounce
 * @param wait - Wait time in milliseconds before executing
 * @returns Debounced version of the function
 * @example
 * const debouncedSearch = debounce((query) => api.search(query), 300);
 * debouncedSearch('test'); // Will only execute after 300ms of no calls
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number,
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;

  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      timeout = null;
      func(...args);
    };

    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * Throttle function calls - ensures function is called at most once per time period.
 * Useful for rate-limiting event handlers like scroll or resize.
 * @param func - Function to throttle
 * @param limit - Minimum time in milliseconds between calls
 * @returns Throttled version of the function
 * @example
 * const throttledScroll = throttle(() => updateUI(), 100);
 * window.addEventListener('scroll', throttledScroll);
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number,
): (...args: Parameters<T>) => void {
  let inThrottle: boolean = false;

  return function executedFunction(...args: Parameters<T>) {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

/**
 * Check if value is empty (null, undefined, empty string, empty array, empty object)
 * @param value - Value to check for emptiness
 * @returns true if value is considered empty
 */
export function isEmpty(value: unknown): boolean {
  if (value === null || value === undefined) return true;
  if (typeof value === "string") return value.trim().length === 0;
  if (Array.isArray(value)) return value.length === 0;
  if (typeof value === "object") return Object.keys(value).length === 0;
  return false;
}

/**
 * Deep clone an object
 * @param obj - Object to clone
 * @returns Deep cloned copy of the object
 */
export function deepClone<T>(obj: T): T {
  if (obj === null || typeof obj !== "object") return obj;
  if (obj instanceof Date) return new Date(obj.getTime()) as T;
  if (obj instanceof Array) return obj.map((item) => deepClone(item)) as T;

  const clonedObj = {} as T;
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      clonedObj[key] = deepClone(obj[key]);
    }
  }
  return clonedObj;
}

/**
 * Wait for specified milliseconds (useful for async functions)
 * @param ms - Milliseconds to wait
 * @returns Promise that resolves after the specified time
 * @example
 * await sleep(1000); // Wait 1 second
 * console.log('Executed after 1 second');
 */
export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Generate a unique ID with optional prefix
 * @param prefix - Prefix for the ID (default: 'id')
 * @returns Unique ID string combining prefix, timestamp, and random string
 * @example
 * generateId('user'); // 'user-1638360000000-k3j8x9q'
 * generateId(); // 'id-1638360000000-a2b5c8d'
 */
export function generateId(prefix: string = "id"): string {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Safely parse JSON with fallback value on error
 * @param json - JSON string to parse
 * @param fallback - Value to return if parsing fails
 * @returns Parsed object or fallback value
 * @example
 * safeJsonParse('{"name":"John"}', {}) // { name: 'John' }
 * safeJsonParse('invalid json', {}) // {}
 */
export function safeJsonParse<T>(json: string, fallback: T): T {
  try {
    return JSON.parse(json) as T;
  } catch {
    return fallback;
  }
}

/**
 * Get value from nested object using dot notation path
 * @param obj - Object to retrieve value from
 * @param path - Dot-separated path (e.g., 'user.profile.name')
 * @returns Value at the specified path, or undefined if not found
 * @example getNestedValue({ user: { profile: { name: 'John' } } }, 'user.profile.name') // 'John'
 */
export function getNestedValue<T = unknown>(
  obj: Record<string, unknown>,
  path: string,
): T | undefined {
  return path.split(".").reduce<unknown>((acc, part) => {
    return acc &&
      typeof acc === "object" &&
      part in (acc as Record<string, unknown>)
      ? (acc as Record<string, unknown>)[part]
      : undefined;
  }, obj) as T | undefined;
}
