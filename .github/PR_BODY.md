PR title (suggested)
- Refactor: Extract demo components to reduce per-file LOC, stabilize builds (phase-10-new)

Summary
- This PR extracts large demo pages into focused, smaller components and refactors the demos to import those components. The goal is to reduce individual demo file sizes (target demos under ~500 LOC), improve readability, and make future testing/maintenance easier. Changes were validated with Prettier formatting and a full Next.js production build.

Branch / PR
- Branch: `phase-10-new`
- Active PR for related work: PHASE-10-NEW-DEPS (https://github.com/Nitsuah-Labs/nitsuah-io/pull/136)

Motivation
- Several demo files were >600 LOC which made them hard to maintain and review.
- Extracting UI blocks into components reduces file complexity and encourages reuse.
- Recent file-creation corruption was mitigated and we verified the repo builds cleanly.

High level changes (by demo)
- Storefront demo (completed earlier)
  - Extracted: `BundleView`, `CheckoutView`, `ConfirmationView`, `UploadView`
  - Location: `src/app/projects/clients/_comp/storefront/`
  - Status: validated

- CRM demo (completed earlier)
  - Extracted: `Dashboard`, `ContactsList`, `DealsView`, `TasksView`
  - Location: `src/app/projects/clients/_comp/crm/`
  - Status: validated

- Appointment demo (completed earlier)
  - Extracted: `CalendarView`, `PatientList`, `AppointmentForm`
  - Location: `src/app/projects/clients/_comp/appointment/`
  - Status: validated

- Restaurant demo (completed earlier)
  - Extracted: `MenuSection`, `OrderCart`, `ReservationForm`
  - Location: `src/app/projects/clients/_comp/restaurant/`
  - Status: validated

- Portfolio demo (this PR — completed)
  - Extracted:
    - `src/app/projects/clients/_comp/portfolio/ProjectGallery.tsx`
    - `src/app/projects/clients/_comp/portfolio/ProjectModal.tsx`
  - Refactored:
    - `src/app/projects/clients/_comp/PortfolioDemo.tsx` now imports/uses the two components
  - Notes:
    - A duplicate-symbol issue was fixed in `ProjectGallery.tsx` (duplicate block removed) during validation.
  - Status: validated

Files added (portfolio)
- `src/app/projects/clients/_comp/portfolio/ProjectGallery.tsx` — gallery UI component (props: `projects`, `onSelectProject`)
- `src/app/projects/clients/_comp/portfolio/ProjectModal.tsx` — project detail/modal (props: `project`, `onClose`)
- Updated: `src/app/projects/clients/_comp/PortfolioDemo.tsx` — imports `ProjectGallery` and `ProjectModal`, preserves existing state/UX

Other files touched (recent)
- `src/app/projects/clients/_comp/restaurant/ReservationForm.tsx` (edits verified during build)

Validation performed
- Formatting: Prettier applied to newly created/edited files during edits.
- Build: Ran a full production build (`npm run build`) — compiled successfully; TypeScript checks passed; static pages generated. Duplicate symbol issue in `ProjectGallery.tsx` was fixed during validation.
- Manual behavior checks: preserved demo state/handlers (e.g., selected project, cart logic) in demo pages; components receive state via props.

How to test (commands)
- Install deps and run production build locally (PowerShell):
```powershell
npm ci
npm run build
```
- Run dev server:
```powershell
npm run dev
```

QA checklist (minimal)
- [x] Code compiles: `npm run build` (production build)
- [x] TypeScript checks: included in build
- [x] Prettier formatting: applied on new files
- [ ] (Optional) Playwright/E2E visual checks — recommend CI to run full suite

Implementation notes / rationale
- Kept prop shapes and demo fixture data unchanged where possible to avoid broad data-shape ripple effects.
- Used atomic-style edits during earlier work to avoid an observed append-corruption issue (no content duplication should remain).
- Small UI helper wrappers that were used across multiple extracted pieces (like `DemoSection`) were preserved and re-imported where needed.

Follow-ups / TODOs
- Resume demo: still pending extraction (target components: `ExperienceSection`, `SkillsSection`, `ContactForm`) — left as next work item.
- Consider moving inline styles into `src/app/projects/clients/_comp/_styles/portfolio.css` or CSS modules to simplify component code and reduce bundle markup.
- Add small unit or snapshot tests for each new component to lock in structure/props and make future refactors safer.
- Optional: run full Playwright suite / visual tests to ensure runtime parity across demos.

Short completion summary
- Extracted, refactored, and validated the Portfolio demo into `ProjectGallery` + `ProjectModal`. Build and TypeScript checks pass after resolving a duplicate symbol issue. Most of the demos are now refactored; only the Resume demo remains on the extraction todo list.

Contact
- If you want me to push this PR body to the active PR or add Jest tests for the new components, tell me and I will continue.