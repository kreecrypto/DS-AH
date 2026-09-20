# AH Design System Website Inspection — 2026-09-20

Site: `https://ah-design-system.kreetaphon-game.chatgpt.site`  
Figma Core DS: `5ZFIRJWtmEIvuq95Rhyo6I`  
GitHub KB: `kreecrypto/DS-AH`

## Purpose

Inspect the current AH Design System documentation surface and reconcile it with the canonical Figma Core Design System before recording implementation knowledge in GitHub.

The documentation website is a presentation layer. It is **not** allowed to become a new design-system Source of Truth.

## Runtime inspection

The public site is a JavaScript SPA. The current crawler can verify the rendered shell but cannot enumerate client-side routes.

### Live-verified shell

- AH DESIGN SYSTEM brand
- Search trigger
- Menu trigger
- Desktop search field with `Search...`
- `⌘ K` shortcut indicator
- Search dialog: `Search AH Design System`
- Search input: `Search pages…`
- `Esc` close action

Anything beyond these runtime elements is classified as **unverified at route level** unless backed by Figma or GitHub evidence.

## Figma authority check

A live read-only Figma audit reconfirmed the Core DS inventory:

- 32 pages
- 5 variable collections
- 352 variables
- 41 text styles
- 7 paint styles
- 0 effect styles

Collections remain:

- `color`
- `text`
- `spacing`
- `Responsive`
- `shape`

This matches the repository baseline and confirms there is no detected registry drift at the inventory level.

## Website shell → Figma reuse map

| Website role | Figma asset | Component key | Decision |
|---|---|---|---|
| Primary action | `button` | `a3123145d019de0e96f393c6c92c2d5d2d7236e3` | Reuse |
| Icon action | `button icon` | `e3848fc5f2f88f4c117dad1d078f8188df529621` | Reuse |
| Search | `desktop/search` | `8c565095086ab54369ac9016287135b196141358` | Reuse |
| Generic input | `input-text` | `87427036c09f6d4a3283ae068bc36e4d6351a7e7` | Reuse |
| Navigation item | `menu` | `c27fb78aa960961f5557379b41e0cb5356842c92` | Reuse |
| Sidebar | `side-bar` | `27cffe58afdec2bef93250b55cfa11835276b823` | Reuse/adapt as docs shell |
| Mobile menu | `mobile/menu` | `cdd9362ffedd880e842b5d28107aa9f5fc8ff1e5` | Reuse |
| Header | `header` | `769388ee68f7ed865ff4aea3e402bd99df89a78e` | Reuse/adapt |
| Breadcrumb | `breadcrumb` | `cf65b4e2b72b9b580e442b011225a9fcc8485787` | Reuse |
| Tabs/chips | `tab`, `tab/chip` | `8240f9b4f5278a2e2ce7b7191535b718c9574127`, `a5b3b9493a4813b83ac2acaa3753db830d26eacb` | Reuse |
| Docs card/content panel | `container` | `878930169cd08b4b65acd09970260f1d3bf89e57` | Use first |

## Card decision

A live design-system search did not return a canonical Core component named `Card`.

Therefore:

1. Do not create a Card merely because a documentation website needs card-like presentation.
2. Use the existing `container` primitive for documentation composition first.
3. Promote a dedicated Card only when a stable reusable API is proven by multiple use cases.
4. If a domain pattern already provides the required semantics, keep it in the Domain layer rather than promoting it to Core.

## Target documentation IA

The target documentation structure is recorded as:

1. Website Shell
2. Navigation / Search
3. Foundations
4. Styling Hooks
5. Component Template
6. Core component docs: Button
7. Core component docs: Input
8. Core component docs: Card / Container decision
9. Pattern Template
10. Figma Mapping
11. Agent
12. QA

This is a target information architecture. It must not be misreported as a live-verified route inventory until interactive route capture is available.

## Governance

Canonical authority order for the documentation system:

`Figma Core DS → approved domain pattern / Master → GitHub canonical mapping → documentation website composition`

Rules:

- Website content may explain the DS but must not redefine tokens or component APIs.
- Component identity should be stored by Figma component key, not display name alone.
- Exact Figma legacy names remain lookup aliases; canonical names remain the clean API for new work.
- Website-only patterns stay outside Core DS unless the New Component Gate is satisfied.
- Unverified SPA routes are marked unverified, never guessed.

## Open gaps

### SITE-001 — Route inventory
The current crawler cannot enumerate the JS client routes.

**Resolution:** capture the site with an interactive browser/Playwright when available, then append a route-by-route visual audit.

### SITE-002 — Card
No canonical Core Card was found.

**Resolution:** use `container` for docs composition until Card has proven reusable semantics.

### SITE-003 — Responsive token semantics
The Core `Responsive` collection remains review-required / deprecated-unused evidence.

**Resolution:** document explicit Desktop/Tablet/Mobile behavior without inventing new token semantics.

## Result

Status: **PASS_WITH_GAPS**

The website shell is mapped to existing Figma DS assets, Figma remains the visual/system authority, and GitHub now has an explicit contract for how the AH Design System documentation site should consume Core DS assets.
