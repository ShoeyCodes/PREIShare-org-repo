# Pull request description — first PREIshare contribution

**PR URL:** https://github.com/EdTechForLearning/PREIShare-org-repo/pull/8
**Base repository:** EdTechForLearning/PREIShare-org-repo
**Base branch:** main
**Head repository (my fork):** ShoeyCodes/PREIShare-org-repo
**Compare branch:** docs/first-contribution-brayden
**Author:** Brayden / ShoeyCodes
**Date opened:** 2026-09-07

## Problem
PREIshare had no clear, reviewed onboarding contribution from this engineer yet.
The team needs a reviewed change that proves the Git → review → merge path works
for a new teammate without touching product runtime code.

## Approach
- Added a personal entry to `CONTRIBUTORS.md` (Brayden, `@ShoeyCodes`, Onboarding engineer, 2026-09-07).
- Kept product runtime out of the change (no `src/` app, package, or lockfile edits).
- Onboarding docs created during setup (repo-map, setup-log, orientation, AI tooling verification, inventory, agent rules) stay on this branch. They must not be deleted to “slim” the PR.
- Plan, implementation notes, PR description, and review-response notes document the cycles.

## What reviewers should look at
- [ ] `CONTRIBUTORS.md` — new entry is accurate, formatted like neighbors, and free of secrets
- [ ] Diff contains no accidental `.env`, build output, or editor junk
- [ ] Intended paths vs org `main` match Files changed (list below)
- [ ] Commit messages explain *why* (history may still include older subjects)

## Test plan
1. Open Files changed and confirm **exactly** these paths (no extras, none missing):
   - `.cursor/rules/preishare.mdc`
   - `AGENTS.md`
   - `CONTRIBUTORS.md`
   - `docs/onboarding/ai-tooling-verification.md`
   - `docs/onboarding/first-contribution-notes.md`
   - `docs/onboarding/first-contribution-plan.md`
   - `docs/onboarding/pr-description.md`
   - `docs/onboarding/repo-map.md`
   - `docs/onboarding/review-response-notes.md`
   - `docs/onboarding/setup-log.md`
   - `docs/onboarding/team-orientation-notes.md`
   - `docs/root-inventory.md`
2. Skim `CONTRIBUTORS.md`: name/handle/role/date render as valid Markdown.
3. Search the diff for tokens, passwords, or local absolute paths — expect none in secrets; setup-log may contain a local clone path (not a credential).
4. Confirm no files from this onboarding set were deleted in the latest commits.

## Screenshots / notes
No UI screenshots (docs-only). See `docs/onboarding/first-contribution-notes.md` and `docs/onboarding/review-response-notes.md`.
Cross-fork: base `EdTechForLearning/PREIShare-org-repo` `main` ← head `ShoeyCodes/PREIShare-org-repo` `docs/first-contribution-brayden`.

## Checklist before requesting review
- [ ] Feature branch is pushed and up to date with this description
- [x] PR title is specific (not “update” or “fixes”)
- [x] Description states problem, approach, and test plan
- [x] I can explain every staged line if a reviewer asks
