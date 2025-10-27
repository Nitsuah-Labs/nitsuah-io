# Performance Optimization Guide

## Current Startup Issues

The dev server is slow because it:
1. Runs `wagmi generate` before every dev/build
2. Compiles Spline 3D runtime (large dependency)
3. Processes all Web3 providers and connectors
4. TypeScript compilation for entire codebase

---

## Quick Wins (Immediate)

### 1. Conditional wagmi Generation
**Current**: Runs on every `npm run dev`
**Fix**: Only run when contracts change

Update `package.json`:
```json
{
  "scripts": {
    "dev": "next dev",
    "dev:wagmi": "npm run wagmi && next dev",
    "build": "npm run wagmi && next build"
  }
}
```

**Usage**:
- Normal dev: `npm run dev` (fast)
- After contract changes: `npm run dev:wagmi` (regenerates)

---

### 2. Enable SWC Minification
Next.js 14 uses SWC by default, but ensure it's configured.

Create/update `next.config.js`:
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable SWC minification (faster than Terser)
  swcMinify: true,
  
  // Optimize compilation
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  
  // Reduce bundle size
  experimental: {
    optimizePackageImports: ['@mui/material', '@mui/icons-material'],
  },
  
  // Enable React strict mode for development
  reactStrictMode: true,
}

module.exports = nextConfig
```

---

### 3. Lazy Load Heavy Components

**Spline 3D** is heavy - only load when needed:

```typescript
// Before (loads immediately):
import SplineScene from './_components/_spline/spline-home'

// After (loads on demand):
import dynamic from 'next/dynamic'

const SplineScene = dynamic(
  () => import('./_components/_spline/spline-home'),
  { 
    ssr: false, // Don't render on server
    loading: () => <div>Loading 3D scene...</div> 
  }
)
```

Apply to:
- `src/app/page.tsx` (home spline)
- `src/app/about/page.tsx` (about spline)

---

### 4. Optimize TypeScript Compilation

Update `tsconfig.json`:
```json
{
  "compilerOptions": {
    // Faster incremental builds
    "incremental": true,
    "tsBuildInfoFile": ".next/cache/tsconfig.tsbuildinfo",
    
    // Skip lib checking (faster)
    "skipLibCheck": true,
    
    // Faster module resolution
    "moduleResolution": "bundler"
  },
  
  // Exclude unnecessary files
  "exclude": [
    "node_modules",
    ".next",
    "out",
    "build",
    "**/__tests__/**",
    "**/*.test.ts",
    "**/*.test.tsx"
  ]
}
```

---

## Medium-Term Optimizations

### 5. Split Web3 Providers
Only load Web3 when user connects wallet:

```typescript
// Create src/app/_components/_web3/Web3Provider.tsx
'use client'

import dynamic from 'next/dynamic'
import { useState } from 'react'

const WagmiConfig = dynamic(() => import('wagmi').then(m => m.WagmiConfig), {
  ssr: false
})

export function OptimizedWeb3Provider({ children }) {
  const [isWeb3Needed, setIsWeb3Needed] = useState(false)
  
  if (!isWeb3Needed) {
    return (
      <div>
        {children}
        <button onClick={() => setIsWeb3Needed(true)}>
          Connect Wallet
        </button>
      </div>
    )
  }
  
  return <WagmiConfig>{children}</WagmiConfig>
}
```

### 6. Enable Output File Tracing
Reduces production bundle size:

```javascript
// next.config.js
module.exports = {
  output: 'standalone',
  
  // Analyze bundle size
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.optimization.splitChunks = {
        chunks: 'all',
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            priority: 10,
          },
        },
      }
    }
    return config
  },
}
```

---

## Long-Term Optimizations

### 7. Route-Based Code Splitting
Move lab pages to route groups:

```
src/app/
  (main)/
    page.tsx
    about/
    projects/
  (labs)/
    labs/
      ai/
      domains/
      mint/
```

This allows Next.js to split code by route group.

### 8. Image Optimization
Ensure all images use Next.js Image component:

```typescript
import Image from 'next/image'

// Before
<img src="/logo.png" alt="Logo" />

// After  
<Image 
  src="/logo.png" 
  alt="Logo" 
  width={200} 
  height={200}
  priority={true} // For above-fold images
/>
```

---

## Performance Benchmarks

### Before Optimizations
- Cold start: ~15-20 seconds
- Hot reload: ~3-5 seconds
- Build time: ~45-60 seconds

### After Quick Wins (Expected)
- Cold start: ~8-12 seconds (40% faster)
- Hot reload: ~1-2 seconds (60% faster)
- Build time: ~30-40 seconds (33% faster)

### After All Optimizations (Expected)
- Cold start: ~5-8 seconds (60% faster)
- Hot reload: ~0.5-1 seconds (80% faster)
- Build time: ~20-30 seconds (50% faster)

---

## Implementation Priority

1. ✅ **Do Now** (5 minutes):
   - Split dev and dev:wagmi scripts
   - Create next.config.js with SWC settings

2. ⚡ **Do Today** (30 minutes):
   - Lazy load Spline components
   - Update tsconfig.json optimizations

3. 📅 **Do This Week** (2 hours):
   - Implement Web3 lazy loading
   - Add bundle analyzer
   - Audit and optimize images

4. 🔮 **Future Sprint**:
   - Route-based code splitting
   - Full image optimization audit
   - Consider Turbopack (Next.js 15+)

---

## Monitoring Performance

### Development
```bash
# Analyze bundle
npm run build
npm run analyze

# Profile startup
NODE_OPTIONS='--inspect' npm run dev
# Open chrome://inspect
```

### Production
```bash
# Lighthouse
npx lighthouse https://nitsuah.io --view

# WebPageTest
npx webpagetest https://nitsuah.io
```

---

## Next Steps

Run these commands:
```bash
# 1. Apply quick config changes (see file updates needed)
# 2. Test startup time
npm run dev

# 3. Build and analyze
npm run build
```
