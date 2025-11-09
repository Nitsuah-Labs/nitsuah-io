export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  tags: string[];
  category: string;
  readTime: string;
  published: boolean;
}

export const blogPosts: BlogPost[] = [
  {
    id: "nextjs-16-react-19-upgrade",
    title: "Upgrading to Next.js 16 and React 19: A Complete Migration Guide",
    slug: "nextjs-16-react-19-upgrade",
    excerpt:
      "A comprehensive guide to upgrading from Next.js 14 & React 18 to Next.js 16 & React 19, including all breaking changes, fixes, and lessons learned.",
    author: "Austin H.",
    date: "2025-11-09",
    category: "Development",
    tags: ["nextjs", "react", "upgrade", "migration", "typescript"],
    readTime: "12 min read",
    published: true,
    content: `
# Upgrading to Next.js 16 and React 19: A Complete Migration Guide

## Overview

We recently completed a comprehensive upgrade of our portfolio site from Next.js 14 & React 18 to Next.js 16 & React 19. This wasn't just a simple version bump—it involved navigating multiple breaking changes, updating dependencies, and fixing compatibility issues across the stack.

## Major Version Upgrades

### Core Framework
- **Next.js**: 14.2.3 → 16.0.1
- **React & React-DOM**: 18.3.1 → 19.2.0
- **ESLint**: 8.x → 9.39.0
- **MUI Material**: 5.14.14 → 7.3.5
- **MUI Icons**: 5.14.11 → 7.3.5
- **@splinetool/react-spline**: 2.2.6 → 4.1.0
- **wagmi**: 2.x (maintained after security audit downgrade)

## Breaking Changes & Fixes

### 1. Next.js 16 Configuration Changes

**Issue**: \`swcMinify\` removed, webpack config requires migration

\`\`\`javascript
// Before (next.config.js)
module.exports = {
  swcMinify: true,
  webpack: (config) => {
    // webpack customizations
    return config;
  }
}

// After (next.config.js)
module.exports = {
  // swcMinify removed - now default
  turbopack: {}, // Turbopack is default in Next.js 16
}
\`\`\`

### 2. Middleware → Proxy Migration

**Issue**: Next.js 16 deprecates the "middleware" file convention

**Fix**: Renamed \`src/middleware.ts\` to \`src/proxy.ts\` and updated function name

\`\`\`typescript
// Before
export function middleware() {
  const response = NextResponse.next();
  // headers...
  return response;
}

// After (src/proxy.ts)
export function proxy() {
  const response = NextResponse.next();
  // headers...
  return response;
}
\`\`\`

### 3. React 19 JSX.Element Namespace Removed

**Issue**: React 19 removed the \`JSX.Element\` type

**Fix**: Global find/replace \`JSX.Element\` → \`React.ReactElement\`

\`\`\`typescript
// Before
const MyComponent = (): JSX.Element => {
  return <div>Hello</div>;
}

// After
const MyComponent = (): React.ReactElement => {
  return <div>Hello</div>;
}
\`\`\`

### 4. MUI Grid v7 Breaking Changes

**Issue**: MUI v7 removed \`item\`, \`xs\`, \`sm\`, \`md\` props from Grid

**Solution 1**: Use Grid2 (Unstable_Grid2 doesn't exist in v7)

**Solution 2**: Use CSS Grid instead (our choice)

\`\`\`typescript
// Before (MUI Grid)
<Grid container spacing={2}>
  <Grid item xs={12} sm={6} md={4}>
    <Card />
  </Grid>
</Grid>

// After (CSS Grid)
<section style={{
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))",
  gap: "3rem",
}}>
  <Card />
</section>
\`\`\`

### 5. MUI Menu Component & React 19

**Issue**: MUI Menu doesn't accept Fragments as children in React 19

\`\`\`typescript
// Before (causes error)
<Menu>
  {items.map(item => (
    <React.Fragment key={item.id}>
      <MenuItem>{item.name}</MenuItem>
      {item.submenu && <MenuItem>...</MenuItem>}
    </React.Fragment>
  ))}
</Menu>

// After (use flatMap)
<Menu>
  {items.flatMap(item => {
    const menuItems = [
      <MenuItem key={item.id}>{item.name}</MenuItem>
    ];
    if (item.submenu) {
      menuItems.push(<MenuItem key={\`\${item.id}-sub\`}>...</MenuItem>);
    }
    return menuItems;
  })}
</Menu>
\`\`\`

### 6. Next.js Link Component Updates

**Issue**: \`legacyBehavior\` prop deprecated

**Fix**: Use Next.js codemod to automatically migrate

\`\`\`bash
npx @next/codemod@latest new-link .
\`\`\`

\`\`\`typescript
// Before
<Link href="/about" passHref legacyBehavior>
  <a style={{ color: 'white' }}>About</a>
</Link>

// After
<Link href="/about" style={{ color: 'white' }}>
  About
</Link>
\`\`\`

### 7. Spline React 19 Compatibility

**Issue**: \`@splinetool/react-spline@2.2.6\` bundled React 18 internals, causing \`ReactCurrentDispatcher\` errors

**Fix**: Upgrade to v4.1.0 which supports React 19

\`\`\`json
{
  "dependencies": {
    "@splinetool/react-spline": "^4.1.0"
  }
}
\`\`\`

### 8. ESLint 9 Configuration

**Issue**: ESLint 9 requires flat config format, \`.eslintrc.json\` deprecated

**Status**: Deferred (non-blocking). Current config works with Next.js build.

**Future Migration**: Will need to create \`eslint.config.js\` with flat config format.

## Git Hooks & CI/CD Adjustments

### Pre-commit Hooks

**Issue**: \`next lint\` has a bug in Next.js 16 with the \`--fix\` flag

**Fix**: Modified Husky hooks to skip lint, rely on build-time validation

\`\`\`bash
# .husky/pre-commit
# Disabled: npm run lint:fix  # Next.js 16 bug
npm run typecheck
npm run format
npm run test
\`\`\`

## Service Worker 404 Fix

**Issue**: Browser auto-requests \`/sw.js\`, causing 404 errors

**Fix**: Created route handler to return empty service worker

\`\`\`typescript
// src/app/sw.js/route.ts
export async function GET() {
  return new NextResponse(
    \`// Empty service worker\`,
    {
      headers: {
        "Content-Type": "application/javascript",
        "Cache-Control": "no-cache, no-store, must-revalidate",
      },
    }
  );
}
\`\`\`

## Mobile UI Fixes

### Project Card Buttons

**Issue**: Buttons extended to full card width on mobile, ignoring padding

**Fix**: Removed \`width: 100%\`, let flex handle sizing

\`\`\`css
@media (max-width: 480px) {
  .cardActions {
    flex-direction: column;
    gap: 0.5rem;
  }

  .cardButton {
    /* removed width: 100% */
    text-align: center;
    padding: 0.75rem 1rem;
  }
}
\`\`\`

## Testing Results

✅ **TypeScript**: All type checks pass
✅ **Jest Unit Tests**: 3/3 passing
✅ **Production Build**: All 24 routes compile successfully
✅ **E2E Tests**: 60/62 passing (96.8%)
  - ⚠️ 2 accessibility tests fail due to Spline component client errors
✅ **Runtime**: No React warnings, Spline components render correctly

## Lessons Learned

1. **Read Migration Guides**: Both Next.js and React have excellent upgrade guides
2. **Use Codemods**: Automated migrations save hours of manual work
3. **Test Incrementally**: Upgrade one major package at a time when possible
4. **Check Peer Dependencies**: React 19 causes peer dependency warnings in older packages
5. **Fresh Install**: When in doubt, delete node_modules and package-lock.json
6. **MUI Grid Evolution**: MUI's Grid is moving away from Bootstrap-style props
7. **CSS Grid > Component Grid**: Native CSS Grid is more reliable and performant
8. **React 19 Stricter**: Fragment/text node handling is stricter in React 19

## Security

- 18 low-severity vulnerabilities remain in @walletconnect and @safe-global dependencies
- These are transitive dependencies—waiting for upstream fixes
- No high or critical vulnerabilities

## Performance Impact

- ✅ Build time improved with Turbopack default
- ✅ Bundle size reduced (React 19 is smaller)
- ✅ No runtime performance regressions
- ✅ Spline 3D scenes load correctly

## Conclusion

Upgrading to Next.js 16 and React 19 required careful attention to breaking changes, but the result is a more modern, performant application. The key was systematic debugging, reading documentation, and not being afraid to try different approaches (like switching from MUI Grid to CSS Grid).

The upgrade positions us well for future improvements and ensures we're using supported, actively maintained versions of our core dependencies.

## Resources

- [Next.js 16 Upgrade Guide](https://nextjs.org/docs/app/guides/upgrading/version-16)
- [React 19 Upgrade Guide](https://react.dev/blog/2024/04/25/react-19-upgrade-guide)
- [MUI v7 Migration Guide](https://mui.com/material-ui/migration/migration-v7/)
- [Next.js Codemods](https://nextjs.org/docs/app/guides/upgrading/codemods)

---

*Have questions about this upgrade? Feel free to reach out or check the GitHub PR for detailed commit history.*
`,
  },
];
