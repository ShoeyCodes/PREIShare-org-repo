# PREIshare onboarding handoff

**Author:** Brayden Shoemaker (`@ShoeyCodes`)  
**Date:** 2026-09-08  
**Branch / PR:** `docs/first-contribution-brayden` — https://github.com/EdTechForLearning/PREIShare-org-repo/pull/8  
**Audience:** mentor, future self, sprint lead

## 1. Stakeholder summary (plain language)

I completed PREIshare engineering onboarding for Sprint 1 (dev environment and AI tooling). I forked the team repository, cloned my fork, wired up origin and upstream, verified my local toolchain, configured Cursor-style project rules and agent memory, mapped the repo well enough to choose a safe first contribution, and opened (or prepared) a small pull request that follows the team’s Git and review habits. PREIshare remains a real-estate intelligence product; this work does not ship a product feature—it proves I can join the team workflow safely.

From `docs/onboarding/team-orientation-notes.md` §1: “PREIshare is a real-estate intelligence product. It helps people make better real-estate decisions by turning property and market data into clear intelligence.” Sprint 1 stops at clone, remotes, AI rules, and a first reviewed change—not a shipping feature.

**Done meaning (orientation, §4):** “My first reviewed PR is done only when all of the following are true:” scoped, isolated on a feature branch, described, reviewable, self-verified, and aligned with repo-map / AI rules. That is the bar this handoff uses—not “I wrote a product feature.”

**Definition of done met:**
- [x] Fork created, local clone of my fork, both remotes and toolchain verified (see setup log)
- [x] AI rules / project memory in place and smoke-tested
- [x] First contribution implemented and committed on a feature branch
- [ ] PR opened (or description ready) and review feedback addressed

PR **#8 is open**. Simulated review comments were answered in `docs/onboarding/review-response-notes.md`. Merge is **not claimed**: that file still leaves GitHub Files changed unchecked after the restore (see §5–§6).

## 2. Deliverables index (what exists and where)

| Artifact | Path | Why it matters |
| --- | --- | --- |
| Team orientation notes | docs/onboarding/team-orientation-notes.md | Mission, workflow, first-PR definition of done |
| Setup log | docs/onboarding/setup-log.md | Auditable proof of accounts, fork, Git identity, clone, remotes |
| Repo map | docs/onboarding/repo-map.md | Safe contribution surfaces (apps, packages, config) |
| AI tooling verification | docs/onboarding/ai-tooling-verification.md | Evidence agents respect PREIshare stack/conventions |
| Project rules | .cursor/rules/preishare.mdc | Persistent IDE-agent constraints |
| Agent memory entrypoint | AGENTS.md | Cross-tool project context for coding-agents |
| First contribution plan | docs/onboarding/first-contribution-plan.md | Scoped plan before code |
| Contribution notes | docs/onboarding/first-contribution-notes.md | What changed and why |
| Contributors credit | CONTRIBUTORS.md | Visible first contribution surface |
| PR description | docs/onboarding/pr-description.md | Reviewer-facing summary |
| Review response notes | docs/onboarding/review-response-notes.md | How feedback was handled |
| This handoff | docs/onboarding/onboarding-handoff.md | Single entry point for mentors |

## 3. Environment and toolchain snapshot

Copy only facts you verified in setup-log.md (do not invent versions):

- OS: macOS (`docs/onboarding/setup-log.md` header)
- Git user.name / user.email configured: yes (`setup-log.md` §2 Identity configured: PASS; recorded as Brayden / braydenshoe@gmail.com; git version `2.50.1 (Apple Git-155)`)
- Node / package manager versions: TODO — `setup-log.md` does not record Node or npm versions. `docs/onboarding/repo-map.md` §5 names **npm** + `package-lock.json` as the package manager (do not treat leftover `"pnpm"` in `package.json` as the manager).
- origin (my fork) URL: `https://github.com/ShoeyCodes/PREIShare-org-repo` (`setup-log.md` §4 `git remote -v`)
- upstream (team repo) URL: https://github.com/EdTechForLearning/PREIShare-org-repo
- Install/build/test commands run and result: TODO — `setup-log.md` does not record `npm install`, `npm run dev`, `npm run build`, or a test run. Repo-map §5 lists scripts `dev`, `build`, `preview`, `generate-routes` and **no `test` script**. First-contribution verification skipped `dev` because the change is docs-only (`first-contribution-plan.md` verification plan step 3).
- Blockers hit and how resolved: none recorded (`setup-log.md` §7 Issues table is empty). Clone method HTTPS; auth via osxkeychain / credential helper (PASS). Ready-for-next-step: YES (`setup-log.md` §8).

