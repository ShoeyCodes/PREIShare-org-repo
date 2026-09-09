# Review response notes — first PREIshare PR

## PR under review

- Branch name: `docs/first-contribution-brayden`
- PR title (after any edits): Docs/first contribution brayden (GitHub title not renamed in the follow-up)
- Link or local identifier: [https://github.com/EdTechForLearning/PREIShare-org-repo/pull/8](https://github.com/EdTechForLearning/PREIShare-org-repo/pull/8)
- Related files: full onboarding set plus first-contribution docs (see test plan in `docs/onboarding/pr-description.md`)

## Simulated reviewer setup

- Tool used (chat-assistant / coding-agent): coding-agent (Cursor) acting as PREIshare mentor reviewer
- What context I pasted for the reviewer: the PR description, `CONTRIBUTORS.md`, and `docs/onboarding/first-contribution-notes.md`
- Date of simulation: 2026-09-08

## Feedback received

### Comment 1

- **Theme:** scope
- **Blocking?** yes (mismatch between description and Files changed)
- **Reviewer said:** Own every path GitHub will merge, or rebase; do not pretend a four-file PR if org `main` would receive fork-only onboarding.
- **My decision:** accept-now (honesty) / **decline deletion**
- **Why:** Slimming the PR by `git rm` on onboarding docs was wrong. Those files were created on purpose. The right fix is to **name** them in the test plan.
- **Action taken:** Restored files from fork `main`. Updated PR description to list the live paths. Added a no-delete-without-permission rule.
- **Evidence:** Restored `.cursor/rules/preishare.mdc`, `AGENTS.md` (fork version), `docs/onboarding/ai-tooling-verification.md`, `docs/onboarding/repo-map.md`, `docs/onboarding/setup-log.md`, `docs/onboarding/team-orientation-notes.md`, `docs/root-inventory.md`.

### Comment 2

- **Theme:** PR clarity
- **Blocking?** yes
- **Reviewer said:** Test plan must match Files changed; do not pre-check reviewer boxes.
- **My decision:** accept-now
- **Why:** Same rule after restore: the committed test plan must list the restored files too.
- **Action taken:** Rewrote `docs/onboarding/pr-description.md` test plan to the full path list; reviewer boxes unchecked.
- **Evidence:** Test plan step 1 in `pr-description.md`.

### Comment 3

- **Theme:** verification
- **Blocking?** yes
- **Reviewer said:** Notes must describe the PR vs org `main`.
- **My decision:** accept-now
- **Why:** Cycle 4’s “four files only” was a deletion strategy; Cycle 5 records restore and the full list.
- **Action taken:** Rewrote `docs/onboarding/first-contribution-notes.md` final diff summary.
- **Evidence:** Cycle 4 (mistaken deletion) and Cycle 5 (restore) in that file.

### Comment 4

- **Theme:** commits
- **Blocking?** no
- **Reviewer said:** History vs org `main` is noisy.
- **My decision:** accept-later
- **Why:** Restore adds another commit; squash is still optional and was not requested.
- **Action taken:** none
- **Evidence:** N/A

### Comment 5

- **Theme:** other (`CONTRIBUTORS.md` nits)
- **Blocking?** no
- **Reviewer said:** Optional handle/name format nits.
- **My decision:** decline
- **Why:** Briefing asked for Brayden and `@ShoeyCodes`.
- **Action taken:** none
- **Evidence:** N/A

## Follow-up commits (if any)

| Commit message | Files touched | Addresses which comment # |
| --- | --- | --- |
| Limit PR #8 to the four first-contribution docs. | **Mistaken deletes** — restored later | 1 (wrong tactic) |
| Record how mentor review comments were resolved. | Added `review-response-notes.md` | 1–5 audit trail |
| (pending) Restore onboarding files; no-delete rule; honest test plan | Restored six docs + rules + `AGENTS.md`; updated description and notes | 1, 2, 3 |

## PR description edits (if any)

- Sections changed: Approach, test plan (full path list), notes
- Before → after: Four-path (or five-path) claims after deletion → full vs-org-`main` list with files restored
- Why: A reviewer can execute Files changed without discovering missing onboarding docs or a lying four-file plan

## Re-verification checklist

- [x] Still on the same feature branch (not main)
- [ ] Latest commits pushed; PR shows restored files on Files changed
- [x] Diff-scope checkbox means: **the list in `pr-description.md`**, not “four files”
- [x] No secrets, .env values added
- [ ] Manual Files changed check after push
- [x] Blocking comments: description/files mismatch resolved by restore + honest list (not by delete)
- [x] Non-blocking items parked or declined

## Merge-readiness statement

**Not yet** until the restore is committed and pushed and GitHub Files changed matches the full list in `pr-description.md`. This PR is an onboarding bundle into org `main` (contributors row plus the docs and agent rules that were only on the fork), not a four-file slimming exercise. A human mentor should confirm no runtime `src/` edits, no secrets, and that nothing from this onboarding set is missing. Do not delete those files again without explicit permission.

## What I learned about review culture

- One habit I will keep: If Files changed and the test plan disagree, **change the plan** (or get permission) — do not delete the author’s files to force a match.
- One mistake I will avoid next time: Using `git rm` to “fix scope” without being asked to delete those paths.
