<!-- intent-skills:start -->
## Skill Loading

Before editing files for a substantial task:
- Run `npx @tanstack/intent@latest list` from the workspace root to see available local skills.
- If a listed skill matches the task, run `npx @tanstack/intent@latest load <package>#<skill>` before changing files.
- Use the loaded `SKILL.md` guidance while making the change.
- Monorepos: when working across packages, run the skill check from the workspace root and prefer the local skill for the package being changed.
- Multiple matches: prefer the most specific local skill for the package or concern you are changing; load additional skills only when the task spans multiple packages or concerns.
<!-- intent-skills:end -->

# PREIshare

Agents: follow [`.cursor/rules/preishare.mdc`](.cursor/rules/preishare.mdc) as the source of truth for stack names, where to work, and the do-not list. If this file drifts from the rules file, prefer the rules file.

PREIshare is a real-estate intelligence product. This checkout is a **single-package npm app** at the repo root (`src/`), not a monorepo. Intended stack (do not substitute): TypeScript; TanStack Start + React; Vite; backend/data Supabase, PostgreSQL, pgvector (intended, **not in this tree yet**); collaboration via Git + GitHub pull requests (fork → feature branch → PR; do not push to the team repo). Prefer existing patterns over greenfield frameworks.

Onboarding (read before editing):

- [docs/onboarding/](docs/onboarding/)
- [docs/onboarding/repo-map.md](docs/onboarding/repo-map.md)
- [docs/onboarding/team-orientation-notes.md](docs/onboarding/team-orientation-notes.md)
- [docs/onboarding/setup-log.md](docs/onboarding/setup-log.md)
- [README.md](README.md)

## Safety boundaries (same as the rules file)

Never commit `.env`, API keys, tokens, or connection strings (`.env` is gitignored; there is no `.env.example`). Never paste secrets into docs, rules, chat, or the setup-log. Do not invent credentials or touch production databases (none are wired in this checkout). If a change needs configuration, document the variable **name** only, never a real value.

**Never delete files without explicit permission.** Do not `git rm` or drop tracked files to slim a PR unless the user names those paths and asks to delete them. If the PR is too large, name every path in the description or wait for permission—do not remove existing work from the branch.

**Avoid unless explicitly tasked:** `src/routes/`, `src/components/`, `src/router.tsx`, `vite.config.ts`, `src/routeTree.gen.ts` (generated — never hand-edit), `package.json` / `package-lock.json` deps, inventing `.github/` CI, auth, payments, migrations, vector/search core.
