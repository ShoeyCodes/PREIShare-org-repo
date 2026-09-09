# First contribution implementation notes

## Plan reference
- Plan file: `docs/onboarding/first-contribution-plan.md`
- Feature branch: `docs/first-contribution-brayden`
- In-scope paths from plan: `CONTRIBUTORS.md` plus onboarding docs already on the fork; optional repo-map one-liner was skipped as an *edit*, not as a reason to delete the map

## Multi-cycle log

### Cycle 1 — CONTRIBUTORS.md
- Goal: Add my roster row only
- Files agent proposed: `CONTRIBUTORS.md`
- Review result: Accepted — single table row; Ada Example not copied in

### Cycle 2 — additional planned change (or "skipped")
- Goal: Optional one-line `docs/onboarding/repo-map.md` correction
- Review result: Skipped as an extra edit — **the file itself must remain**

### Cycle 3 — notes
- This file created to document the work for PR review

### Cycle 4 — mistaken deletion (do not repeat)
- Goal at the time: slim PR #8 vs org `main` by removing fork-only onboarding from this branch
- Files removed: `.cursor/rules/preishare.mdc`, `docs/onboarding/ai-tooling-verification.md`, `docs/onboarding/repo-map.md`, `docs/onboarding/setup-log.md`, `docs/onboarding/team-orientation-notes.md`, `docs/root-inventory.md`; `AGENTS.md` reverted to org `main`
- Review result: **Rejected by the author** — those files were onboarding work, not junk. Do not delete files without explicit permission.

### Cycle 5 — restore and own the live tab
- Goal: Put every deleted file back from fork `main` (`origin/main`) and stop using deletion to fix scope
- Files restored: the six paths above plus fork `AGENTS.md`
- Also: no-delete rule in `.cursor/rules/preishare.mdc` and `AGENTS.md`
- Review result: Accepted — PR description and notes now **name** the full Files changed list instead of deleting it

## Final diff summary
- Paths this PR should change vs `EdTechForLearning` `main`:
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
- Paths intentionally NOT in this merge: `src/`, auth/database runtime, `package.json` / lockfile (unless already identical to org `main`)

## Acceptance criteria checklist (from plan)
- [x] CONTRIBUTORS.md includes accurate name, GitHub, role, date
- [x] No secrets beyond what the team expects on GitHub
- [x] Notes explain agent cycles including the restore
- [ ] Re-check Files changed after restore is committed and pushed

## Risks / open questions
- This PR is larger than a four-file first PR; that is honest vs org `main` because onboarding files were never on the team repo.
- Commit `47744ce` still exists in history as the deletion; the restore commit should bring the files back on the tree.
- Fork `main` still has copies; this branch should match that onboarding set again plus first-contribution extras.
