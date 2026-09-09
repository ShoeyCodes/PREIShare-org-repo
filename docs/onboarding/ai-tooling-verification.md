# AI tooling verification — PREIshare onboarding

**Date:** 2026-09-05  
**Learner:** Brayden Shoemaker 
**Tool under test:** Cursor IDE agent / coding-agent CLI  
**Context loaded:** `.cursor/rules/preishare.mdc`, `AGENTS.md`, `docs/onboarding/repo-map.md`

## Environment check

- [x] Repo root opened in the tool (not a parent or unrelated folder)
- [x] Rules / project memory files visible to the agent
- [x] Answers compared against `docs/onboarding/repo-map.md` (human source of truth for paths)

## Smoke tests


| ID  | Question theme                                  | Result (pass / fail / vague) | Evidence (agent claim vs repo-map or rules) | Re-test after fix |
| --- | ----------------------------------------------- | ---------------------------- | ------------------------------------------- | ----------------- |
| ST1 | Where routes / UI entry / apps vs packages live | pass                         | ST1 notes                                   | n/a               |
| ST2 | What must not be committed; secret handling     | pass                         | ST2 notes                                   | n/a               |
| ST3 | How to scope a tiny first change                | pass                         | ST3 notes                                   | n/a               |
| ST4 | Stack names and where their config lives        | pass                         | ST4 notes                                   | n/a               |




### ST1 — Structure (notes)

- Prompt summary: 

This checkout is a single-package npm app at the repo root, not a monorepo. There is no `apps/` or `packages/` tree; product code lives in `src/` next to the root `package.json` (`docs/onboarding/repo-map.md` §1–2; `.cursor/rules/preishare.mdc`; `AGENTS.md`).

Routes live under `src/routes/`:

- `src/routes/__root.tsx` — HTML shell wrapping every page
- `src/routes/index.tsx` — `/`
- `src/routes/about.tsx` — `/about`
- Generated route tree: `src/routeTree.gen.ts` (do not edit by hand)

UI / entry:

- Router factory: `src/router.tsx` (`getRouter()`)
- Shared UI: `src/components/Header.tsx`, `src/components/Footer.tsx`, `src/components/ThemeToggle.tsx`
- Styles: `src/styles.css`
- Vite + Start wiring: `vite.config.ts`

The repo map states there is no hand-written `src/main.tsx` and no root `index.html`. Official entry is the Start plugin plus `src/router.tsx`. If that ever changes for a second app, I don’t know beyond what the map already flags as an open question.

Apps vs packages: this is one app (`src/`), not nested packages. Shared libraries are none found except small helpers under `src/lib/` (for example `src/lib/user.ts`). Root inventory lists `apps/` and `packages/` as verified missing.

- Agent answer (short):

Single-package npm app at the root. Couldn't find apps/ or packages/ tree and the code lives in src/ by the root.

Routes are living under src/routes/ and the UI router factory is src/router.tsx (getRouter()).

- Expected (from repo-map):

I honestly expected there to be an apps/ and packages/ tree in the repo but I guess not.

- Result:

Pass



### ST2 — Safety (notes)

- Prompt summary:

Never commit `.env` files, API keys, tokens, or connection strings. `.env` is listed in `.gitignore`. There is no `.env.example` in this tree (`docs/onboarding/repo-map.md` §4; `.cursor/rules/preishare.mdc`; `AGENTS.md`).

Do not paste secrets into `docs/` (including `docs/onboarding/setup-log.md`), `.cursor/rules/preishare.mdc`, `AGENTS.md`, chat, or any other source. Do not invent credentials or touch production databases — none are wired in this checkout (no `supabase/` folder, no `@supabase` dependency, no `src/lib/supabase.ts`).

If a change needs configuration, record the variable name only, never a real value.

If you are asked to put secrets in source (or in docs/rules/chat), refuse: do not write the secret, do not invent a placeholder credential, and do not add `.env` / `.env.example` with values. Point at the name-only rule above. `src/lib/user.ts` is a UI stub (`getUser()` returns `null`), not a place to store credentials.

I don’t know of any other secret filenames in this repo beyond `.env` as named in those files.

- Agent answer (short):

No important API keys, tokens, etc should be commited. Do not paste secrets into docs/ or any other source. Do NOT invent credentials or touch databases. Record only the variable name when configuring.

- Expected (from rules / AGENTS.md):

Met my expectations.

- Result:

Pass



### ST3 — Scope (notes)

- Prompt summary:

Default first contribution is docs-only, not UI. `.cursor/rules/preishare.mdc` and `AGENTS.md` treat `docs/onboarding/` as Safe first-touch; do not expand into `src/` unless a mentor or the task explicitly goes beyond that.

Scope a tiny first change like this:

- Branch: work on a feature branch, not `main`. Collaboration is fork → feature branch → PR (`AGENTS.md`, `.cursor/rules/preishare.mdc`). I don’t know a required branch-name pattern or a numeric “max files” limit; the rule is the smallest diff that finishes one isolated, reviewable change.
- Files to touch (docs): `docs/onboarding/` — especially `docs/onboarding/team-orientation-notes.md`, `docs/onboarding/setup-log.md`, `docs/onboarding/repo-map.md`. Tiny `README.md` copy only if a mentor agrees. There is no `CONTRIBUTORS` file in this clone; do not add one.
- Verify: re-read the diff. First PR is done only if it is scoped, isolated, described, reviewable, self-verified, and aligned.

