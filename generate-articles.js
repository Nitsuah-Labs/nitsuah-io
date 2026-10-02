const fs = require('fs');
const path = require('path');

const blogPosts = [
  {
    "published": true,
    "slug": "portfolio-netlify-docker",
    "id": "portfolio-netlify-docker",
    "excerpt": "Build and deploy a portfolio site using Netlify, Docker, and modern web tech. Learn the full stack from local development to production.",
    "readTime": "12 min read",
    "category": "DevOps",
    "tags": ["netlify", "docker", "portfolio", "deployment"],
    "author": "Austin H.",
    "date": "2026-09-10",
    "title": "Building a Portfolio: Netlify, Docker & Modern Deployment",
    "image": "/images/portfolio.png",
    "content": `## Architecture

1. **Docker for local dev and reproducible builds** — Containerize everything so local matches production exactly
2. **Netlify for hosting and deployments** — Handles SSL, CDN, and deploy previews automatically
3. **GitHub for version control and automation** — Actions can automate testing before deploy

## Key Takeaways

• Docker ensures consistent environments from dev to prod
• Netlify handles SSL, CDN, and deploy previews automatically
• GitHub Actions can automate testing before deploy
• Cost stays at $0 for personal projects

## The Stack

\`\`\`yaml
# docker-compose.yml
services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=development
\`\`\`

This gives you a production-like environment locally with zero configuration drift.`
  },
  {
    "published": true,
    "slug": "ollama-neon-fullstack",
    "id": "ollama-neon-fullstack",
    "excerpt": "Build a small full-stack project using local Ollama, Next.js frontend, and Neon PostgreSQL. Ship fast with AI-powered features.",
    "readTime": "14 min read",
    "category": "Development",
    "tags": ["ollama", "neon", "nextjs", "ai", "fullstack"],
    "author": "Austin H.",
    "date": "2026-08-20",
    "title": "Building a Small Project: Ollama + Neon + Next.js",
    "image": "/images/ollama.png",
    "content": `## Why This Stack

Local AI with **Ollama** means zero API costs, full privacy, and offline capability. **Neon** gives you serverless Postgres with branching. **Next.js 15** App Router handles the frontend.

## Architecture

\`\`\`typescript
// lib/ai.ts
import ollama from 'ollama';

export async function generateResponse(prompt: string) {
  const response = await ollama.generate({
    model: 'llama3.2',
    prompt,
    stream: false
  });
  return response.response;
}
\`\`\`

## Database Schema

\`\`\`sql
-- Neon PostgreSQL
CREATE TABLE projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
\`\`\`

The combination lets you iterate fast without managing infrastructure.`
  },
  {
    "published": true,
    "slug": "chrome-extension-cicd",
    "id": "chrome-extension-cicd",
    "excerpt": "Build and deploy a Chrome extension with CI/CD, API integration, and AI-powered parsing. Ship updates automatically with GitHub Actions.",
    "readTime": "14 min read",
    "category": "DevOps",
    "tags": ["chrome", "cicd", "api", "ai", "extension"],
    "author": "Austin H.",
    "date": "2026-07-15",
    "title": "Chrome Extension CI/CD: Automate the Boring Stuff",
    "image": "/images/chrome-ext.png",
    "content": `## The Problem

Chrome extension deployment is manual: zip, upload to Chrome Web Store, wait for review. Every. Single. Time.

## Solution: GitHub Actions Pipeline

\`\`\`yaml
# .github/workflows/release.yml
name: Release
on:
  push:
    tags: ['v*']
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
      - run: npm ci && npm run build
      - uses: actions/upload-artifact@v4
        with:
          name: extension-zip
          path: dist/*.zip
  publish:
    needs: build
    runs-on: ubuntu-latest
    steps:
      - uses: actions/download-artifact@v4
      - uses: fregante/chrome-web-store-upload@v2
        with:
          app-id: \${{ secrets.CHROME_APP_ID }}
          client-id: \${{ secrets.CHROME_CLIENT_ID }}
          client-secret: \${{ secrets.CHROME_CLIENT_SECRET }}
          refresh-token: \${{ secrets.CHROME_REFRESH_TOKEN }}
\`\`\`

Now \`git push origin v1.0.0\` does everything.`
  },
  {
    "published": true,
    "slug": "json-resume-schema",
    "id": "json-resume-schema",
    "excerpt": "Standardize your resume data with JSON Resume schema. Render to HTML, PDF, or feed into ATS systems programmatically.",
    "readTime": "8 min read",
    "category": "Development",
    "tags": ["json", "resume", "schema", "standard"],
    "author": "Austin H.",
    "date": "2026-06-20",
    "title": "JSON Resume: Structured Data for Your Career",
    "image": "/images/json-resume.png",
    "content": `## Why JSON Resume

Your resume is data. Treat it like data.

\`\`\`json
{
  "basics": {
    "name": "Austin Hardy",
    "label": "Senior Systems Engineer",
    "email": "austin@nitsuah.io",
    "url": "https://nitsuah.io",
    "profiles": [
      { "network": "GitHub", "username": "nitsuah" },
      { "network": "LinkedIn", "username": "austinjhardy" }
    ]
  },
  "work": [
    {
      "name": "Netflix",
      "position": "Senior Systems Engineer",
      "startDate": "2023-01",
      "endDate": "2024-12",
      "highlights": [
        "Built developer productivity tooling",
        "Reduced CI/CD latency by 40%"
      ]
    }
  ],
  "skills": [
    { "name": "TypeScript", "level": "Expert", "keywords": ["React", "Node", "Next.js"] },
    { "name": "Go", "level": "Proficient", "keywords": ["CLI tools", "Microservices"] }
  ]
}
\`\`\`

Render to HTML, PDF, Markdown, or feed directly into ATS systems. One source of truth.`
  },
  {
    "published": true,
    "slug": "docker-compose-lockstep",
    "id": "docker-compose-lockstep",
    "excerpt": "Keep Docker Compose configs in sync across dev, CI, and prod. One source of truth, zero drift.",
    "readTime": "10 min read",
    "category": "DevOps",
    "tags": ["docker", "compose", "ci", "lockstep"],
    "author": "Austin H.",
    "date": "2026-05-10",
    "title": "Docker Compose Lockstep: Dev, CI, Prod in Sync",
    "image": "/images/docker-lockstep.png",
    "content": `## The Drift Problem

\`docker-compose.yml\` for dev, \`docker-compose.ci.yml\` for CI, \`docker-compose.prod.yml\` for prod. Three files, infinite drift.

## Solution: Compose Overrides + Profiles

\`\`\`yaml
# docker-compose.yml (base)
services:
  app:
    image: myapp:\${TAG:-latest}
    environment:
      - DATABASE_URL=\${DATABASE_URL}

# docker-compose.override.yml (dev - auto-loaded)
services:
  app:
    build: .
    ports: ["3000:3000"]
    volumes: [".:/app"]
    profiles: ["dev"]

# docker-compose.prod.yml
services:
  app:
    deploy:
      resources:
        limits:
          memory: 512M
    profiles: ["prod"]
\`\`\`

\`\`\`bash
# Dev
docker compose --profile dev up

# CI
docker compose --profile ci run test

# Prod
docker compose --profile prod up -d
\`\`\`

Single source. Zero drift.`
  },
  {
    "published": true,
    "slug": "nextjs-16-app-router",
    "id": "nextjs-16-app-router",
    "excerpt": "Explore Next.js 16 App Router: server components, streaming, actions, and the new caching model. Migration guide included.",
    "readTime": "16 min read",
    "category": "Development",
    "tags": ["nextjs", "react", "app-router", "server-components"],
    "author": "Austin H.",
    "date": "2026-04-05",
    "title": "Next.js 16 App Router Deep Dive",
    "image": "/images/nextjs16.png",
    "content": `## What's New in 16

- **Server Components by default** — No \`'use client'\` needed unless you need interactivity
- **Streaming SSR** — \`Suspense\` boundaries stream content as it's ready
- **Server Actions** — Mutations without API routes
- **New caching** — \`cache: 'force-cache'\` | \`'no-store'\` per fetch

## Server Component Example

\`\`\`tsx
// app/posts/page.tsx - Server Component by default
import { getPosts } from '@/lib/posts';

export default async function PostsPage() {
  const posts = await getPosts(); // Runs on server
  return (
    <ul>
      {posts.map(post => (
        <li key={post.id}>{post.title}</li>
      )}
    </ul>
  );
}
\`\`\`

## Streaming with Suspense

\`\`\`tsx
import { Suspense } from 'react';
import { PostList } from './PostList';

export default function Page() {
  return (
    <Suspense fallback={<div>Loading posts...</div>}>
      <PostList />
    </Suspense>
  );
}
\`\`\`

Content streams as it resolves. No loading spinners for the whole page.`
  },
  {
    "published": true,
    "slug": "typescript-7-migration",
    "id": "typescript-7-migration",
    "excerpt": "TypeScript 7 brings explicit resource management, decorators, and improved inference. Migration notes and breaking changes.",
    "readTime": "12 min read",
    "category": "Development",
    "tags": ["typescript", "migration", "types"],
    "author": "Austin H.",
    "date": "2026-03-15",
    "title": "TypeScript 7: What Changed & How to Migrate",
    "image": "/images/ts7.png",
    "content": `## Key Changes

### Explicit Resource Management

\`\`\`typescript
// Using 'using' for automatic cleanup
{
  using file = await openFile('data.txt');
  const data = await file.read();
} // file.close() called automatically
\`\`\`

### Decorators (Standardized)

\`\`\`typescript
function logged(target: any, context: ClassMethodDecoratorContext) {
  return function(...args: any[]) {
    console.log(\`Calling \${context.name}\`, args);
    return target.apply(this, args);
  };
}

class Service {
  @logged
  async process(data: string) { /* ... */ }
}
\`\`\`

### Improved Inference

\`\`\`typescript
// const inference now preserves exact values
const config = { retries: 3, timeout: 5000 } as const;
// Type: { readonly retries: 3; readonly timeout: 5000 }
\`\`\`

Run \`npx @typescript-eslint/migrate-ts-config\` to update your config.`
  },
  {
    "published": true,
    "slug": "playwright-docker-npm-lockstep",
    "id": "playwright-docker-npm-lockstep",
    "excerpt": "Keep Playwright, Docker, and npm versions aligned across local, CI, and Docker. Automated version checking prevents drift.",
    "readTime": "9 min read",
    "category": "DevOps",
    "tags": ["playwright", "docker", "npm", "lockstep", "version"],
    "author": "Austin H.",
    "date": "2026-02-20",
    "title": "Playwright + Docker + npm: Version Lockstep",
    "image": "/images/playwright-lockstep.png",
    "content": `## The Version Drift Problem

Local: Playwright 1.45, Node 20, npm 10
CI: Playwright 1.42, Node 18, npm 9
Docker: Playwright 1.40, Node 18, npm 9

Tests pass locally, fail in CI. Sound familiar?

## Solution: Version Lockstep Script

\`\`\`bash
#!/bin/bash
# scripts/check-lockstep.sh

PLAYWRIGHT_LOCAL=\$(npx playwright --version | cut -d' ' -f2)
PLAYWRIGHT_DOCKER=\$(docker run --rm mcr.microsoft.com/playwright:v1.45-focal npx playwright --version | cut -d' ' -f2)

if [ "\$PLAYWRIGHT_LOCAL" != "\$PLAYWRIGHT_DOCKER" ]; then
  echo "❌ Playwright version mismatch: local=\$PLAYWRIGHT_LOCAL docker=\$PLAYWRIGHT_DOCKER"
  exit 1
fi

echo "✅ Versions aligned"
\`\`\`

Add to CI. Fail fast. Sleep well.`
  },
  {
    "published": true,
    "slug": "netlify-edge-functions",
    "id": "netlify-edge-functions",
    "excerpt": "Run TypeScript at the edge with Netlify Edge Functions. Auth, redirects, A/B testing — all at the CDN layer.",
    "readTime": "11 min read",
    "category": "DevOps",
    "tags": ["netlify", "edge", "functions", "deno", "typescript"],
    "author": "Austin H.",
    "date": "2026-01-25",
    "title": "Netlify Edge Functions: TypeScript at the CDN",
    "image": "/images/netlify-edge.png",
    "content": `## Edge Functions Run on Deno

No Node.js. No npm. Just TypeScript at the CDN edge, worldwide.

\`\`\`typescript
// netlify/edge-functions/auth.ts
import type { Context, Config } from "@netlify/edge-functions";

export default async function(request: Request, context: Context) {
  const token = request.headers.get("authorization");

  if (!token || !await validateToken(token)) {
    return new Response("Unauthorized", { status: 401 });
  }

  return context.next();
}

export const config: Config = {
  path: "/api/*"
};
\`\`\`

## Use Cases

- **Auth** — Validate JWTs before hitting your origin
- **Redirects** — Geo-based, A/B, feature flags
- **Headers** — Security headers, caching rules
- **Transform** — Modify HTML, inject scripts

Cold starts: ~0ms. Global by default.`
  },
  {
    "published": true,
    "slug": "react-19-server-components",
    "id": "react-19-server-components",
    "excerpt": "React 19 stabilizes server components, actions, and the new use() hook. Patterns, gotchas, and migration from 18.",
    "readTime": "14 min read",
    "category": "Development",
    "tags": ["react", "server-components", "actions", "hooks"],
    "author": "Austin H.",
    "date": "2025-12-10",
    "title": "React 19: Server Components & Actions",
    "image": "/images/react19.png",
    "content": `## Server Components Are Stable

React 19 removes the experimental flag. Server Components are now production-ready.

\`\`\`tsx
// Server Component (default)
async function UserProfile({ userId }: { userId: string }) {
  const user = await db.user.findUnique({ where: { id: userId } });
  return <div>{user.name}</div>;
}

// Client Component (opt-in)
'use client';
import { useState } from 'react';

export function LikeButton({ postId }: { postId: string }) {
  const [likes, setLikes] = useState(0);
  return <button onClick={() => setLikes(l => l + 1)}>{likes} ❤️</button>;
}
\`\`\`

## Server Actions

\`\`\`tsx
'use server';

export async function createPost(formData: FormData) {
  const title = formData.get('title');
  await db.post.create({ data: { title } });
  revalidatePath('/posts');
}
\`\`\`

\`\`\`tsx
<form action={createPost}>
  <input name="title" required />
  <button type="submit">Create</button>
</form>
\`\`\`

No API route needed. Progressive enhancement built-in.`
  },
  {
    "published": true,
    "slug": "github-actions-reusable-workflows",
    "id": "github-actions-reusable-workflows",
    "excerpt": "DRY your CI with reusable workflows. Share jobs across repos, call workflows from workflows, standardize your pipelines.",
    "readTime": "10 min read",
    "category": "DevOps",
    "tags": ["github-actions", "ci", "reusable", "workflows"],
    "author": "Austin H.",
    "date": "2025-11-05",
    "title": "GitHub Actions: Reusable Workflows",
    "image": "/images/gh-actions.png",
    "content": `## The Problem

Every repo has \`.github/workflows/ci.yml\`. They're all slightly different. Updating them is a nightmare.

## Reusable Workflows

\`\`\`yaml
# .github/workflows/reusable-ci.yml (in a central repo)
name: Reusable CI
on:
  workflow_call:
    inputs:
      node-version:
        required: false
        type: string
        default: '20'
    secrets:
      NPM_TOKEN:
        required: true

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: \${{ inputs.node-version }}
          cache: 'npm'
      - run: npm ci
      - run: npm test
      - run: npm run build
\`\`\`

\`\`\`yaml
# .github/workflows/ci.yml (in each repo)
name: CI
on: [push, pull_request]
jobs:
  ci:
    uses: myorg/shared-workflows/.github/workflows/reusable-ci.yml@v1
    with:
      node-version: '22'
    secrets:
      NPM_TOKEN: \${{ secrets.NPM_TOKEN }}
\`\`\`

One change in the central repo updates CI everywhere.`
  }
];

