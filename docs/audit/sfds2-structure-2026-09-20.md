# SFDS2 structure inspection and skeleton implementation

## Reference lock
- Visual/structural authority: the live Lightning Design System 2 website, https://www.lightningdesignsystem.com/2e1ef8501/p/85bd85-lightning-design-system-2, inspected 2026-09-20.
- System authority: AH Core DS Figma file `5ZFIRJWtmEIvuq95Rhyo6I`, existing audited registry. No new Figma inspection or unsupported component claims in this pass.
- Scope: replace website navigation and shell with reference topology; keep AH identity; leave unavailable content/assets pending as requested.
- Preserve: all original registries, agent policies, and previously drafted content modules. Draft modules are not deployed as invented reference content.

## Observed structure
- 9 top-level groups, 459 navigation entries: 144 page entries, 312 tab entries, 3 non-link groups.
- Components has 48 children. Do not flatten tab entries or non-link groups into pages.
- Four extra visible Components category tabs are recorded separately: Overview, Lightning Base Components, Component Blueprints, Component Architecture.
- Total 460 addressable reference-derived routes, plus AH home and not-found.
- White 36px top bar, 240px fixed sidebar, logo then search, independent content scrolling.
- At observed 1363px viewport: article content 848px wide; 130px article side padding; page actions at upper right; horizontal page tabs; no permanent right-hand TOC.
- Reference text, graphics, video and Salesforce business claims are not republished. Reserved AH slots are explicitly marked pending. Reference-specific navigation names are retained to preserve the requested topology; they do not claim AH integration.

## Evidence and validation
- `website/reference-navigation.json`: complete DOM-derived menu labels, nesting, sequence and source addresses.
- `website/reference-pages.json`: observed category and Button page headings/tabs; not an audit of every page's internal blocks.
- `scripts/website.test.mjs`: exact menu parity, all-route rendering, internal-link validity, tab parentage, fragment safety, sidebar states, generated token inventory, honest pending states.
- Browser preview is blocked in this static project by the managed-preview environment's unavailable compatible server. Do not classify visual fidelity, mobile interaction, keyboard walkthrough or screenshot comparison as passed.
- This is a structural skeleton release, not a completed detailed reproduction. The AGENTS skeleton comparison gate remains BLOCKED for detailed visual work until a compatible preview can be compared side-by-side. No claim of 100% pixel or per-page-body fidelity.

## Deferred by user
AH page copy, illustrations, video, licensed DB Helvethaica X font, icon assets, real feedback endpoint, legal URLs, and page-specific component examples. Existing content drafts remain in source for future mapping.
