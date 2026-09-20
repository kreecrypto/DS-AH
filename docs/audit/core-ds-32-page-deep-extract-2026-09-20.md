# Core DS — 32 Page Deep Extract — 2026-09-20

## Result
**32 / 32 pages inspected live from Figma.**

This pass is read-only. No Figma nodes were mutated.

## Classification
- 32 total pages
- 4 foundation content pages: Typography, Color, Shape, Spacing
- 2 asset content pages: AXA Badge, Icon
- 19 component pages
- Cover + structural section/divider pages
- `Evalution` is currently empty
- AXA Badge contains raw artwork frames and no local component owner

## Foundation evidence
Existing canonical token extraction remains authoritative:
- 352 local variables
- 5 collections
- 41 text styles
- 7 paint styles
- 0 effect styles

Website source should consume the existing token chunks under `registry/core-ds-tokens/` instead of re-parsing documentation-frame text.

## Component/API evidence
Live page inspection reconfirmed component owner identity and API for all non-empty component pages. The complete page→componentKey index is now in `source/figma/core-ds-pages.json`.

Important identity/governance findings:
- Checkbox has duplicate owners; preferred key is recorded in `registry/core-ds-preferred.json`.
- Radio has duplicate owners; preferred key is recorded in `registry/core-ds-preferred.json`.
- Bottom sheet includes a separate local `button` owner; do not substitute it by display name.
- Container remains the approved composition primitive for website card-like documentation until a distinct Card is approved.
- Responsive/screensize remains deprecated-unused for Agent work.
- Legacy API spellings are preserved as lookup aliases but canonicalized for new website documentation.

## Asset findings
### Icon
12 local owner families were found, including base-icon, icon/general, icon/navbar, arrow/system/event/insurance/performance/saleskit families.

### AXA Badge
29 top-level artwork frames were found. This page is a raw asset source, not a component API. Website ingestion should treat these as asset records with provenance rather than pretending they are component variants.

## Empty / structural pages
Structural-only pages are intentionally represented in the index so website extraction can distinguish “no content by design” from “not inspected”.

`Evalution` is a true empty component page in the current Figma source and must remain an explicit gap rather than receiving invented documentation.

## Website ingestion rule
`Figma live evidence → GitHub canonical source → normalized website content model → website UI`

The website must never become a competing Source of Truth.

## Next extraction depth
Page-level deep extraction is complete. The next pass should enrich each website-ready package with:
1. anatomy
2. usage guidance
3. states and examples
4. accessibility
5. token dependency subset
6. asset provenance
7. visual baseline/reference
8. related components/patterns
9. canonical vs legacy API names
10. website route metadata

These fields must come from evidence or be marked `UNRESOLVED`; no guessing.
