import { featuredProjects } from "../lib/data/projects";

export function generatePersonSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Austin J. Hardy",
    alternateName: "nitsuah",
    url: "https://nitsuah.io",
    image: "https://nitsuah.io/social-preview.png",
    sameAs: ["https://github.com/nitsuah", "https://github.com/Nitsuah-Labs"],
    jobTitle: "Senior Platform & AI Engineer",
    worksFor: {
      "@type": "Organization",
      name: "Nitsuah Labs",
    },
    knowsAbout: [
      "Atlassian Platform Engineering",
      "AI Agents & MCP Servers",
      "Enterprise Automation",
      "Next.js",
      "TypeScript",
      "Cryptography",
      "Web3 Development",
    ],
    description:
      "Senior Platform & AI Engineer with 15 years building Atlassian enterprise platforms, MCP servers, and AI-powered developer tooling at Netflix, Coinbase, and Blackboard.",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": "https://nitsuah.io",
    },
  };
}

export function generateOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Nitsuah Labs",
    url: "https://github.com/Nitsuah-Labs",
    logo: "https://nitsuah.io/social-preview.png",
    founder: {
      "@type": "Person",
      name: "Austin J. Hardy",
    },
    description:
      "Research and development organization focusing on cryptography, automation, and Web3 technologies.",
  };
}

export function generateWebSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Austin J. Hardy Portfolio",
    alternateName: "nitsuah.io",
    url: "https://nitsuah.io",
    description:
      "Senior Platform & AI Engineer — 15 years building Atlassian enterprise platforms, MCP servers, and AI-powered developer tooling at Netflix, Coinbase, and Blackboard.",
    author: {
      "@type": "Person",
      name: "Austin J. Hardy",
    },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: "https://nitsuah.io/?q={search_term_string}",
      },
      "query-input": "required name=search_term_string",
    },
  };
}

export function generateBreadcrumbSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://nitsuah.io",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "About",
        item: "https://nitsuah.io/about",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Projects",
        item: "https://nitsuah.io/projects",
      },
      {
        "@type": "ListItem",
        position: 4,
        name: "Labs",
        item: "https://nitsuah.io/labs",
      },
    ],
  };
}

export function generateProjectsSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Selected Projects",
    description: "Featured technical projects by Austin J. Hardy",
    numberOfItems: featuredProjects.length,
    itemListElement: featuredProjects.map((project, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "SoftwareApplication",
        name: project.title,
        description: project.description,
        url: project.github,
        applicationCategory: "DeveloperApplication",
        operatingSystem: "Cross-platform",
        programmingLanguage: project.tags,
        author: {
          "@type": "Person",
          name: "Austin J. Hardy",
        },
      },
    })),
  };
}
