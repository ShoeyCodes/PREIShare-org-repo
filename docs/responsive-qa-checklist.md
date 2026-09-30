# PREIshare dashboard — responsive QA checklist

**Tester:** Brayden Shoemaker
**Date:** 2026-09-29
**App URL tested:** http://localhost:3000/dashboard
**Build / branch:** `main` at `02a56a6`

## Breakpoints used

| Name    | Width  | How to set                          |
|---------|--------|-------------------------------------|
| Mobile  | 375px  | Devtools device toolbar             |
| Tablet  | 768px  | Devtools device toolbar             |
| Desktop | 1280px | Devtools device toolbar             |

## How to use this sheet

1. Load the dashboard route with the dev server running.
2. For each row, set the width, perform the check, mark **Pass** or **Fail**.
3. On Fail, write a short **Symptom** and which **file** you will ask the agent to touch.
4. After a targeted fix, re-test and update **Status** and **Fix notes**.
5. Critical rows must Pass (or be listed under Known limitations with stakeholder-safe wording).

---

## Mobile (~375px)

| ID | Check | Status (Pass/Fail) | Symptom / notes | Fix notes (prompt + files) |
|----|--------|--------------------|-----------------|----------------------------|
| M1 | No horizontal page scroll | Pass | Page stays within the viewport. |  |
| M2 | Header remains visible and usable | Pass | PREIshare header stays at the top. |  |
| M3 | Desktop sidebar is hidden or off-canvas (not permanently covering content) | Pass | Sidebar is hidden below the `md` breakpoint. |  |
| M4 | MobileNav or menu control is visible | Pass | Open menu button is visible. |  |
| M5 | Menu opens and closes navigation links | Pass | Button switches between Open menu and Close menu. Choosing a link closes the menu. |  |
| M6 | Main content readable without pinched text | Pass | Intro, cards, and empty messages wrap in normal type. |  |
| M7 | Metric cards stack in a single column (or intentional narrow grid) | Pass | One column at 375px. |  |
| M8 | PortfolioSummary does not overflow or clip | Pass | Empty message is fully visible. |  |
| M9 | RecentActivity list wraps; no cut-off timestamps/labels | Pass | Empty message wraps. No activity rows to clip. |  |
| M10 | Empty-state messaging (if shown) is fully visible | Pass | Holdings and activity empty messages are on screen. |  |

## Tablet (~768px)

| ID | Check | Status (Pass/Fail) | Symptom / notes | Fix notes (prompt + files) |
|----|--------|--------------------|-----------------|----------------------------|
| T1 | No horizontal page scroll | Pass | Page stays within the viewport. |  |
| T2 | Navigation pattern matches plan (sidebar, rail, or menu—not both fighting) | Pass | Sidebar is visible. Mobile menu is hidden. |  |
| T3 | Header + content spacing not cramped | Pass | Header and main content have clear separation. |  |
| T4 | Metric cards use a sensible 2-column (or planned) layout | Pass | Two columns from the `sm` breakpoint. |  |
| T5 | PortfolioSummary and RecentActivity share space without overlap | Pass | The two regions stack at 768px and do not overlap. |  |
| T6 | Touch targets / click targets large enough to use | Pass | Sidebar links and page controls are easy to select. |  |

## Desktop (~1280px)

| ID | Check | Status (Pass/Fail) | Symptom / notes | Fix notes (prompt + files) |
|----|--------|--------------------|-----------------|----------------------------|
| D1 | Sidebar visible and usable per architecture | Pass | Dark sidebar shows Home, Portfolio, Deals, and Profile. |  |
| D2 | MobileNav hidden or not duplicating full sidebar awkwardly | Pass | Open menu control is hidden. |  |
| D3 | Main region has comfortable padding/margins | Pass | Main content has padding inside the shell. |  |
| D4 | Metric cards align in a multi-column row as planned | Pass | Three columns from the `xl` breakpoint. |  |
| D5 | PortfolioSummary + RecentActivity sit in intended regions | Pass | Summary takes the wider column. Activity sits beside it. |  |
| D6 | Long labels/numbers do not break the header or sidebar width | Pass | Metric values are short placeholders. Sidebar width stays fixed. |  |

## Cross-cutting issues

| ID | Check | Status | Notes |
|----|--------|--------|-------|
| X1 | Focus order / keyboard: menu and links reachable | Pass | Menu button and links are normal buttons and anchors. |
| X2 | No layout jump when opening/closing mobile menu | Pass | The menu opens under the button. The rest of the page stays in place. |
| X3 | Stacking order: important metrics appear before low-priority lists on small screens | Pass | Metrics render before the portfolio summary and activity list. |

## Targeted fix log (one row per prompt cycle)

| Cycle | Breakpoint | File(s) touched | Prompt summary (one sentence) | Result after re-test |
|-------|------------|-----------------|-------------------------------|----------------------|
| 1 | Mobile, tablet, desktop | None | No layout fix was required after the manual pass. | All rows above stayed Pass. |
| 2 |  |  |  |  |
| 3 |  |  |  |  |

## Known limitations (optional)

List anything still imperfect that you are **not** fixing in this sprint, with a reason (e.g. “Chart library deferred to next topic”).

- Metric values and the portfolio and activity lists are empty placeholders. Live Supabase data is a later topic.
- Sign-in is not part of this shell. The header shows a labeled Investor placeholder only.
- The site header from the root layout still sits above the dashboard shell.

## Sign-off

- [x] Critical mobile checks M1–M7 pass
- [x] Critical tablet checks T1–T5 pass
- [x] Critical desktop checks D1–D5 pass
- [x] Fix log filled for every change made during QA
- [x] Touched components still match the architecture (no accidental full rewrite)

**Ready for stakeholder handoff draft:** Yes
