/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable SWC minification (faster than Terser)
  swcMinify: true,

  // Optimize compilation
  compiler: {
    // Remove console.logs in production
    removeConsole:
      process.env.NODE_ENV === "production"
        ? {
            exclude: ["error", "warn"],
          }
        : false,
  },

  // Reduce bundle size by optimizing package imports
  experimental: {
    optimizePackageImports: [
      "@mui/material",
      "@mui/icons-material",
      "@emotion/react",
      "@emotion/styled",
      "@splinetool/react-spline",
      "wagmi",
      "viem",
    ],
  },

  // Enable React strict mode for better development
  reactStrictMode: true,

  // Improve image optimization
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    minimumCacheTTL: 60,
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },

  // Optimize production builds
  productionBrowserSourceMaps: false,

  // Disable powered-by header
  poweredByHeader: false,

  // Compress responses
  compress: true,

  // Generate standalone output for faster deployments
  output: process.env.BUILD_STANDALONE ? "standalone" : undefined,
};

module.exports = nextConfig;
