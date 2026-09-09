# PREIshare repository map

> Onboarding map for first contribution planning. Built with AI-assisted
> inventory + human path verification. Do not treat this as architecture law
> if the real tree disagrees—update this file when you learn more.

Working notes used while mapping: `docs/root-inventory.md` (uncommitted inventory scratch file). Orientation: `docs/onboarding/team-orientation-notes.md`. Clone details: `docs/onboarding/setup-log.md`.

## Meta

- Clone path (from setup-log): `/Users/braydenshoemaker/Desktop/School/FALL2026/Client-Side Web Dev/projects/PREIShare-org-repo`
- Date mapped: `2026-09-04`
- Agent tool used: `coding-agent`
- Mapper: `Brayden Shoemaker` (`ShoeyCodes`)

## 1. Overview (5–8 sentences)

PREIshare appears to be organized as: **single package** (one root `package.json`, npm lockfile, no `workspaces` / `apps/` / `packages/` tree). In plain language, the product code seems to live mainly in `src/` at the **repo root**, with Vite and TanStack Start wired from `vite.config.ts`. Shared libraries or packages appear in **none found** (no nested packages; only small helpers under `src/lib/`). Docs and onboarding notes live in `docs/` (including this file). The intended product stack (Supabase, PostgreSQL, pgvector) is described in onboarding notes and `.cursorrules`, but those folders and clients are **not in this checkout yet**. I am intentionally not editing application code while building this map.

## 2. Top-level inventory

| Path | Kind (app / package / config / docs / other) | One-sentence purpose | Verified by me? (yes/no) |
|------|-----------------------------------------------|----------------------|---------------------------|
| `.git/` | other | Git history and remotes for this clone | yes |
| `.vscode/` | config | Editor settings (generated `routeTree.gen.ts` read-only / excluded from search) | yes |
| `docs/` | docs | Onboarding and project documentation | yes |
| `src/` | app | TanStack Start / React application source | yes |
| `.DS_Store` | other | macOS Finder metadata; not part of the app | yes |
| `.cta.json` | config | TanStack CLI create-app scaffold metadata | yes |
| `.cursorrules` | config | Cursor agent rules for this workspace | yes |
| `.gitignore` | config | Git ignore patterns (`node_modules`, `.env`, build output) | yes |
| `AGENTS.md` | docs | Agent/scaffold notes, scripts, Intent skill loading | yes |
| `README.md` | docs | How to run and build the starter app | yes |
| `package.json` | config | Root package manifest / scripts (`preishare-org-repo`) | yes |
| `package-lock.json` | config | npm lockfile for reproducible installs | yes |
| `tsconfig.json` | config | TypeScript compiler options and path aliases | yes |
| `tsr.config.json` | config | TanStack Router CLI (`"target": "react"`) | yes |
| `vite.config.ts` | config | Vite + Start + React + Tailwind plugins | yes |

Not present at the root (verified missing): `apps/`, `packages/`, `.github/`, `node_modules/`, `public/`, `.env`.

## 3. Frontend concerns (TypeScript, React, TanStack Start)

- Likely app root(s): repo root + `src/` (not a nested `apps/web` package)
- Clues I used (file names, frameworks mentioned in package.json): `package.json` dependencies `@tanstack/react-start`, `@tanstack/react-router`, `react`, `vite`; plugins in `vite.config.ts`; file routes under `src/routes/`
- Entry / routes / UI areas worth knowing:
  - Router factory: `src/router.tsx` (`getRouter()`; no hand-written `src/main.tsx` / root `index.html`)
  - Generated tree: `src/routeTree.gen.ts` (do not edit by hand)
  - Routes: `src/routes/__root.tsx` (HTML shell), `src/routes/index.tsx` (`/`), `src/routes/about.tsx` (`/about`)
  - UI: `src/components/Header.tsx`, `Footer.tsx`, `ThemeToggle.tsx`
  - Styles: `src/styles.css`
  - Stub: `src/lib/user.ts` (`getUser()` currently returns `null`)
- How this area relates to user-facing screens: file routes in `src/routes/` are the pages people see; `__root.tsx` wraps every page with header, footer, and global CSS; components are the shared chrome around those pages.

## 4. Backend / data concerns (Supabase, PostgreSQL, pgvector, APIs)

