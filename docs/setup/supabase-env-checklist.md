# Supabase environment setup checklist (PREIshare Sprint 4)

## Purpose

Configure the Supabase URL and keys for the TanStack Start dashboard so sponsors can authenticate and listings can load from Postgres without shipping the service-role secret to the browser.

## Source requirements

See `docs/requirements/sponsor-auth-and-listings-brief.md` (auth, listings, and the server-only boundary).

This sprint needs three capabilities:

- Project URL (browser-safe when prefixed `VITE_`)
- Anon / publishable key (browser-safe when prefixed `VITE_`; still obeys row-level security)
- Service-role key (server-only; bypasses row-level security)

## Supabase project

- [ ] Supabase project created (or selected) for PREIshare
- [ ] Open **Project Settings → API**
- [ ] Copy the project URL
- [ ] Copy the anon / publishable key
- [ ] Copy the service_role key and store it only in a local untracked env file
- [ ] Store the database password in a password manager (not in the repo)

## Repo files

- [ ] `.env.example` is committed with placeholder values only
- [ ] Copy `.env.example` to `.env.local` (or `.env`) and fill in real values yourself
- [ ] `.gitignore` ignores `.env`, `.env.*` except `.env.example`, and `*.local` (that covers `.env.local`)
- [ ] `git status` does not list the real env file as a file to add

## Public vs server-only rules

This Vite template only exposes variables whose names start with `VITE_` to browser code.

- [ ] Browser-safe names are `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`
- [ ] `SUPABASE_SERVICE_ROLE_KEY` has no `VITE_` prefix
- [ ] No file under `src/` that runs in the browser reads `SUPABASE_SERVICE_ROLE_KEY`
- [ ] This checklist and `.env.example` contain zero real key material

## Smoke checks before feature work

- [ ] Restart the dev server after creating or editing the local env file
- [ ] The app still starts
- [ ] Search the repo for the real service_role key string — zero hits in tracked files

## Handoff notes

Hosting needs the same split: public `VITE_` vars for the client build, and `SUPABASE_SERVICE_ROLE_KEY` only in server secret storage.

Later steps in this sprint can use these same names for the data model, migrations, row-level security, and Supabase clients. This checklist does not add login screens or tables.
