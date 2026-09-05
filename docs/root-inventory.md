# PREIShare-org-repo — top-level inventory

Snapshot of repo-root files and folders only (no nested listing). Nothing else in the repo was modified when this was written.

## Folders

- `.git` — Git history and repository metadata for this project.
- `.vscode` — Cursor/VS Code workspace settings for this folder.
- `docs` — Project documentation; currently holds an `onboarding` subdirectory.
- `src` — Application source (routes, components, styles, router) for the TanStack Start app.

## Files

- `.DS_Store` — macOS Finder metadata; not part of the app. *(Unsure whether it is meant to stay un-gitignored.)*
- `.cta.json` — Metadata from the TanStack CLI create command (preset, Tailwind, npm, file-router, no add-ons).
- `.cursorrules` — Cursor rules for this workspace (stack, layout, Supabase, tests).
- `.gitignore` — Patterns Git should ignore (e.g. `node_modules`, env files).
- `AGENTS.md` — Agent/project notes: stack, scripts, Intent skills, scaffold history.
- `README.md` — Human-facing project overview and how to run the app.
- `package.json` — npm package name, scripts, and dependencies.
- `package-lock.json` — Locked npm dependency tree for reproducible installs.
- `tsconfig.json` — TypeScript compiler options for the app.
- `tsr.config.json` — TanStack Router CLI config; here it only sets `"target": "react"`.
- `vite.config.ts` — Vite config (Tailwind, TanStack Start, React, Devtools).



## Not present at the root (for context)

No `node_modules/`, no `public/`, no `.env`.





## Package manifests and workspace layout

Read-only scan: one `package.json` at the repo root, plus `package-lock.json`. No nested `package.json` files, no `workspaces` field, and no `pnpm-workspace.yaml` / `lerna.json` / `nx.json` / `turbo.json`. This is a **single-package npm app**, not a monorepo.


| Location        | Name                 | Private                 |
| --------------- | -------------------- | ----------------------- |
| `/package.json` | `preishare-org-repo` | yes (`"private": true`) |


Lockfile is npm (`package-lock.json`). There is a leftover `"pnpm.onlyBuiltDependencies"` block in `package.json` (esbuild, lightningcss) from the TanStack scaffold; it does not make this a pnpm workspace. *(Unsure whether anyone ever installed with pnpm here.)*

### Scripts that look relevant to dev / build / test

From root `package.json`:

- `dev` — `vite dev --port 3000` (local app server)
- `build` — `vite build` (production bundle)
- `preview` — `vite preview` (serve the production build)
- `generate-routes` — `tsr generate` (TanStack Router file-route codegen; related to `tsr.config.json`)

There is **no** `test` **/** `lint` **/** `typecheck` **script** in the manifest. No other package managers’ manifests (`Cargo.toml`, `pyproject.toml`, `go.mod`, `composer.json`) were found.

## Where the web app lives (frontend)

The main web app is **this repo root**, not a nested `apps/` or `web/` package. Vite + TanStack Start are wired in `vite.config.ts` (`tanstackStart()`, `viteReact()`, Tailwind). There is **no** `src/main.tsx` / `index.html` at the root; Start’s Vite plugin owns the HTML/JS entry, and the app-owned router factory is `src/router.tsx` (`getRouter()` importing `src/routeTree.gen.ts`).

### Most likely “frontend” folders

- **`src/`** — the whole UI application (only app source tree besides `docs/`).
- **`src/routes/`** — file-based TanStack Router routes (`createRootRoute` / `createFileRoute`).
- **`src/components/`** — shared React UI (Header, Footer, ThemeToggle).
- **`src/lib/`** — small client-side helpers (currently `user.ts`).
- **`src/styles.css`** — Tailwind / CSS tokens used by the root document.

### Concrete TypeScript / React / Start paths

| Path | Role |
| --- | --- |
| `vite.config.ts` | Vite + TanStack Start + React + Tailwind plugins |
| `src/router.tsx` | App router factory (`createTanStackRouter` + generated route tree) |
| `src/routeTree.gen.ts` | Generated route tree (do not edit by hand) |
| `src/routes/__root.tsx` | Root route / HTML shell (`createRootRoute`, HeadContent, Scripts, Header/Footer) |
| `src/routes/index.tsx` | `/` page route |
| `src/routes/about.tsx` | `/about` page route |
| `src/components/Header.tsx` | Site header |
| `src/components/Footer.tsx` | Site footer |
| `src/components/ThemeToggle.tsx` | Theme toggle |
| `src/lib/user.ts` | User-related helper *(exact usage not fully traced here)* |
| `src/styles.css` | Global styles loaded from `__root.tsx` via `?url` |
| `tsr.config.json` | Router CLI target (`"react"`); routes default to `src/routes` |

