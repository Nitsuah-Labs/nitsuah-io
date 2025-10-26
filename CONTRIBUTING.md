# Contributing to nitsuah.io

Thanks for your interest in contributing! This portfolio site is a personal project, but improvements and suggestions are welcome.

## Quick Start

```bash
# Clone the repo
git clone https://github.com/Nitsuah-Labs/nitsuah-io.git
cd nitsuah-io

# Install dependencies
npm ci

# Copy environment template
cp .env.example .env.local

# Start development server
npm run dev
```

## Development Workflow

1. **Fork & Clone**: Fork the repository and clone your fork
2. **Branch**: Create a feature branch (`git checkout -b feature/your-feature`)
3. **Develop**: Make your changes with clear, focused commits
4. **Test**: Ensure the build succeeds (`npm run build`)
5. **Push**: Push to your fork (`git push origin feature/your-feature`)
6. **PR**: Open a pull request with a clear description

## Code Standards

### TypeScript
- Use strict TypeScript (no `any` unless absolutely necessary)
- Follow existing type patterns in `src/types/`
- Leverage path aliases (`@/components`, `@/lib`, etc.)

### React/Next.js
- Use functional components with hooks
- Keep components small and focused
- Use Next.js 14 App Router conventions
- Leverage server components when appropriate

### Styling
- CSS modules or component-scoped styles preferred
- Follow existing color schemes and spacing
- Ensure responsive design (mobile-first)
- Maintain accessibility (WCAG 2.1 AA)

### Formatting
- ESLint and Prettier are configured - they run on save
- Run `npm run lint` to check for issues
- Run `npm run typecheck` for TypeScript errors

## Project Structure

```
src/
├── app/              # Next.js App Router pages
│   ├── _components/  # React components
│   └── _styles/      # CSS files
├── lib/              # Utilities and data
│   └── data/         # Static data (projects, etc.)
└── types/            # TypeScript definitions
```

## Adding Content

### New Project
1. Edit `src/lib/data/projects.ts`
2. Add project with all required fields
3. Set `featured: true` to show on homepage
4. Add project assets to `public/assets/`

### New Page
1. Create in `src/app/your-page/page.tsx`
2. Update sitemap in `src/app/sitemap.ts`
3. Add to navigation if needed

## Testing

```bash
# Run tests
npm test

# Run tests in watch mode
npm test -- --watch

# Check coverage
npm test -- --coverage
```

## Commit Messages

Use conventional commits format:

- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation changes
- `style:` Code style changes (formatting)
- `refactor:` Code refactoring
- `test:` Adding or updating tests
- `chore:` Maintenance tasks

Example: `feat: add dark mode toggle to navigation`

## Pull Request Guidelines

### Before Submitting
- [ ] Code builds successfully (`npm run build`)
- [ ] All tests pass (`npm test`)
- [ ] No TypeScript errors (`npm run typecheck`)
- [ ] No linting errors (`npm run lint`)
- [ ] Follows existing code style
- [ ] Includes tests for new features

### PR Description Should Include
- Clear description of changes
- Motivation/context for the change
- Screenshots for UI changes
- Breaking changes (if any)
- Related issues

## Areas That Need Help

- 🧪 **Testing**: More component tests welcome
- ♿ **Accessibility**: Audit and improvements
- 🎨 **Design**: Visual improvements
- 📱 **Mobile**: Mobile experience optimization
- 🚀 **Performance**: Load time and optimization
- 📝 **Documentation**: README improvements

## Questions?

- Open an issue for bugs or feature requests
- Discussions for general questions
- Check existing issues before creating new ones

## License

By contributing, you agree that your contributions will be licensed under the same license as the project.

---

**Note**: This is a personal portfolio, so not all contributions may be accepted. The maintainer reserves the right to decline PRs that don't align with the project's goals.