## 4. AI tooling posture

- Rules file purpose (one sentence): from `.cursor/rules/preishare.mdc` — persistent constraints so agents treat PREIshare as a real-estate intelligence product in a **single-package npm app** at `src/`, use the named stack, stay in Safe first-touch unless tasked, and never invent paths missing from `docs/onboarding/repo-map.md`.
- AGENTS.md purpose (one sentence): cross-tool entrypoint that points agents at `.cursor/rules/preishare.mdc`, onboarding docs, secrets/delete rules, and TanStack Intent skill loading before Start/Router work.
- Smoke-test prompt used and whether the agent correctly named stack pieces (TypeScript, TanStack Start, React, Supabase, PostgreSQL, pgvector): four smoke tests in `docs/onboarding/ai-tooling-verification.md` (ST1–ST4) all **pass**. ST4 table: TypeScript / TanStack Start + React / Vite / Tailwind / npm **in this checkout**; **Supabase / PostgreSQL / pgvector “Not found yet”** (no `supabase/` folder, no `@supabase` dependency, no `src/lib/supabase.ts`). Agent named those intended data tools and did not claim they were wired in-tree.
- Context gaps found and fixes applied (link to ai-tooling-verification.md): “No gaps; all four passed on first run.” Go/no-go: **GO** (`ai-tooling-verification.md` §§ Context gaps, Go / no-go).

## 5. First contribution and review outcome

- Plan goal (from first-contribution-plan.md): “Add myself as a new contributor in a contributors doc and make one minimal, reviewable docs (or agreed low-risk UI) touch so the team can practice review on a small first PR.”
- Files touched (e.g. CONTRIBUTORS.md, notes): vs org `main`, `first-contribution-notes.md` lists `.cursor/rules/preishare.mdc`, `AGENTS.md`, `CONTRIBUTORS.md`, `docs/onboarding/ai-tooling-verification.md`, `docs/onboarding/first-contribution-notes.md`, `docs/onboarding/first-contribution-plan.md`, `docs/onboarding/pr-description.md`, `docs/onboarding/repo-map.md`, `docs/onboarding/review-response-notes.md`, `docs/onboarding/setup-log.md`, `docs/onboarding/team-orientation-notes.md`, `docs/root-inventory.md`. No `src/` runtime. Optional repo-map one-liner was **skipped as an extra edit** (file kept). This handoff is new and is not yet on that list.
- PR title and link: Docs/first contribution brayden — https://github.com/EdTechForLearning/PREIShare-org-repo/pull/8 (`pr-description.md`; title note in `review-response-notes.md`)
- Review-style feedback received (summary): Simulated coding-agent mentor review on **2026-09-08**. Blocking: own every path org `main` would merge (do not pretend a four-file PR); test plan must match Files changed; notes must describe the PR vs org `main`. Non-blocking: noisy commit history (accept-later); `CONTRIBUTORS.md` nits (declined).
- Changes made in response: Restored onboarding files deleted in a mistaken “slim PR” cycle; rewrote the PR test plan to the full path list; added a no-delete-without-permission rule in `.cursor/rules/preishare.mdc` and `AGENTS.md`; recorded Cycles 4–5 in `first-contribution-notes.md`.
- Merge readiness: **blocked** — `review-response-notes.md` Merge-readiness: “**Not yet** until the restore is committed and pushed and GitHub Files changed matches the full list in `pr-description.md`.” Re-verification still unchecked: “Latest commits pushed; PR shows restored files on Files changed” and “Manual Files changed check after push.” Local git log on this branch includes restore commits; **GitHub Files changed after that push is not recorded as confirmed** (TODO if a mentor needs a live screenshot).

