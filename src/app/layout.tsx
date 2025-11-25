import type { Metadata } from "next";
import {
  generateBreadcrumbSchema,
  generateOrganizationSchema,
  generatePersonSchema,
  generateWebSiteSchema,
} from "../lib/schema";
import SkipLink from "./_components/SkipLink";
import { Providers } from "./providers";
import "./test-helpers.css";

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
        {process.env.NEXT_PUBLIC_TEST_HELPERS === "1" && (
          <script
            // Inline script to remove noisy dev overlays / debug UIs during tests
            dangerouslySetInnerHTML={{
              __html: `(() => {
                  try {
                    const removeByText = (texts) => {
                      const all = Array.from(document.querySelectorAll('*'));
                      for (const el of all) {
                        try {
                          const txt = el.textContent || '';
                          for (const t of texts) {
                            if (txt && txt.includes(t)) {
                              el.remove();
                              break;
                            }
                          }
                        } catch(e) {}
                      }
                    };

                    const removeSelectors = (sels) => {
                      for (const s of sels) {
                        try {
                          const nodes = Array.from(document.querySelectorAll(s));
                          nodes.forEach(n => n.remove());
                        } catch(e) {}
                      }
                    };

                    const textsToRemove = [
                      'Overseer Dashboard',
                      'Welcome to Overseer',
                      'Open Next.js Dev Tools',
                      'Next.js Dev Tools',
                      'Sign in with GitHub'
                    ];
                    const selectorsToRemove = [
                      '#__next_dev_overlay',
                      '.next-dev-overlay',
                      '.react-dev-overlay',
                      '#next-overlay',
                      '.overseer',
                      '[data-testid="overseer"]'
                    ];

                    // Run immediately if DOM ready or on DOMContentLoaded
                    const run = () => {
                      removeByText(textsToRemove);
                      removeSelectors(selectorsToRemove);
                      // ensure any hidden footers get visible by resetting inline styles
                      try {
                        const footer = document.querySelector('footer');
                        if (footer && footer instanceof HTMLElement) {
                          footer.style.removeProperty('display');
                          footer.style.removeProperty('visibility');
                          footer.style.removeProperty('opacity');
                          footer.style.removeProperty('z-index');
                        }
                      } catch(e) {}
                    };

                    if (document.readyState === 'loading') {
                      document.addEventListener('DOMContentLoaded', run);
                    } else {
                      run();
                    }

                    // Also observe mutations for overlays that appear after load
                    const mo = new MutationObserver(() => run());
                    mo.observe(document.documentElement || document.body, { childList: true, subtree: true });
                    // Safety: stop observing after 10s
                    setTimeout(() => mo.disconnect(), 10000);
                  } catch(e) { /* ignore */ }
                })();`,
            }}
          />
        )}
      </head>
      <body
        className={process.env.NEXT_PUBLIC_TEST_HELPERS ? "test-helpers" : ""}
      >
        <Providers>
          <SkipLink />
          {children}
        </Providers>
      </body>
    </html>
  );
}
