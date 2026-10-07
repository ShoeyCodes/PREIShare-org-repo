# PREIshare Sponsor Auth & Property Listings — Security Requirements

This brief follows the client story in `docs/requirements/sponsor-auth-and-listings-brief.md`. PREIshare is a real-estate intelligence product. Sponsors need a secure way to sign in and manage real property listings stored in PostgreSQL. Secret keys stay on the server and never ship in the browser.

## 1. Context

PREIshare sponsors need a dashboard where they can sign in, view property listings they are allowed to manage, and add new properties. Data lives in Postgres via Supabase. Secret keys must never ship to the browser.

The dashboard is a TanStack Start app. Routes that show listings must know who is signed in. A listing belongs to one sponsor. Hiding a button is not enough. The database has to refuse a request from the wrong person.

## 2. Actors

| Actor | Description | Signed in? |
| --- | --- | --- |
| Anonymous visitor | Anyone who is not logged in. They may open the login and sign-up pages only. | No |
| Sponsor | A partner who creates an account and manages their own listings. | Yes (sponsor account) |
| Admin | An internal operator who would manage every sponsor. Admin features are out of scope for this topic. | N/A this sprint topic |

## 3. User stories (in scope)

1. As a **sponsor**, I can sign in with my email and password so the app knows who I am.
2. As a **sponsor**, I can see a list of **only my** properties after sign-in.
3. As a **sponsor**, I can create a new property that is owned by my account.
4. As an **anonymous visitor**, I can reach the login page, but I cannot open the dashboard or change listings.

## 4. Non-goals (out of scope this topic)

- Public (anonymous) create, update, or delete of properties. Visitors do not get write access.
- A public page where anyone can edit listings, including “read all published listings.”
- A full admin console, or a screen where one sponsor moderates another sponsor’s listings.
- Putting the Supabase **service-role** (secret) key in any client or browser bundle.
- Password-reset email polish, social login (Google, GitHub, and similar), or multi-factor auth.
- Payments, file uploads, and shared ownership of one listing by several sponsors.

## 5. Success criteria

- [ ] A sponsor can complete login and land on a protected dashboard route
- [ ] Unauthenticated users are blocked from dashboard and property routes
- [ ] The property list returns only rows the signed-in sponsor is allowed to see
- [ ] Creating a property associates the new row with the signed-in sponsor
- [ ] Browser-exposed config uses only public keys; secret keys stay in server environment variables
- [ ] Database access for listings is enforced with row-level security, not only by hiding buttons in the UI

## 6. Simple threat list

| Threat | What goes wrong | Requirement to mitigate |
| --- | --- | --- |
| Stolen or reused session | Someone else acts as the sponsor | Check the session on the server for protected routes. Sign-out clears the session. |
| Guessing another sponsor’s property id | Someone reads or edits a listing they do not own, just by knowing its id | Row-level security, and the server queries, must deny that access even when the id is known. |
| Leaked service-role key | Someone bypasses row-level security with a powerful key | Never put the service-role key in client code, Git commits, docs, or screenshots. Keep it in a server-only env var. |
| Security by hiding buttons | The screen hides Edit, but the API still allows the write | Enforce the rules in Postgres row-level security and on the server, not only in React. |
| Public write access | A visitor who is not signed in creates or changes a listing | No anonymous insert, update, or delete policy. Admin tools that write for every sponsor are out of scope. |

## 7. Environment & secret hygiene notes (requirements only)

Document names and purpose only. Do not write real key values, project URLs, or passwords into this file.

| Name | Who can see it | Purpose |
| --- | --- | --- |
| `VITE_SUPABASE_URL` | Browser (public) | Supabase project URL. Safe to ship when row-level security is on. |
| `VITE_SUPABASE_ANON_KEY` | Browser (public) | Anon or publishable key. It still obeys row-level security. It is not a bypass. |
| `SUPABASE_URL` | Server only | Optional copy of the project URL for server code. Not a secret by itself, but it is not required in the browser. |
| `SUPABASE_SERVICE_ROLE_KEY` | Server only | Bypasses row-level security. Never prefix this name with `VITE_`. Never read it from browser code. |

Real values belong in an untracked `.env` or `.env.local`. `.env.example` may list these names with placeholders only.

Later steps will create `.env.example` and the server and browser Supabase clients to match these rules.

## 8. Open questions for the team

- **Login method:** Email and password is the default for this topic. Magic links, social login, and multi-factor auth are out of scope.
- **Sponsor profile table:** These stories do not need a separate `sponsors` table. A listing’s `owner_id` is the signed-in user’s id from Supabase Auth (`auth.users`). A profile table can wait for a later data-model decision.

## 9. How later steps use this brief

This file is the contract for env separation, row-level security, login and dashboard routes, property list and create flows, and the end-to-end security verification checklist. Admin features and public write access stay out of that work.
