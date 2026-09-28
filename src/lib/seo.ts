import type { Metadata } from "next";

export const SITE_URL = "https://nitsuah.io";
export const SITE_NAME = "nitsuah.io";
export const TITLE_SUFFIX = " | Austin J. Hardy";
export const DEFAULT_TITLE =
  "Austin J. Hardy | Senior Platform & AI Engineer | nitsuah.io";

// 1200x630 JPEG: the size LinkedIn, X, Slack and Facebook all render as a
// large card. SVG og:images are ignored by most of them.
export const DEFAULT_OG_IMAGE = {
  url: "/og-image.jpg",
  width: 1200,
  height: 630,
  alt: "Austin J. Hardy - Senior Platform & AI Engineer",
};

interface PageMetadataOptions {
  /** Page title; TITLE_SUFFIX is appended unless absoluteTitle is set. */
  title: string;
  description: string;
  /** Path of the page, used for its canonical URL and og:url. */
  path: string;
  /** Keep the page out of search results (account/utility pages). */
  noIndex?: boolean;
  /** Use the title as-is, without TITLE_SUFFIX. */
  absoluteTitle?: boolean;
  image?: { url: string; width?: number; height?: number; alt?: string };
  openGraph?: Metadata["openGraph"];
}

/**
 * Per-page metadata. Every route needs its own canonical URL: Next.js merges
 * `alternates` from the root layout into every page, so a site-wide canonical
 * tells search engines each page is a duplicate of whatever URL it names.
 * `openGraph` and `twitter` are replaced (not merged) when a page sets them,
 * so the image is always included here.
 */
export function pageMetadata({
  title,
  description,
  path,
  noIndex = false,
  absoluteTitle = false,
  image = DEFAULT_OG_IMAGE,
  openGraph,
}: PageMetadataOptions): Metadata {
  return {
    // Absolute on purpose: a parent layout that sets its own title stops the
    // root layout's title template from reaching nested pages.
    title: { absolute: absoluteTitle ? title : `${title}${TITLE_SUFFIX}` },
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      locale: "en_US",
      siteName: SITE_NAME,
      url: path,
      title,
      description,
      images: [image],
      ...openGraph,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image.url],
      creator: "@nitsuah",
    },
    ...(noIndex ? { robots: { index: false, follow: true } } : {}),
  };
}
