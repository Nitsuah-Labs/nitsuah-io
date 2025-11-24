import type { Metadata } from "next";
import {
  generateBreadcrumbSchema,
  generateOrganizationSchema,
  generatePersonSchema,
  generateWebSiteSchema,
} from "../lib/schema";
import SkipLink from "./_components/SkipLink";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: "Austin J. Hardy | Developer & Researcher | nitsuah.io",
  description:
    "Personal portfolio showcasing cryptography research, enterprise automation tools, and Web3 experiments. Austin J. Hardy's selected projects and technical work.",
  keywords:
    "Austin Hardy, nitsuah, developer, cryptography, Web3, Python, Next.js, portfolio, blockchain, automation",
  authors: [{ name: "Austin J. Hardy", url: "https://nitsuah.io" }],
  creator: "Austin J. Hardy",
  publisher: "Austin J. Hardy",
  metadataBase: new URL("https://nitsuah.io"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://nitsuah.io",
    siteName: "nitsuah.io",
    title: "Austin J. Hardy | Developer & Researcher",
    description:
      "Personal portfolio showcasing cryptography research, enterprise automation tools, and Web3 experiments.",
    images: [
      {
        url: "/social-preview.svg", // TODO: Convert to PNG for better social media compatibility
        width: 1200,
        height: 630,
        alt: "Austin J. Hardy - Developer & Researcher Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Austin J. Hardy | Developer & Researcher",
    description:
      "Personal portfolio showcasing cryptography research, enterprise automation tools, and Web3 experiments.",
    images: ["/social-preview.svg"], // TODO: Convert to PNG for better compatibility
    creator: "@nitsuah",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    // TODO: Add Google Search Console verification code
    // 1. Go to https://search.google.com/search-console
    // 2. Add property for https://nitsuah.io
    // 3. Choose "HTML tag" verification method
    // 4. Copy the content value from the meta tag and add here as: google: 'your-code-here'
    // google: 'your-verification-code-here',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const personSchema = generatePersonSchema();
  const organizationSchema = generateOrganizationSchema();
  const websiteSchema = generateWebSiteSchema();
  const breadcrumbSchema = generateBreadcrumbSchema();

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        />
      </head>
      <body>
        <Providers>
          <SkipLink />
          {children}
        </Providers>
      </body>
    </html>
  );
}