## 6. Open risks and environment gaps

List anything a mentor should know before assigning feature work:

1. **Supabase / PostgreSQL / pgvector are not in this checkout** (`repo-map.md` §4; rules file). No `.env.example`; do not invent credentials. Feature work that needs a live data stack is not locally configured.
2. **No project `test` script and no `.github/` CI** (`repo-map.md` §5). Sprint 1 did not record install/build/test results in the setup log. Do not treat this handoff as proof the app runs.
3. **PR #8 is not merge-ready in the notes.** Simulated review is documented; a human mentor still needs to confirm Files changed, no `src/` edits, no secrets, and that onboarding files were not deleted again.
4. **This first PR is larger than a four-file docs PR** because onboarding files lived only on the fork (`first-contribution-notes.md` risks). That is honest vs org `main`, not a product rewrite.

**One risk to carry:** do not assign product/UI work until a mentor confirms merge status of PR #8 and that the contributor will not delete files to “fix” scope.

If none, write "None known" and state what you would re-verify on day one of the next sprint.

(There are known gaps above.) Day-one re-verify anyway: remotes still origin=fork / upstream=team; rules files present; `npm` still the package manager; GitHub Files changed on PR #8 vs `pr-description.md` test plan.

## 7. Decisions log (for stakeholders)

| Decision | Choice | Rationale |
| --- | --- | --- |
| First contribution surface | `CONTRIBUTORS.md` (create) plus onboarding docs already on the fork; optional repo-map one-liner skipped | Plan: low risk, visible, matches orientation “onboarding docs or a contributors list.” Repo-map listed `docs/onboarding/` as Safe first-touch and noted no `CONTRIBUTORS` file yet. |
| Branch naming | `docs/first-contribution-brayden` | Named in `first-contribution-plan.md`; work stayed off `main` (fork → feature branch → PR). |
| AI tool category used most | coding-agent (Cursor IDE agent / CLI) | Repo-map mapper, AI smoke tests ST1–ST4, and simulated mentor review all recorded as `coding-agent` in those files. Fit: path-accurate questions against the real tree, then a small docs PR—not a chat-only essay. |

## 8. Next-sprint preview (what this unlocks)

The next sprint topic can assume:

1. **Trusted local environment** — clone + toolchain documented in setup-log.md; re-run only if OS or versions change. (Re-record Node/npm versions; they are still TODO in this handoff.)
2. **AI alignment** — .cursor/rules/preishare.mdc and AGENTS.md exist; extend rules when new packages appear, do not start from zero.
3. **Git habit** — feature branch → small commits → PR → respond to review is practiced once end-to-end.
4. **First PR path** — merge-ready or merged onboarding contribution; feature work should use the same PR quality bar. **Today: still blocked on Files changed confirmation** (see §5).

**What next sprint should not redo:** do not `git rm` onboarding (or any) files to slim a PR, and do not rewrite `.cursor/rules/preishare.mdc` / `AGENTS.md` from scratch. Cycle 4 in `first-contribution-notes.md` already proved deletion-as-scope-control is the wrong fix; name every path or wait for permission.

**Explicitly out of scope until later:** large product features, production deployments, and database migrations you have not been trained on yet.

## 9. Ask for mentor

- Questions still open:
  - Confirm GitHub Files changed on [PR #8](https://github.com/EdTechForLearning/PREIShare-org-repo/pull/8) matches the path list in `docs/onboarding/pr-description.md` (notes do not record that check as done).
  - From `repo-map.md` §7 (unchanged): Does a team-hosted Supabase / PostgreSQL / pgvector project exist outside this repo? Should this fork expect GitHub Actions later? Is the leftover `"pnpm"` block in `package.json` intentional?
- Review of this handoff requested: yes
- Preferred follow-up time or channel: TODO — not recorded in onboarding notes

---

*End of handoff. Keep this file updated if merge status or env gaps change before the next sprint starts.*
