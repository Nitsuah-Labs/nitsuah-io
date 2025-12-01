/**
 * Validate email format using RFC-compliant regex pattern
 * @param email - Email address to validate
 * @returns true if email format is valid
 * @example
 * isValidEmail('user@example.com') // true
 * isValidEmail('invalid.email') // false
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validate URL format using native URL parser
 * @param url - URL string to validate
 * @returns true if URL format is valid
 * @example
 * isValidUrl('https://example.com') // true
 * isValidUrl('not-a-url') // false
 */
export function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

/**
 * Validate Ethereum address format (42 characters starting with 0x)
 * @param address - Ethereum address to validate
 * @returns true if address format is valid (does not check checksum)
 * @example
 * isValidEthereumAddress('0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb0') // true
 * isValidEthereumAddress('invalid') // false
 */
export function isValidEthereumAddress(address: string): boolean {
  return /^0x[a-fA-F0-9]{40}$/.test(address);
}

/**
 * Check if string is valid hex color code
 * @param color - Color string to validate
 * @returns true if valid hex color (#RGB or #RRGGBB format)
 * @example
 * isValidHexColor('#FF5733') // true
 * isValidHexColor('#F57') // true
 * isValidHexColor('red') // false
 */
export function isValidHexColor(color: string): boolean {
  return /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(color);
}

/**
 * Validate GitHub username format (alphanumeric and hyphens, max 39 chars)
 * @param username - GitHub username to validate
 * @returns true if username format matches GitHub requirements
 * @example
 * isValidGitHubUsername('octocat') // true
 * isValidGitHubUsername('my-username') // true
 * isValidGitHubUsername('_invalid') // false
 */
export function isValidGitHubUsername(username: string): boolean {
  return /^[a-zA-Z0-9](?:[a-zA-Z0-9]|-(?=[a-zA-Z0-9])){0,38}$/.test(username);
}

/**
 * Check if value is a valid positive number
 * @param value - Value to check (string or number)
 * @returns true if value can be parsed as a positive finite number
 * @example
 * isPositiveNumber(42) // true
 * isPositiveNumber('3.14') // true
 * isPositiveNumber(-5) // false
 * isPositiveNumber('invalid') // false
 */
export function isPositiveNumber(value: unknown): boolean {
  const num = Number(value);
  return !isNaN(num) && isFinite(num) && num > 0;
}

/**
 * Sanitize user input to prevent XSS attacks by escaping HTML special characters
 * @param input - String to sanitize
 * @returns Sanitized string with HTML entities escaped
 * @example
 * sanitizeInput('<script>alert("xss")</script>')
 * // '&lt;script&gt;alert(&quot;xss&quot;)&lt;/script&gt;'
 */
export function sanitizeInput(input: string): string {
  const map: { [key: string]: string } = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#x27;",
    "/": "&#x2F;",
  };
  const reg = /[&<>"'/]/gi;
  return input.replace(reg, (match) => map[match] || match);
}
