# Review response notes — first PREIshare PR

## PR under review
- Branch name: `docs/first-contribution-brayden`
- PR title (after any edits): Docs/first contribution brayden (GitHub title not renamed in the follow-up)
- Link or local identifier: https://github.com/EdTechForLearning/PREIShare-org-repo/pull/8
- Related files: CONTRIBUTORS.md, docs/onboarding/pr-description.md, docs/onboarding/first-contribution-notes.md (also in the intended merge: `docs/onboarding/first-contribution-plan.md`)

## Simulated reviewer setup
- Tool used (chat-assistant / coding-agent): coding-agent (Cursor) acting as PREIshare mentor reviewer
- What context I pasted for the reviewer: the PR description (problem / approach / reviewer checklist / test plan), plus `CONTRIBUTORS.md` and `docs/onboarding/first-contribution-notes.md`
- Date of simulation: 2026-09-08

## Feedback received

### Comment 1
- **Theme:** scope
- **Blocking?** yes
- **Reviewer said:** Files changed against org `main` was not the four docs in the test plan. It also included fork-only onboarding (`.cursor/rules/preishare.mdc`, `AGENTS.md`, `repo-map.md`, `setup-log.md`, `team-orientation-notes.md`, `ai-tooling-verification.md`, `docs/root-inventory.md`). Notes even listed `AGENTS.md` as intentionally not changed. Merge as written would ship the whole fork-only pile. Rebase onto `upstream/main` or own every path GitHub would merge.
- **My decision:** accept-now
- **Why:** The test plan and first-PR definition of done require a tiny, reviewable merge into the org repo. Extra fork files were out of this PR’s stated scope.
- **Action taken:** follow-up commit on the same feature branch (no second PR). Restored `AGENTS.md` to `upstream/main`; removed the fork-only paths from this branch (they remain on fork `main`).
- **Evidence:** `47744ce` — “Limit PR #8 to the four first-contribution docs.” After that commit, `git diff --name-only upstream/main...HEAD` is only `CONTRIBUTORS.md`, `docs/onboarding/first-contribution-notes.md`, `docs/onboarding/first-contribution-plan.md`, `docs/onboarding/pr-description.md`.

### Comment 2
- **Theme:** PR clarity
- **Blocking?** yes
- **Reviewer said:** Test plan step 1 (“confirm only the expected path(s) appear”) failed on the live Files changed tab. “What reviewers should look at” boxes were pre-checked by the author. Description and merge must match.
- **My decision:** accept-now
- **Why:** A reviewer cannot execute a test plan that contradicts GitHub. Reviewer checkboxes are for the reviewer.
- **Action taken:** edit PR description file (`docs/onboarding/pr-description.md`) in the same follow-up commit; unchecked reviewer items; named the four intended paths; recorded that fork-only files were dropped from this branch.
- **Evidence:** Approach now says fork-only onboarding was dropped from this branch; test plan step 1 asks for those four paths only; reviewer boxes are unchecked.

### Comment 3
- **Theme:** verification
- **Blocking?** yes
- **Reviewer said:** `first-contribution-notes.md` claimed only `CONTRIBUTORS.md` and the notes file changed, and “Only in-scope files modified” was checked. That was true versus fork `main`, not versus org `main`. Update notes and re-verify on the GitHub diff.
- **My decision:** accept-now
- **Why:** Verification has to describe the PR a teammate will merge, not a local cycle against the wrong base.
- **Action taken:** follow-up commit updated Cycle 4 and the final diff summary to list org-`main` paths and the trim.
- **Evidence:** Notes Cycle 4 documents restore/remove; final diff summary lists the four merge paths and says `AGENTS.md` was restored to org `main`.

### Comment 4
- **Theme:** commits
- **Blocking?** no
- **Reviewer said:** History vs org `main` is many commits (including auth/Supabase subjects and a long PR-description update). Squash or rewrite onto `upstream/main` so log matches the four-doc story. Non-blocking if the tree is honest.
- **My decision:** accept-later
- **Why:** The follow-up already made the **tree** match the test plan. Rewriting/squashing published history is a separate, riskier step and was labeled non-blocking.
- **Action taken:** none (no squash/rebase). Notes call out that commit subjects may still look noisy.
- **Evidence:** N/A for a squash. Parked in notes Risks: “Squash is optional; the tree for this merge should now be the four docs only.”

### Comment 5
- **Theme:** other (`CONTRIBUTORS.md` nits)
- **Blocking?** no
- **Reviewer said:** Table row (Brayden / `@ShoeyCodes` / Onboarding engineer / 2026-09-07) is valid Markdown and has no secrets. Optional: drop `@` or use full name `Brayden Shoemaker`.
- **My decision:** decline
- **Why:** The scaffold and briefing asked for display name Brayden and `@ShoeyCodes`. Changing handle format is cosmetic and not required for merge.
- **Action taken:** none
- **Evidence:** N/A — `CONTRIBUTORS.md` row left as accepted in Cycle 1.

## Follow-up commits (if any)
| Commit message | Files touched | Addresses which comment # |
| --- | --- | --- |
| Limit PR #8 to the four first-contribution docs. | Restored `AGENTS.md`; removed `.cursor/rules/preishare.mdc`, `docs/onboarding/ai-tooling-verification.md`, `docs/onboarding/repo-map.md`, `docs/onboarding/setup-log.md`, `docs/onboarding/team-orientation-notes.md`, `docs/root-inventory.md`; updated `docs/onboarding/first-contribution-notes.md`, `docs/onboarding/pr-description.md` | 1, 2, 3 |

Comment 4 parked (squash later). Comment 5 declined (roster format).

## PR description edits (if any)
- Sections changed (summary / test plan / risk / other): Approach, What reviewers should look at, Test plan (reviewer boxes unchecked)
- Before → after (short paraphrase is fine): Before: implied only four files while org Files changed had ~11 paths, and reviewer boxes were already checked. After: states fork-only files were removed from this branch; lists the four org-merge paths; test plan matches that list.
- Why the edit helps a reviewer: They can use Files changed as written instead of discovering extra scope the description denied.

## Re-verification checklist
- [x] Still on the same feature branch (not main)
- [x] Latest commits pushed; PR shows updated head (`47744ce` on `origin/docs/first-contribution-brayden`)
- [x] Diff includes only intended onboarding files (vs `upstream/main`: the four docs above)
- [x] No secrets, .env values, or machine-specific paths added
- [ ] Manual or scripted checks claimed in the PR still pass (refresh GitHub Files changed after this notes file is committed/pushed)
- [x] Blocking comments all have a written resolution
- [x] Non-blocking items either fixed or parked with a reason

## Merge-readiness statement
From a beginner-onboarding perspective, the **content** of this PR is now the small docs merge we claimed: a contributors row plus plan, notes, and PR description, with no app/runtime edits. A human mentor should still open PR #8 Files changed after the latest push (including this notes file if it is added) and confirm no fork-only paths returned. They should also decide whether noisy commit subjects need a squash before merge, and whether the GitHub PR title should be renamed from the auto branch-style title. Simulated “Request changes” was not submitted on GitHub (signed out / same author); the written comments live in chat and in this file.

## What I learned about review culture
- One habit I will keep: Compare the feature branch to **org** `main` (`upstream`), not only to my fork’s `main`, before I write a test plan.
- One mistake I will avoid next time: Pre-checking reviewer boxes and describing a four-file PR when GitHub would merge a larger fork delta.
