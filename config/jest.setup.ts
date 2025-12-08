// Jest setup file
import "@testing-library/jest-dom";

// Mock Next.js router
jest.mock("next/navigation", () => ({
  useRouter() {
    return {
      push: jest.fn(),
      replace: jest.fn(),
      prefetch: jest.fn(),
      back: jest.fn(),
      pathname: "/",
      query: {},
      asPath: "/",
    };
  },
  usePathname() {
    return "/";
  },
  useSearchParams() {
    return new URLSearchParams();
  },
}));

// Mock Next.js Image component
jest.mock("next/image", () => ({
  __esModule: true,
  default: (props) => {
    // eslint-disable-next-line @typescript-eslint/no-var-requires, jsx-a11y/alt-text
    const React = require("react");
    // Create a mock image element without using JSX
    return React.createElement("img", props);
  },
}));

// Mock environment variables
process.env.NEXT_PUBLIC_SITE_URL = "https://nitsuah.io";