function markdownToHtml(markdown) {
  let html = markdown;

  // Code blocks
  html = html.replace(/```(\w+)?\n([\s\S]*?)```/g, (match, lang, code) => {
    return `<pre><code class="language-${lang || ''}">${code.trim()}</code></pre>`;
  });

  // Inline code
  html = html.replace(/`([^`]+)`/g, '<code>$1</code>');

  // Headers
  html = html.replace(/^### (.+)$/gm, '<h3>$1</h3>');
  html = html.replace(/^## (.+)$/gm, '<h2>$1</h2>');

  // Bold
  html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');

  // Italic
  html = html.replace(/\*(.+?)\*/g, '<em>$1</em>');

  // Links
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>');

  // Lists
  html = html.replace(/^\- (.+)$/gm, '<li>$1</li>');
  html = html.replace(/(<li>.*<\/li>)/s, '<ul>$1</ul>');

  // Paragraphs - split by double newlines
  const paragraphs = html.split('\n\n');
  html = paragraphs.map(p => {
    p = p.trim();
    if (!p) return '';
    if (p.startsWith('<h2') || p.startsWith('<h3') || p.startsWith('<pre') || p.startsWith('<ul') || p.startsWith('<li')) {
      return p;
    }
    return `<p>${p}</p>`;
  }).join('\n\n');

  // Clean up any double paragraph tags
  html = html.replace(/<p>\s*<h2/g, '<h2').replace(/<\/h2>\s*<\/p>/g, '</h2>');
  html = html.replace(/<p>\s*<h3/g, '<h3').replace(/<\/h3>\s*<\/p>/g, '</h3>');
  html = html.replace(/<p>\s*<pre/g, '<pre').replace(/<\/pre>\s*<\/p>/g, '</pre>');
  html = html.replace(/<p>\s*<ul/g, '<ul').replace(/<\/ul>\s*<\/p>/g, '</ul>');

  return html;
}

function generateArticlePage(post) {
  const articleHtml = markdownToHtml(post.content);

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${post.title} — nitsuah</title>
  <meta name="description" content="${post.excerpt}">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700&family=Space+Mono:wght@400;700&display=swap" rel="stylesheet">
  <style>
    :root {
      --bg: #0a0a0b;
      --bg-elevated: #111113;
      --fg: #fafafa;
      --fg-muted: #71717a;
      --accent: #58a6ff;
      --accent-hover: #79b8ff;
      --border: #27272a;
      --card: #141416;
      --card-hover: #18181b;
    }

    * { box-sizing: border-box; margin: 0; padding: 0; }

    html { scroll-behavior: smooth; }

    body {
      font-family: 'JetBrains Mono', monospace;
      background: var(--bg);
      color: var(--fg);
      line-height: 1.6;
      min-height: 100vh;
      -webkit-font-smoothing: antialiased;
    }

    a { color: inherit; text-decoration: none; }
    a:hover { color: var(--accent); }

    .container { max-width: 900px; margin: 0 auto; padding: 0 24px; }

    header {
      position: sticky;
      top: 0;
      z-index: 100;
      background: rgba(10, 10, 11, 0.9);
      backdrop-filter: blur(8px);
      border-bottom: 1px solid var(--border);
      padding: 16px 0;
    }

    .header-inner {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 24px;
    }

    .logo {
      font-family: 'Space Mono', monospace;
      font-weight: 700;
      font-size: 1.25rem;
      letter-spacing: -0.02em;
    }

    .logo span { color: var(--accent); }

    nav { display: flex; gap: 32px; }

    .nav-link {
      font-size: 0.875rem;
      color: var(--fg-muted);
      transition: color 0.15s;
      position: relative;
    }

    .nav-link:hover,
    .nav-link.active { color: var(--fg); }

    .nav-link.active::after {
      content: '';
      position: absolute;
      bottom: -4px;
      left: 0;
      right: 0;
      height: 2px;
      background: var(--accent);
    }

    .article-header {
      padding: 60px 0 40px;
      text-align: center;
      max-width: 720px;
      margin: 0 auto;
    }

    .article-meta {
      display: flex;
      flex-wrap: wrap;
      gap: 16px;
      font-size: 0.875rem;
      color: var(--fg-muted);
      margin-bottom: 16px;
      justify-content: center;
    }

    .article-title {
      font-family: 'Space Mono', monospace;
      font-weight: 700;
      font-size: clamp(1.75rem, 3vw, 2.5rem);
      line-height: 1.2;
      letter-spacing: -0.02em;
    }

    article {
      max-width: 720px;
      margin: 0 auto;
    }

    .article-body {
      font-size: 1.0625rem;
      line-height: 1.85;
      color: var(--fg);
    }

    .article-body h2 {
      font-family: 'Space Mono', monospace;
      font-weight: 700;
      font-size: 1.375rem;
      margin: 40px 0 16px;
      padding-bottom: 8px;
      border-bottom: 1px solid var(--border);
    }

    .article-body h3 {
      font-family: 'Space Mono', monospace;
      font-weight: 700;
      font-size: 1.125rem;
      margin: 32px 0 12px;
    }

    .article-body p { margin-bottom: 16px; }

    .article-body ul, .article-body ol { margin: 16px 0 16px 24px; }

    .article-body li { margin-bottom: 8px; }

    .article-body code {
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.9em;
      background: var(--bg-elevated);
      padding: 2px 6px;
      border-radius: 4px;
      border: 1px solid var(--border);
    }

    .article-body pre {
      background: var(--bg-elevated);
      border: 1px solid var(--border);
      border-radius: 8px;
      padding: 16px;
      overflow-x: auto;
      margin: 24px 0;
    }

    .article-body pre code {
      background: transparent;
      padding: 0;
      border: none;
      font-size: 0.875rem;
      line-height: 1.7;
    }

    .article-body a {
      color: var(--accent);
      text-decoration: underline;
      text-underline-offset: 2px;
    }

    .article-body blockquote {
      border-left: 3px solid var(--accent);
      padding-left: 16px;
      margin: 24px 0;
      color: var(--fg-muted);
      font-style: italic;
    }

    .article-body strong { color: var(--fg); }
    .article-body em { color: var(--fg-muted); }

    .back-link {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 12px 24px;
      font-size: 0.875rem;
      font-weight: 500;
      border: 1px solid var(--border);
      border-radius: 8px;
      background: transparent;
      color: var(--fg);
      cursor: pointer;
      transition: all 0.15s;
      margin-top: 40px;
    }

    .back-link:hover {
      border-color: var(--accent);
      background: var(--bg-elevated);
      color: var(--accent);
    }

    footer {
      border-top: 1px solid var(--border);
      padding: 40px 0;
      text-align: center;
      color: var(--fg-muted);
      font-size: 0.875rem;
    }

    .footer-links { display: flex; gap: 24px; justify-content: center; margin-bottom: 16px; flex-wrap: wrap; }

    .footer-links a { color: var(--fg-muted); }
    .footer-links a:hover { color: var(--accent); }

    @media (max-width: 640px) {
      .article-header { padding: 40px 0 30px; }
      nav { display: none; }
    }

    :focus-visible {
      outline: 2px solid var(--accent);
      outline-offset: 2px;
    }

    ::selection { background: var(--accent); color: var(--bg); }
  </style>
</head>
<body>
  <header>
    <div class="container header-inner">
      <a href="../" class="logo">nitsuah<span>.</span></a>
      <nav>
        <a href="../" class="nav-link">Profile</a>
        <a href="../blog/" class="nav-link active">Blogs</a>
        <a href="https://github.com/nitsuah" class="nav-link" target="_blank" rel="noopener">GitHub</a>
      </nav>
    </div>
  </header>

  <main class="container">
    <section class="article-header">
      <div class="article-meta">
        <span>${post.category}</span>
        <span>${post.date}</span>
        <span>${post.readTime}</span>
      </div>
      <h1 class="article-title">${post.title}</h1>
    </section>

    <article>
      <div class="article-body">
        ${articleHtml}
      </div>

      <a href="../blog/" class="back-link">← Back to Blogs</a>
    </article>
  </main>

  <footer>
    <div class="container">
      <div class="footer-links">
        <a href="https://github.com/nitsuah" target="_blank" rel="noopener">GitHub</a>
        <a href="https://linkedin.com/in/austinjhardy" target="_blank" rel="noopener">LinkedIn</a>
        <a href="https://nitsuah.io" target="_blank" rel="noopener">Portfolio</a>
        <a href="mailto:austin@nitsuah.io">Email</a>
      </div>
      <p>"Ut prosim" — I may serve.</p>
      <p style="font-size: 0.75rem; margin-top: 8px;">Built with GitHub Pages · Source on <a href="https://github.com/nitsuah/nitsuah.github.io" target="_blank" rel="noopener">GitHub</a></p>
    </div>
  </footer>
</body>
</html>`;
}

const outputDir = path.join(__dirname, 'github-pages-blog', 'blog');
blogPosts.filter(p => p.published).forEach(post => {
  const articleDir = path.join(outputDir, post.slug);
  if (!fs.existsSync(articleDir)) {
    fs.mkdirSync(articleDir, { recursive: true });
  }
  const articleHtml = generateArticlePage(post);
  fs.writeFileSync(path.join(articleDir, 'index.html'), articleHtml);
  console.log(`Generated: blog/${post.slug}/index.html`);
});

console.log('All article pages generated!');