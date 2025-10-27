import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = "https://nitsuah.io";

  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/about", "/projects", "/labs"],
        disallow: [
          "/admin/",
          "/login/",
          "/logout/",
          "/register/",
          "/profile/",
          "/private/",
          "/api/",
          "/_next/",
          "/*.json$",
          "/.*",
        ],
      },
      {
        userAgent: [
          "Googlebot",
          "Bingbot",
          "facebookexternalhit",
          "Twitterbot",
          "LinkedInBot",
        ],
        allow: "/",
      },
      {
        userAgent: ["SemrushBot", "AhrefsBot", "MJ12bot"],
        disallow: "/",
      },
    ],
    sitemap: [`${baseUrl}/sitemap.xml`, `${baseUrl}/sitemap-index.xml`],
    host: baseUrl,
  };
}