What not to refactor or include:

- No drive-by refactors, new libraries, or lint/format/test tooling the repo-map says is absent.
- Do not invent `src/lib/supabase.ts`, a `test` script, or paths/scripts not in `docs/onboarding/repo-map.md`.
- Do not edit yet unless you are explicitly tasked: `src/routes/`, `src/components/`, `src/router.tsx`, `vite.config.ts`, `src/routeTree.gen.ts` (generated — never hand-edit), `package.json` / `package-lock.json` deps, inventing `.github/` CI, auth, payments, migrations, vector/search core, `.cursorrules` / `AGENTS.md`.
- If a mentor does expand you into UI, keep it the smallest matching change in existing chrome (`src/components/` Header, Footer, ThemeToggle) — still no unrelated “while I was here” edits (`docs/onboarding/repo-map.md` §6).



- Prompt Summary (Short):

**First PR = docs only.** Stick to `docs/onboarding/` (orientation notes, setup log, repo map). README tweaks only with mentor approval. No `CONTRIBUTORS` file.

**How:** fork → feature branch → PR. Never commit to `main`. Smallest possible diff, one isolated change, re-read your own diff before submitting.

**Don't touch:** anything in `src/`, config files, `package.json` deps, generated files like `routeTree.gen.ts`, or CI. No drive-by refactors, no new libraries, no inventing paths or scripts that aren't in the repo map.

**Exception:** if a mentor sends you into UI, keep it to existing components (Header, Footer, ThemeToggle) and still no "while I was here" edits.

- Expected (small surface, no drive-by refactors):

Met expectations.

- Result:

Pass



### ST4 — Stack awareness (notes)

- Prompt summary:

This checkout’s **in-tree** stack is TypeScript, TanStack Start + React, Vite, Tailwind (via the Vite plugin), and npm. Supabase, PostgreSQL, and pgvector are the **intended** data stack; they are **not in this tree yet** (`.cursor/rules/preishare.mdc`; `AGENTS.md`; `docs/onboarding/repo-map.md` §1, §4).


| **Technology**                       | **In this checkout?** | **Config / wiring (from the repo-map)**                                                                                                                                         |
| ------------------------------------ | --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **TypeScript**                       | Yes                   | `tsconfig.json` (strict mode; unused-local is a compiler flag, not ESLint)                                                                                                      |
| **TanStack Start + React Router**    | Yes                   | `vite.config.ts` (Start + React plugins); `tsr.config.json` (`"target": "react"`); router factory `src/router.tsx`; file routes `src/routes/`; generated `src/routeTree.gen.ts` |
| **React**                            | Yes                   | Same as above; UI in `src/components/`                                                                                                                                          |
| **Vite**                             | Yes                   | `vite.config.ts`; scaffold metadata `.cta.json`                                                                                                                                 |
| **Tailwind**                         | Yes (plugin in Vite)  | `vite.config.ts`; tokens/styles in `src/styles.css`                                                                                                                             |
| **npm**                              | Yes (use this)        | `package.json`, `package-lock.json`. Do not treat a leftover `"pnpm"` block in `package.json` as the package manager.                                                           |
| **Supabase / PostgreSQL / pgvector** | **Not found yet**     | No `supabase/` folder, no `@supabase` dependency, no `src/lib/supabase.ts`. `src/lib/user.ts` is a UI stub, not a DB client.                                                    |


Related but not a first-feature surface: `vite.config.ts`, `tsr.config.json`, `.cta.json`, `package-lock.json` (`docs/onboarding/repo-map.md` §5). There is **no** project ESLint / Prettier / Biome config, **no** `.github/` CI, **no** `.env.example`, and **no** `lint` / `format` / `typecheck` / `test` scripts — only `dev`, `build`, `preview`, `generate-routes`. I don’t know a separate Tailwind config filename beyond `vite.config.ts` and `src/styles.css` as listed in the map.

- Expected (TypeScript, TanStack Start, React, Supabase, etc. as in repo):

It knows of Supabase but didn't find it in the checkout. Maybe I will need to set that up in a later step? I havent really touched Supabase yet so maybe that will tie in later.

- Result:

Pass

## Context gaps fixed

No gaps; all four passed on first run.

## Re-verification

N/A

## Go / no-go

**Decision:** GO for using this AI tooling on the first contribution.

**Rationale (2–4 sentences):** These four prompts are a smoke test that an agent actually loads `.cursor/rules/preishare.mdc`, `AGENTS.md`, and `docs/onboarding/repo-map.md` instead of inventing a generic app layout. They hit the map’s four highest-risk onboarding facts: this is a single root app (`src/routes/`, `src/router.tsx`, `src/components/`; no `apps/` or `packages/`), secrets stay out of git (`.gitignore` lists `.env`; there is no `.env.example`), a first change stays in `docs/onboarding/` and does not refactor `src/` unless tasked, and the in-tree stack is TypeScript / TanStack Start / React / Vite (`tsconfig.json`, `vite.config.ts`, `tsr.config.json`) while Supabase is documented as not present yet. If those answers cite those paths and refuse to guess missing files, the project rules and repo-map are doing their job.

**Signed off by:** Brayden Shoemaker