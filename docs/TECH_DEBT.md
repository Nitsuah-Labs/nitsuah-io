# Technical Debt & Code Cleanup

**Created:** November 2, 2025  
**Status:** Ongoing

## Overview

Strategic plan for reducing code bloat, improving maintainability, and establishing better code organization patterns across the codebase. Focus on refactoring large components, extracting reusable patterns, and moving inline styles to proper CSS files.

---

## 🎯 Primary Goals

1. **Reduce Component Size** - Break down 300-1000+ LOC files into manageable, focused components
2. **Separate Concerns** - Move inline styles and className-heavy JSX into proper CSS modules
3. **Create Reusable Components** - Extract common patterns into shared components with style props
4. **Remove Dead Code** - Identify and remove unused files, functions, and dependencies
5. **Improve Readability** - Make files easier to navigate and understand at a glance
6. **Reorganize Code Structure** - Move code from cluttered directories into more logical structures or update folder structure or file structure as needed (just consider the impacts and updates needed, test to ensure breakages get fixed)
7. **Best Practices** - Follow established coding conventions, use meaningful names, and document complex logic in `docs/`

---

## 🔥 High Priority - Bloated Pages

---

## 🔧 Reusable Component Library

Create shared components to reduce duplication:

### Layout Components

- [ ] `Section` - Wrapper with consistent padding/background (future)

### Form Components (Future Enhancement)

- [ ] `Input` - Styled text input
- [ ] `TextArea` - Styled textarea
- [ ] `Select` - Styled dropdown
- [ ] `FileUpload` - Styled file input

**Location:** `src/components/ui/` ✅ Created

### Phase 6: Testing & QA (Future - See TODO.md)

- [ ] Visual regression testing (requires Docker setup)
- [ ] Accessibility testing
- [ ] Performance testing
- [ ] Cross-browser testing

## 🗺️ Implementation Phases

---

## 🚨 Risk Mitigation

### Breaking Changes

- Refactor one page at a time
- Maintain parallel branches for comparison
- Use feature flags if needed
- Extensive testing after each refactor

### Style Consistency

- Document design system as we extract styles
- Create style guide for new components
- Use TypeScript for prop validation
- Storybook for component documentation (future)

### Dependencies

- Audit before removing any package
- Check for transitive dependencies
- Test all affected features
- Keep package-lock.json in sync

---

## 📝 Related Documentation

- See `FEEDBACK.md` for user-facing feature requests
- See `ARCHITECTURE.md` for overall system design
- See `CONTRIBUTING.md` for contribution guidelines
- See `TODO.md` for other backlog items

---

## 🎬 Next Steps

1. **Create baseline metrics** - Document current LOC and complexity
2. **Set up component structure** - Create directories and example components
3. **Start with resume page** - Highest impact, most bloated
4. **Iterate and refine** - Apply learnings to other pages

**Goal:** Make the codebase maintainable, scalable, and a joy to work with.