No separate backend package or `src/server/` tree showed up in this scan; Start server functions would typically live next to routes later. *(Unsure whether `src/lib/user.ts` is UI-only or meant for future auth.)*

## Data layer (Supabase / Postgres / env) — orientation only

This scan is **read-only**. There is **no live database wiring in this repo yet**, and these notes do not describe how to connect to or change production data.

**What is actually in the tree**

- No `supabase/` folder (no local Supabase project, migrations, or config).
- No `.sql` files, Prisma, Drizzle, or other ORM/schema folders.
- No `.env`, `.env.example`, or `.env.local` checked in. `.gitignore` ignores `.env` so secrets are not meant to live in git.
- No `@supabase` (or other database) dependency in `package.json`.
- No `src/lib/supabase.ts` file, even though `.cursorrules` says to use a client at `lib/supabase.ts`.
- `src/lib/user.ts` is a **stub**: it defines a `User` type and `getUser()` always returns `null`. It is a placeholder for “who is logged in” in the UI, not a database client.

**What mentions exist (intent, not implementation)**

- `docs/onboarding/team-orientation-notes.md` describes the intended product stack as TypeScript, TanStack Start, React, **Supabase, PostgreSQL, pgvector**. That is a mission/orientation note, not a folder of schema or migrations.
- `.cursorrules` and `AGENTS.md` describe *how env vars should be used later* (server `process.env`, client only `VITE_*`, don’t commit secrets). `AGENTS.md` also says the blank scaffold needs no env vars until real config is added.

**Plain language: what those kinds of folders would be for (when they appear)**

- **`supabase/`** (typical): local/project config and **SQL migrations** that define tables. It is versioned schema history, not a place to poke production rows by hand.
- **`.env` / env examples**: names of settings the app needs (URLs, keys). Real values stay on each machine or host; examples would only show *which* names exist.
- **`src/lib/supabase.ts`** (mentioned in rules, missing): would be the app’s single client helper so UI/server code talks to Supabase in one place.
- **`src/lib/`** today: small TypeScript helpers next to the frontend; currently only the user stub.

**Bottom line:** data (Supabase/Postgres/pgvector) is **planned in docs and Cursor rules**, not present as migrations or config in this checkout. *(Unsure whether a team-hosted Supabase project exists outside this repo.)*

## Tooling (usually not a first feature change)

These files configure how the app is typed, built, ignored, and how editors/agents behave. Prefer leaving them alone unless a task is specifically about CI, lint, or editor setup.

### TypeScript / build (present)

| Path | What it is |
| --- | --- |
| `tsconfig.json` | TypeScript compiler options (`strict`, path aliases `#/*` and `@/*` → `src/*`). A `"Linting"` comment in this file is **compiler checks** (unused locals, etc.), not ESLint. |
| `vite.config.ts` | Vite plugins: Devtools, Tailwind, TanStack Start, React. |
| `tsr.config.json` | TanStack Router CLI (`"target": "react"`). |
| `package.json` / `package-lock.json` | Scripts and locked deps. No `lint`, `format`, or `typecheck` scripts. |
| `.gitignore` | Ignores `node_modules`, `.env`, build output (`.output`, `dist`, `.tanstack`, …). |
| `.cta.json` | TanStack create-app metadata from the original scaffold. |

### Lint / format (mostly absent)

- No ESLint config (`eslint.config.*`, `.eslintrc*`).
- No Prettier/Biome config at the repo root. Prettier may appear **transitively** in `package-lock.json` via TanStack packages; that is not a project formatter setup.
- `src/routeTree.gen.ts` starts with `/* eslint-disable */` even though this repo has no ESLint config yet (scaffold leftover).

### CI / GitHub Actions (absent)

- No `.github/` folder, no workflows, no other CI configs (Circle, GitLab, etc.) in this tree.
- `docs/onboarding/team-orientation-notes.md` mentions GitHub Actions as something that **may** run later—not as files that exist here.

### Editor / agent config (present)

| Path | What it is |
| --- | --- |
| `.vscode/settings.json` | Cursor/VS Code: treat generated `routeTree.gen.ts` as excluded from watch/search and **read-only**. |
| `.cursorrules` | Cursor project rules (stack, routes, env, “use Supabase from `lib/supabase.ts`”, write tests). |
| `AGENTS.md` | Agent/scaffold notes, Intent skill-loading block, how to run the app. |

### Nearby docs (not CI, but also not product UI)

- `docs/onboarding/` — orientation (`team-orientation-notes.md`, `setup-log.md`, `repo-map.md`). Useful for humans; not GitHub Actions.

**Bottom line:** tooling that *does* exist is TypeScript + Vite + editor/agent rules. There is **no project lint/format pipeline and no CI workflows** in this checkout. *(Unsure whether the team repo has Actions that this fork simply does not include.)*