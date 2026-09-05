# First contribution plan — PREIshare onboarding

## Author
- Name / GitHub handle: Brayden Shoemaker / [ShoeyCodes](https://github.com/ShoeyCodes)
- Feature branch: `docs/first-contribution-brayden`
- Date: 2026-09-05

## One-sentence goal
Add myself as a new contributor in a contributors doc and make one minimal, reviewable docs (or agreed low-risk UI) touch so the team can practice review on a small first PR.

## Why this surface (link to prior artifacts)
- From [`docs/onboarding/repo-map.md`](repo-map.md): Safe first-touch is `docs/onboarding/` (docs-only, helps the team onboard) and this map file itself (“Map only; no runtime”). The map also records that no `CONTRIBUTORS` file is present yet, so creating `CONTRIBUTORS.md` plus a one-line map update keeps the inventory true without entering `src/`.
- From [`docs/onboarding/team-orientation-notes.md`](team-orientation-notes.md): First-PR definition of done requires a change that is scoped (onboarding docs or a contributors list, not a rewrite), isolated on a feature branch, described, reviewable in a short PR, self-verified, and aligned with conventions already captured in the repo map and AI rules.
- From [`docs/onboarding/ai-tooling-verification.md`](ai-tooling-verification.md): Tooling smoke tests ST1–ST4 passed and the go/no-go decision is **GO** for using this AI tooling on the first contribution; agent rules are verified enough to assist implementation next, still constrained to the files in this plan.

## In scope (only these)
1. Create or update `CONTRIBUTORS.md` with my name, GitHub handle, and a one-line role (e.g. "Onboarding engineer").
2. Optional second touch (pick at most one, or none):
   - Tiny docs fix already identified as safe in the repo-map: edit [`docs/onboarding/repo-map.md`](repo-map.md) so the “No `CONTRIBUTORS` file is present in this clone” note matches the new file (one-line inventory correction only).
   - Not chosen: UI copy/comment in `src/` (repo-map lists `src/routes/`, `src/components/`, and related app files as do-not-edit-yet).
3. Capture implementation notes later in `docs/onboarding/first-contribution-notes.md` (next step—not done here).

## Out of scope (explicitly not this PR)
- Auth, sessions, or environment secrets
- Database schema, migrations, Supabase policies, or pgvector changes
- Dependency upgrades or lockfile churn unrelated to the contribution
- Multi-package refactors, renames, or formatting the whole repo
- CI/CD workflow edits unless a mentor explicitly assigns them
- App core: `src/routes/`, `src/components/`, `src/router.tsx`, `vite.config.ts`, `src/routeTree.gen.ts`, `package.json` / `package-lock.json` deps, `.cursorrules` / `AGENTS.md`

## Likely files to change
| File | Action | Why |
|------|--------|-----|
| CONTRIBUTORS.md | create | Add my contributor entry (name, GitHub handle, one-line role) |
| docs/onboarding/repo-map.md | edit | One-line correction so the map no longer claims CONTRIBUTORS is absent |
| docs/onboarding/first-contribution-notes.md | create (next step) | Record what the agent did and what I verified |

This planning step only adds `docs/onboarding/first-contribution-plan.md`. Implementation of the table above is the next step.

## Acceptance criteria
- [ ] I am on feature branch `docs/first-contribution-brayden` (not the default branch).
- [ ] `CONTRIBUTORS.md` lists my name and GitHub handle in a consistent format.
- [ ] Any second touch is limited to `docs/onboarding/repo-map.md` and does not change behavior beyond copy/docs.
- [ ] No secrets, `.env` files, or generated build artifacts are included.
- [ ] A teammate can review the diff in under 10 minutes without product-context deep dives.

## Verification plan (how I will know it worked)
1. `git status` / `git branch` show I am on `docs/first-contribution-brayden` with only expected files modified.
2. Open `CONTRIBUTORS.md` and confirm my row/section renders as plain Markdown.
3. No UI touch is included, so skip the app `dev` command; confirm the repo-map sentence about `CONTRIBUTORS.md` matches the tree.
4. Skim `git diff` and confirm nothing outside the likely-files table appears (plus this plan file if it is still uncommitted from the planning step).

## Risks and mitigations
- Risk: Agent expands scope into app core. Mitigation: refuse diffs that touch files not listed above; re-prompt with the out-of-scope list.
- Risk: Editing default branch by mistake. Mitigation: check `git branch` before every edit session.
- Risk: Creating `CONTRIBUTORS.md` while older onboarding notes said not to invent that file. Mitigation: this plan is the explicit task; keep the file to a short contributor list and update the repo-map line so docs stay consistent.

## Definition of done for this planning step
- [x] Feature branch created from updated default branch (`docs/first-contribution-brayden`).
- [x] This plan file saved at `docs/onboarding/first-contribution-plan.md` with all sections filled (no angle-bracket placeholders left).
- [x] Ready to implement in the next step without re-deciding scope.
