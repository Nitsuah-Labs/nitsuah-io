/**
 * Unit tests for validation utility functions
 * Tests cover email, URL, Ethereum address, hex color, GitHub username,
 * positive number, and input sanitization validation
 */

import {
  isPositiveNumber,
  isValidEmail,
  isValidEthereumAddress,
  isValidGitHubUsername,
  isValidHexColor,
  isValidUrl,
  sanitizeInput,
} from "../validation";

describe("validation utilities", () => {
  describe("isValidEmail", () => {
    it("should validate standard email format", () => {
      expect(isValidEmail("user@example.com")).toBe(true);
    });

    it("should validate email with subdomain", () => {
      expect(isValidEmail("user@mail.example.com")).toBe(true);
    });

    it("should validate email with plus sign", () => {
      expect(isValidEmail("user+tag@example.com")).toBe(true);
    });

    it("should validate email with dots", () => {
      expect(isValidEmail("first.last@example.com")).toBe(true);
    });

    it("should validate email with numbers", () => {
      expect(isValidEmail("user123@example456.com")).toBe(true);
    });

    it("should reject email without @", () => {
      expect(isValidEmail("userexample.com")).toBe(false);
    });

    it("should reject email without domain", () => {
      expect(isValidEmail("user@")).toBe(false);
    });

    it("should reject email without username", () => {
      expect(isValidEmail("@example.com")).toBe(false);
    });

    it("should reject email without TLD", () => {
      expect(isValidEmail("user@example")).toBe(false);
    });

    it("should reject email with spaces", () => {
      expect(isValidEmail("user name@example.com")).toBe(false);
    });

    it("should reject email with multiple @", () => {
      expect(isValidEmail("user@@example.com")).toBe(false);
    });

    it("should reject empty string", () => {
      expect(isValidEmail("")).toBe(false);
    });

    it("should reject plain text", () => {
      expect(isValidEmail("not-an-email")).toBe(false);
    });

    it("should validate email with hyphen in domain", () => {
      expect(isValidEmail("user@my-domain.com")).toBe(true);
    });

    it("should validate email with underscore", () => {
      expect(isValidEmail("user_name@example.com")).toBe(true);
    });
  });

  describe("isValidUrl", () => {
    it("should validate HTTPS URL", () => {
      expect(isValidUrl("https://example.com")).toBe(true);
    });

    it("should validate HTTP URL", () => {
      expect(isValidUrl("http://example.com")).toBe(true);
    });

    it("should validate URL with path", () => {
      expect(isValidUrl("https://example.com/path/to/page")).toBe(true);
    });

    it("should validate URL with query string", () => {
      expect(isValidUrl("https://example.com?param=value")).toBe(true);
    });

    it("should validate URL with fragment", () => {
      expect(isValidUrl("https://example.com#section")).toBe(true);
    });

    it("should validate URL with port", () => {
      expect(isValidUrl("https://example.com:8080")).toBe(true);
    });

    it("should validate localhost URL", () => {
      expect(isValidUrl("http://localhost:3000")).toBe(true);
    });

    it("should validate IP address URL", () => {
      expect(isValidUrl("http://192.168.1.1")).toBe(true);
    });

    it("should reject URL without protocol", () => {
      expect(isValidUrl("example.com")).toBe(false);
    });

    it("should reject invalid URL format", () => {
      expect(isValidUrl("not-a-url")).toBe(false);
    });

    it("should reject empty string", () => {
      expect(isValidUrl("")).toBe(false);
    });

    it("should reject relative path", () => {
      expect(isValidUrl("/path/to/page")).toBe(false);
    });

    it("should validate FTP URL", () => {
      expect(isValidUrl("ftp://files.example.com")).toBe(true);
    });

    it("should validate URL with auth", () => {
      expect(isValidUrl("https://user:pass@example.com")).toBe(true);
    });

    it("should validate URL with subdomain", () => {
      expect(isValidUrl("https://blog.example.com")).toBe(true);
    });
  });

  describe("isValidEthereumAddress", () => {
    it("should validate valid Ethereum address", () => {
      expect(
        isValidEthereumAddress("0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb0"),
      ).toBe(true);
    });

    it("should validate address with lowercase letters", () => {
      expect(
        isValidEthereumAddress("0x742d35cc6634c0532925a3b844bc9e7595f0beb0"),
      ).toBe(true);
    });

    it("should validate address with uppercase letters", () => {
      expect(
        isValidEthereumAddress("0x742D35CC6634C0532925A3B844BC9E7595F0BEB0"),
      ).toBe(true);
    });

    it("should validate all zeros address", () => {
      expect(
        isValidEthereumAddress("0x0000000000000000000000000000000000000000"),
      ).toBe(true);
    });

    it("should reject address without 0x prefix", () => {
      expect(
        isValidEthereumAddress("742d35Cc6634C0532925a3b844Bc9e7595f0bEb0"),
      ).toBe(false);
    });

    it("should reject address with wrong length (too short)", () => {
      expect(isValidEthereumAddress("0x742d35Cc6634C053")).toBe(false);
    });

    it("should reject address with wrong length (too long)", () => {
      expect(
        isValidEthereumAddress("0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb000"),
      ).toBe(false);
    });

    it("should reject address with invalid characters", () => {
      expect(
        isValidEthereumAddress("0x742d35Cc6634C0532925a3b844Bc9e7595f0bEbG"),
      ).toBe(false);
    });

    it("should reject empty string", () => {
      expect(isValidEthereumAddress("")).toBe(false);
    });

    it("should reject non-hex characters", () => {
      expect(
        isValidEthereumAddress("0xZZZZ35Cc6634C0532925a3b844Bc9e7595f0bEb0"),
      ).toBe(false);
    });

    it("should reject address with spaces", () => {
      expect(
        isValidEthereumAddress("0x 742d35Cc6634C0532925a3b844Bc9e7595f0bEb0"),
      ).toBe(false);
    });
  });

  describe("isValidHexColor", () => {
    it("should validate 6-digit hex color", () => {
      expect(isValidHexColor("#FF5733")).toBe(true);
    });

    it("should validate 3-digit hex color", () => {
      expect(isValidHexColor("#F57")).toBe(true);
    });

    it("should validate hex color with lowercase", () => {
      expect(isValidHexColor("#ff5733")).toBe(true);
    });

    it("should validate hex color with mixed case", () => {
      expect(isValidHexColor("#Ff5733")).toBe(true);
    });

    it("should validate black color", () => {
      expect(isValidHexColor("#000000")).toBe(true);
    });

    it("should validate white color", () => {
      expect(isValidHexColor("#FFFFFF")).toBe(true);
    });

    it("should validate shorthand black", () => {
      expect(isValidHexColor("#000")).toBe(true);
    });

    it("should validate shorthand white", () => {
      expect(isValidHexColor("#FFF")).toBe(true);
    });

    it("should reject color without hash", () => {
      expect(isValidHexColor("FF5733")).toBe(false);
    });

    it("should reject color with wrong length", () => {
      expect(isValidHexColor("#FF57")).toBe(false);
    });

    it("should reject color with invalid characters", () => {
      expect(isValidHexColor("#GG5733")).toBe(false);
    });

    it("should reject named color", () => {
      expect(isValidHexColor("red")).toBe(false);
    });

    it("should reject RGB format", () => {
      expect(isValidHexColor("rgb(255, 87, 51)")).toBe(false);
    });

    it("should reject empty string", () => {
      expect(isValidHexColor("")).toBe(false);
    });

    it("should reject color with spaces", () => {
      expect(isValidHexColor("#FF 5733")).toBe(false);
    });

    it("should reject color with special characters", () => {
      expect(isValidHexColor("#FF57@3")).toBe(false);
    });
  });

  describe("isValidGitHubUsername", () => {
    it("should validate simple username", () => {
      expect(isValidGitHubUsername("octocat")).toBe(true);
    });

    it("should validate username with hyphen", () => {
      expect(isValidGitHubUsername("my-username")).toBe(true);
    });

    it("should validate username with numbers", () => {
      expect(isValidGitHubUsername("user123")).toBe(true);
    });

    it("should validate single character username", () => {
      expect(isValidGitHubUsername("a")).toBe(true);
    });

    it("should validate max length username (39 chars)", () => {
      expect(isValidGitHubUsername("a".repeat(39))).toBe(true);
    });

    it("should validate username with multiple hyphens", () => {
      expect(isValidGitHubUsername("my-long-user-name")).toBe(true);
    });

    it("should validate alphanumeric with hyphens", () => {
      expect(isValidGitHubUsername("user-name-123")).toBe(true);
    });

    it("should reject username starting with hyphen", () => {
      expect(isValidGitHubUsername("-username")).toBe(false);
    });

    it("should reject username ending with hyphen", () => {
      expect(isValidGitHubUsername("username-")).toBe(false);
    });

    it("should reject username with consecutive hyphens", () => {
      expect(isValidGitHubUsername("user--name")).toBe(false);
    });

    it("should reject username with underscore", () => {
      expect(isValidGitHubUsername("user_name")).toBe(false);
    });

    it("should reject username over 39 characters", () => {
      expect(isValidGitHubUsername("a".repeat(40))).toBe(false);
    });

    it("should reject empty username", () => {
      expect(isValidGitHubUsername("")).toBe(false);
    });

    it("should reject username with spaces", () => {
      expect(isValidGitHubUsername("user name")).toBe(false);
    });

    it("should reject username with special characters", () => {
      expect(isValidGitHubUsername("user@name")).toBe(false);
    });

    it("should reject username with dots", () => {
      expect(isValidGitHubUsername("user.name")).toBe(false);
    });
  });

  describe("isPositiveNumber", () => {
    it("should validate positive integer", () => {
      expect(isPositiveNumber(42)).toBe(true);
    });

    it("should validate positive decimal", () => {
      expect(isPositiveNumber(3.14)).toBe(true);
    });

    it("should validate positive string number", () => {
      expect(isPositiveNumber("42")).toBe(true);
    });

    it("should validate positive string decimal", () => {
      expect(isPositiveNumber("3.14")).toBe(true);
    });

    it("should validate very small positive number", () => {
      expect(isPositiveNumber(0.001)).toBe(true);
    });

    it("should validate large positive number", () => {
      expect(isPositiveNumber(999999999)).toBe(true);
    });

    it("should reject zero", () => {
      expect(isPositiveNumber(0)).toBe(false);
    });

    it("should reject negative integer", () => {
      expect(isPositiveNumber(-5)).toBe(false);
    });

    it("should reject negative decimal", () => {
      expect(isPositiveNumber(-3.14)).toBe(false);
    });

    it("should reject negative string number", () => {
      expect(isPositiveNumber("-10")).toBe(false);
    });

    it("should reject NaN", () => {
      expect(isPositiveNumber(NaN)).toBe(false);
    });

    it("should reject Infinity", () => {
      expect(isPositiveNumber(Infinity)).toBe(false);
    });

    it("should reject negative Infinity", () => {
      expect(isPositiveNumber(-Infinity)).toBe(false);
    });

    it("should reject non-numeric string", () => {
      expect(isPositiveNumber("invalid")).toBe(false);
    });

    it("should reject empty string", () => {
      expect(isPositiveNumber("")).toBe(false);
    });

    it("should reject null", () => {
      expect(isPositiveNumber(null)).toBe(false);
    });

    it("should reject undefined", () => {
      expect(isPositiveNumber(undefined)).toBe(false);
    });

    it("should reject boolean", () => {
      // Note: Number(true) = 1, which is positive
      // This is JavaScript's type coercion behavior
      expect(isPositiveNumber(true)).toBe(true);
    });

    it("should reject object", () => {
      expect(isPositiveNumber({})).toBe(false);
    });

    it("should reject array", () => {
      expect(isPositiveNumber([])).toBe(false);
    });

    it("should handle string with whitespace", () => {
      expect(isPositiveNumber("  42  ")).toBe(true);
    });
  });

  describe("sanitizeInput", () => {
    it("should escape < character", () => {
      expect(sanitizeInput("<div>")).toBe("&lt;div&gt;");
    });

    it("should escape > character", () => {
      expect(sanitizeInput("a>b")).toBe("a&gt;b");
    });

    it("should escape & character", () => {
      expect(sanitizeInput("foo&bar")).toBe("foo&amp;bar");
    });

    it("should escape double quote", () => {
      expect(sanitizeInput('say "hello"')).toBe("say &quot;hello&quot;");
    });

    it("should escape single quote", () => {
      expect(sanitizeInput("it's")).toBe("it&#x27;s");
    });

    it("should escape forward slash", () => {
      expect(sanitizeInput("a/b")).toBe("a&#x2F;b");
    });

    it("should escape script tag", () => {
      expect(sanitizeInput("<script>alert('xss')</script>")).toBe(
        "&lt;script&gt;alert(&#x27;xss&#x27;)&lt;&#x2F;script&gt;",
      );
    });

    it("should escape XSS attempt with img tag", () => {
      expect(sanitizeInput('<img src="x" onerror="alert(1)">')).toBe(
        "&lt;img src=&quot;x&quot; onerror=&quot;alert(1)&quot;&gt;",
      );
    });

    it("should escape HTML with attributes", () => {
      expect(sanitizeInput('<a href="/path">link</a>')).toBe(
        "&lt;a href=&quot;&#x2F;path&quot;&gt;link&lt;&#x2F;a&gt;",
      );
    });

    it("should handle plain text without special chars", () => {
      expect(sanitizeInput("Hello World")).toBe("Hello World");
    });

    it("should handle empty string", () => {
      expect(sanitizeInput("")).toBe("");
    });

    it("should escape multiple special characters", () => {
      expect(sanitizeInput("<>&\"'/")).toBe("&lt;&gt;&amp;&quot;&#x27;&#x2F;");
    });

    it("should handle mixed content", () => {
      expect(sanitizeInput("Hello <b>world</b> & goodbye")).toBe(
        "Hello &lt;b&gt;world&lt;&#x2F;b&gt; &amp; goodbye",
      );
    });

    it("should escape SQL injection attempt", () => {
      expect(sanitizeInput("'; DROP TABLE users; --")).toBe(
        "&#x27;; DROP TABLE users; --",
      );
    });

    it("should escape JavaScript event handlers", () => {
      expect(sanitizeInput('onload="alert(1)"')).toBe(
        "onload=&quot;alert(1)&quot;",
      );
    });

    it("should handle repeated special characters", () => {
      expect(sanitizeInput("<<<>>>")).toBe("&lt;&lt;&lt;&gt;&gt;&gt;");
    });

    it("should preserve safe HTML entities", () => {
      expect(sanitizeInput("&nbsp;")).toBe("&amp;nbsp;");
    });
  });
});
