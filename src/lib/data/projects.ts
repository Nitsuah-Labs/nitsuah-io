export type Project = {
  id: string;
  title: string;
  short: string;
  description: string;
  github: string;
  demo?: string;
  highlight: string;
  tags: string[];
  status: 'active' | 'maintained' | 'archived';
  featured: boolean;
};

const projects: Project[] = [
  {
    id: 'kryptos',
    title: 'Kryptos',
    short: 'Cryptanalysis toolkit solving classical ciphers with testable pipelines.',
    description: 'Advanced Python cryptography research toolkit featuring comprehensive cipher-solving algorithms, automated cryptanalysis pipelines, and statistical analysis tools for classical cryptographic systems.',
    github: 'https://github.com/nitsuah/kryptos',
    demo: '',
    highlight: 'Research-grade pipelines, comprehensive test suites, scoring heuristics',
    tags: ['python', 'cryptography', 'research', 'algorithms'],
    status: 'active',
    featured: true
  },
  {
    id: 'gcp',
    title: 'GCP Tools',
    short: 'Google Drive reporting & migration scripts (Drive API automation).',
    description: 'Enterprise-grade Google Cloud Platform automation suite featuring Google Drive API integration, automated reporting systems, and migration helpers for large-scale data operations.',
    github: 'https://github.com/nitsuah/gcp',
    demo: '',
    highlight: 'CLI-style scripts, security configs, enterprise automation',
    tags: ['python', 'gcp', 'automation', 'enterprise'],
    status: 'maintained',
    featured: true
  },
  {
    id: 'stash',
    title: 'Stash',
    short: 'Collection of sysadmin scripts (PowerShell, VBA, Atlassian helpers).',
    description: 'Comprehensive system administration toolkit containing PowerShell automation scripts, VBA macros for Office integration, and Atlassian workflow helpers for enterprise IT operations.',
    github: 'https://github.com/nitsuah/stash',
    demo: '',
    highlight: 'Practical enterprise tooling, IT automation, workflow optimization',
    tags: ['powershell', 'vba', 'devops', 'sysadmin'],
    status: 'maintained',
    featured: true
  },
  {
    id: 'nitsuah-io',
    title: 'Portfolio Site',
    short: 'This portfolio website built with Next.js and Web3 integrations.',
    description: 'Modern portfolio website featuring Next.js 14, TypeScript, Web3 wallet integration, 3D Spline animations, and experimental blockchain tools in the labs section.',
    github: 'https://github.com/Nitsuah-Labs/nitsuah-io',
    demo: 'https://nitsuah.io',
    highlight: 'Web3 integration, modern React patterns, 3D graphics',
    tags: ['nextjs', 'typescript', 'web3', 'react'],
    status: 'active',
    featured: false
  }
];

// Export filtered lists for different use cases
export const featuredProjects = projects.filter(project => project.featured);
export const activeProjects = projects.filter(project => project.status === 'active');
export const allProjects = projects;

export default projects;