- Supabase or data config paths: **not found yet** (no `supabase/` folder; no `@supabase` dependency; no `src/lib/supabase.ts` even though `.cursorrules` names that file)
- Migrations / SQL / schema-related paths: **not found yet**
- Env examples (NOT secret values): **not found yet** (no `.env.example`; `.gitignore` lists `.env`)
- Notes on what a beginner should not touch in production data: there is no migration or production-data workflow in this repo to run. Do not invent credentials, do not commit `.env` files, and do not try to “fix” production databases. Planned stack (Supabase / PostgreSQL / pgvector) is orientation-only until the team adds real config. `src/lib/user.ts` is a UI placeholder, not a database client.

## 5. Tooling and CI

- TypeScript / lint / format config: `tsconfig.json` (strict TS; unused-local checks are compiler flags, not ESLint). **No** project ESLint / Prettier / Biome config. No `lint` / `format` / `typecheck` scripts.
- CI workflows (e.g. GitHub Actions): **not found** (no `.github/` in this tree)
- Editor or agent config already present: `.vscode/settings.json`, `.cursorrules`, `AGENTS.md`
- Scripts from package manifests that look like dev/build/test: `dev`, `build`, `preview`, `generate-routes` (no `test` script)

Related build tooling (usually not a first feature PR): `vite.config.ts`, `tsr.config.json`, `.cta.json`, `package-lock.json`.

## 6. Safe first-touch vs do-not-edit-yet

### Safe first-touch (good candidates for a tiny onboarding PR)

| Path or area | Why it is relatively safe | Risk if handled carelessly |
|--------------|---------------------------|----------------------------|
| `docs/onboarding/` | Docs-only; helps the team onboard | Misleading docs |
| `docs/onboarding/team-orientation-notes.md` | Already a learner-owned narrative | Wrong remotes, mission, or workflow |
| `docs/onboarding/setup-log.md` | Personal setup audit trail | Broken clone/remote instructions for the next reader |
| `docs/onboarding/repo-map.md` (this file) | Map only; no runtime | Stale paths if the tree changes |
| `README.md` (tiny copy-only, if a mentor agrees) | Human-facing; no compile step | Wrong run commands confuse everyone |

No `CONTRIBUTORS` file is present in this clone.

### Do not edit yet (wait until you have tests, review, and a real task)

| Path or area | Why wait | What could break |
|--------------|----------|------------------|
| CI under `.github/` or equivalent | Shared pipeline (none here yet; still do not invent it casually) | Everyone’s builds once it exists |
| Root workspace / package manager lockfiles (`package-lock.json`, `package.json` deps) | Dependency graph | Install failures for all |
| Supabase / migrations / production env | Data and secrets (not in repo yet; still out of scope) | Data loss or leaked secrets |
| Shared packages used by multiple apps | Wide blast radius (none found; `src/` is still the whole app) | Multiple features regress |
| Auth, payments, or vector/search core (if present) | High complexity; not implemented here | Security or relevance bugs |
| `src/routeTree.gen.ts` | Generated; editor marks it read-only | Routing mismatches |
| `src/routes/`, `src/components/`, `src/router.tsx`, `vite.config.ts` | Live app and Start/Vite wiring | Blank or broken UI for everyone |
| `.cursorrules` / `AGENTS.md` | Agent/tooling contract | Agents (and humans) follow wrong rules |

## 7. Open questions for the team

- Does a team-hosted Supabase / PostgreSQL / pgvector project exist **outside** this repo, and when should `src/lib/supabase.ts` be added?
- Should this fork expect GitHub Actions later, or is CI still unplanned (orientation notes mention Actions as future)?
- Is the leftover `"pnpm"` block in `package.json` intentional, or should npm remain the only package manager?
- Is `.DS_Store` supposed to stay un-gitignored?
- Official app entry is the Start plugin + `src/router.tsx` in this tree—confirm that remains true if a second app is ever added.
- There is no shared-UI package; is `src/components/` the source of truth until a monorepo exists?

## 8. How I will use this map next

- Configure AI project rules/memory using the paths above (next tooling steps).
- Pick a first contribution only from **Safe first-touch** unless a mentor expands scope.
- Revisit and edit this file when a path claim is proven wrong.
