# Pull request description — first PREIshare contribution

**PR URL:**  https://github.com/EdTechForLearning/PREIShare-org-repo/pull/8
**Base repository:** EdTechForLearning/PREIShare-org-repo
**Base branch:** main
**Head repository (my fork):** ShoeyCodes/PREIShare-org-repo
**Compare branch:** docs/first-contribution-brayden
**Author:** Brayden / ShoeyCodes
**Date opened:** 2026-09-07

## Problem

PREIshare had no clear, reviewed onboarding contribution from this engineer yet.
The team needs a small, low-risk change that proves the Git → review → merge path works
for a new teammate without touching product runtime code.

## Approach

- Added a personal entry to `CONTRIBUTORS.md` following the repo’s existing format (name Brayden, GitHub `@ShoeyCodes`, role Onboarding engineer, onboarded 2026-09-07).
- Kept the change scoped to documentation only (no app, package, or config runtime edits). Optional `docs/onboarding/repo-map.md` one-liner was skipped this cycle.
- Followed the plan in `docs/onboarding/first-contribution-plan.md` and implementation notes in
`docs/onboarding/first-contribution-notes.md`.



## What reviewers should look at

- [x] `CONTRIBUTORS.md` — new entry is accurate, formatted like neighbors, and free of secrets
- [x] Diff contains only intended files (no accidental `.env`, build output, or editor junk)
- [x] Commit message explains *why* this onboarding change exists
- [x] Intended paths on this feature branch: `CONTRIBUTORS.md`, `docs/onboarding/first-contribution-plan.md`, `docs/onboarding/first-contribution-notes.md`, and this description file



## Test plan

1. Open the Files changed tab and confirm only the expected path(s) appear.
2. Skim `CONTRIBUTORS.md` in the PR diff: name/link/role lines render as valid Markdown.
3. Search the diff for tokens, passwords, or local absolute paths — expect none.
4. (Optional) Check out the branch locally and open `CONTRIBUTORS.md` in a Markdown preview.



## Screenshots / notes

No UI screenshots (docs-only change).  
Implementation decisions and verification notes: see `docs/onboarding/first-contribution-notes.md`.  
Cross-fork fields: base `EdTechForLearning/PREIShare-org-repo` `main` ← head `ShoeyCodes/PREIShare-org-repo` `docs/first-contribution-brayden` (do not open the PR against the fork’s own `main`).

## Checklist before requesting review

- [x] Feature branch is pushed and up to date with this description
- [x] PR title is specific (not “update” or “fixes”)
- [x] Description states problem, approach, and test plan
- [x] I can explain every staged line if a reviewer asks