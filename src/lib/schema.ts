import { featuredProjects } from '../lib/data/projects';

export function generatePersonSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Austin J. Hardy',
    alternateName: 'nitsuah',
    url: 'https://nitsuah.io',
    image: 'https://nitsuah.io/social-preview.png',
    sameAs: [
      'https://github.com/nitsuah',
      'https://github.com/Nitsuah-Labs'
    ],
    jobTitle: 'Developer & Researcher',
    worksFor: {
      '@type': 'Organization',
      name: 'Nitsuah Labs'
    },
    knowsAbout: [
      'Cryptography',
      'Web3 Development',
      'Python Programming',
      'Enterprise Automation',
      'Next.js',
      'TypeScript',
      'System Administration'
    ],
    description: 'Developer and researcher specializing in cryptography research, enterprise automation tools, and Web3 experiments.',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': 'https://nitsuah.io'
    }
  };
}

export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Nitsuah Labs',
    url: 'https://github.com/Nitsuah-Labs',
    logo: 'https://nitsuah.io/social-preview.png',
    founder: {
      '@type': 'Person',
      name: 'Austin J. Hardy'
    },
    description: 'Research and development organization focusing on cryptography, automation, and Web3 technologies.'
  };
}

export function generateWebSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Austin J. Hardy Portfolio',
    alternateName: 'nitsuah.io',
    url: 'https://nitsuah.io',
    description: 'Personal portfolio showcasing cryptography research, enterprise automation tools, and Web3 experiments.',
    author: {
      '@type': 'Person',
      name: 'Austin J. Hardy'
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://nitsuah.io/?q={search_term_string}'
      },
      'query-input': 'required name=search_term_string'
    }
  };
}

export function generateBreadcrumbSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://nitsuah.io'
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'About',
        item: 'https://nitsuah.io/about'
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Projects',
        item: 'https://nitsuah.io/projects'
      },
      {
        '@type': 'ListItem',
        position: 4,
        name: 'Labs',
        item: 'https://nitsuah.io/labs'
      }
    ]
  };
}

export function generateProjectsSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Selected Projects',
    description: 'Featured technical projects by Austin J. Hardy',
    numberOfItems: featuredProjects.length,
    itemListElement: featuredProjects.map((project, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'SoftwareApplication',
        name: project.title,
        description: project.description,
        url: project.github,
        applicationCategory: 'DeveloperApplication',
        operatingSystem: 'Cross-platform',
        programmingLanguage: project.tags,
        author: {
          '@type': 'Person',
          name: 'Austin J. Hardy'
        }
      }
    }))
  };
}