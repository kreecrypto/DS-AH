# Core DS Deep Inspection — 2026-09-18

Source Figma: `5ZFIRJWtmEIvuq95Rhyo6I`  
Mode: **read-only**. No Figma nodes, components, variables, styles, or publishing state were changed.

## Completion summary

### File structure
- 32 pages total
- 19 component-labelled pages
- 18 non-empty component pages
- `Evalution` is empty
- Asset page `AXA Badge` is empty
- Fundamental pages are primarily variable/style-backed rather than canvas documentation

### Foundations — reconciled
- Local variables: **352/352**
- Color: **264/264**
- Text: **45/45**
- Spacing: **28/28**
- Shape: **14/14**
- Responsive: **1/1**
- Text styles: **41**
- Paint styles: **7**
- Effect styles: **0**
- Grid styles: **0**

The color registry is chunked by semantic group so agents can load only relevant tokens.

### Components — reconciled
Deep inspection found **57 local published component owners**. The previous curated registry contained 56; the missing owner was:
- `bg` — key `5b8283247625acb9dfefe63ce4327d0e928c9906`

The curated registry is now 57/57.

### Duplicate families
Two duplicate families are structurally confirmed:

**Checkbox**
- simple/legacy: `8ff0ada0...` — 2 variants
- richer candidate: `e56e5a45...` — 14 variants with state, indeterminate and on-dark support

**Radio**
- simple/legacy: `9db7a4d3...` — 2 variants
- richer candidate: `f90d2487...` — 5 variants with Default/Disabled/Error
- `radio-list` remains a separate pattern

These are audit recommendations, not automatic source migrations.

### Core family coverage
Direct Core owners exist for actions, inputs, dropdown, search compositions, selection controls, lists, tabs, navigation, icons, tooltip, bottom sheet, scrolling, avatar, date picker, background and containers.

No direct Core owner was found for:
- Modal/Dialog
- Toast
- Pagination
- Table primitive
- Textarea
- separately named generic Select

External/domain candidates were located and recorded, but are not promoted automatically.

### Hidden dependency debt
Core component examples still contain remote/stale identities with same or related names, including older/different:
- base-icon
- icon/general
- radio
- menu
- scroll-bar
- cursor
- external material-symbol icon

Therefore same-name substitution remains forbidden without key/ownership verification.

### Foundation debt
- `Responsive/typography/screensize` = 0 has no clear executable contract.
- duplicate text-style names exist for `Title/lg` and `Body/xlg/xlg`.
- `Body/xlg/xlg` uses 24px font with 18px line-height.
- some shape/spacing variable scopes are overly broad/inconsistent.
- seven gradient paint styles appear special-purpose/legacy and are not semantic variables.

### Naming/API debt
Confirmed examples:
- `.device`
- `ischeck`
- `stage`
- `disable`
- `fasle`
- `checkbok`
- `buttom-right`
- `bottom-shet`
- `qualtification`
- `perfomance`
- `Property 1`
- numeric quick-menu variants

Exact names remain searchable; canonical names are used for new work.

## Agent source rule after Deep Inspect

`Core token chunk → Core component key → product/domain pattern → screen`

For missing Core families, the Agent must report ownership evidence and use product/domain or external-library candidates only when the task/source policy supports them.

## What is still not proven

- formal governance approval of preferred duplicate-family candidates
- semantics of numeric quick-menu icon variants
- intended use of the Responsive screensize variable
- full source internals of upstream remote Foundations/Color libraries
- developer/code mapping
- visual regression baselines

These gaps are explicit and must not be guessed.
