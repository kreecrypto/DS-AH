# Figma → GitHub → Website Content Architecture

## Purpose
Create one complete content pipeline for the AH Design System documentation website without turning the website into a second Source of Truth.

**Authority:** Figma Core DS → approved domain/master Figma evidence → GitHub canonical registry/source package → documentation website.

## Pipeline
```text
Figma Raw Evidence
  ↓ Deep Extract
GitHub Registry (machine truth)
  ↓ normalize / resolve identity
GitHub Source Packages (website-ready content contracts)
  ↓ coverage + quality gates
Website Content Model
  ↓ route/template renderer
Documentation Website
  ↓ runtime / responsive / accessibility / visual QA
```

## Content map
| Order | Website group | Primary authority | Package |
|---:|---|---|---|
| 1 | Overview | GitHub composed from Figma/GitHub evidence | site-composition |
| 2 | Foundations | Figma Core DS | foundation-package |
| 3 | Styling Hooks | GitHub normalized mapping over Figma foundations | website-documentation-composition |
| 4 | Assets | Figma Core DS | asset-package |
| 5 | Components | Figma Core DS | component-source-package |
| 6 | Patterns | Approved domain/master Figma evidence after Core DS | pattern-package |
| 7 | Templates | GitHub registry derived from approved master-screen evidence | template-package |
| 8 | Master Screens | Approved Master/Admin Figma sources | screen-evidence-package |
| 9 | Interactions & States | Figma evidence normalized in GitHub | interaction-package |
| 10 | Figma Mapping | GitHub canonical mapping of live Figma identity | mapping-package |
| 11 | Agent | GitHub operating contract | operating-contract-doc |
| 12 | QA | GitHub quality/evidence registries plus live runtime evidence | qa-package |

## Website information architecture
1. Overview / Getting Started / Source of Truth
2. Foundations — Color, Typography, Spacing, Shape, Focus, Responsive decision
3. Styling Hooks — web aliases mapped to Figma semantic tokens, never independent values
4. Assets — Icon library and AXA Badge artwork
5. Components — 19 Core component page packages (18 source-ready, 1 blocked)
6. Patterns — approved reusable compositions from domain/master evidence
7. Templates — List, Detail, Create/Edit Form, Dashboard, Search/Filter, Overlay/Drawer
8. Master Screens — Agency/Admin screen evidence and scenarios
9. Interactions & States — states, validation, loading/empty/error, responsive behavior
10. Figma Mapping — page/node/componentKey/token/dependency/alias/preferred identity
11. Agent — architecture, workflow, skills, policies, evidence
12. QA — coverage, visual baseline, accessibility, DS compliance, runtime, Code Connect status

## Component page template
Every component route uses the same ordered content model:

`Overview → When to use → Anatomy → API / Properties → Variants → States → Tokens → Dependencies → Usage → Do / Don't → Accessibility → Examples → Figma Reference → Visual Baseline → Related Components → QA / Status`

Literal Figma API spelling may be shown in the Figma/API reference, while new documentation uses canonical naming. Existing instance identity is never migrated automatically.

## Source/package ownership
- `registry/` = normalized machine truth and governance decisions.
- `source/` = website-consumable content packages composed from registry + approved documentation evidence.
- Website = renderer/consumer only.
- Figma remains visual/system authority.
- Approved Master/Admin files provide pattern/screen evidence but cannot override Core DS component APIs.

## Readiness
Package lifecycle:

`RAW_EVIDENCE → EXTRACTED → SOURCE_READY → DOC_READY → VISUAL_READY → WEB_READY → PUBLISHED`

A page cannot become `WEB_READY` while authority, required content, accessibility, visual evidence (when applicable), or blocking semantics are unresolved.

## Explicit gaps
- Evalution remains blocked because the current Figma page is empty.
- Responsive/screensize remains deprecated-unused for Agent work.
- Card is not a canonical Core component; website card-like documentation composition uses Container.
- Code Connect remains BLOCKED_EXTERNAL until seat + actual application source repo requirements are met.
- Pattern transitions that are not proven remain unresolved rather than inferred.

## Renderer rule
The website reads `source/site/routes.json` for navigation and `source/site/content-package-contract.json` for template requirements. Component routes read `source/components/index.json` and the matching `source/components/<id>/package.json`.

No route is allowed to invent missing design-system facts.
