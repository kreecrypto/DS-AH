# Component source → website enrichment

## Scope and authority lock
Figma Core DS `5ZFIRJWtmEIvuq95Rhyo6I` remains system authority. Source packages are imported from GitHub main `da8eb1b6f9f0517d6436bbe18f5aa8ec95db676f`. Existing SFDS2 navigation and Site identity are preserved. Only source-package enrichment, its validation and documentation presentation are in scope. No Figma node or token was mutated.

Architecture: static HTML/CSS/JavaScript Site, existing hash router. Reuse its shell and page actions. Add one package renderer rather than 19 handwritten pages. Classification: CONTENT_ONLY for source tables and extracted specimens, WEBSITE_COMPOSITION for their documentation layout. These are not production UI component implementations.

## Direct evidence
- 19 source packages; 18 non-empty and Evalution empty.
- Live componentKey verification for all 45 non-asset owners.
- 295 source variants inventoried with exact node IDs, names and dimensions.
- Default-variant anatomy for each owner, with node and parent IDs. Anatomy of other variants remains pending.
- Token bindings and nested-instance dependencies scanned across every owner subtree and all variants.
- 352 local variables read with exact IDs, keys, collections and mode values.
- 40 unique referenced variable IDs were not found in the local set. Their raw identities are retained, not replaced with similarly named tokens.
- All 45 owner descriptions are empty. Page text outside components contains labels/state headings, not Usage or Accessibility specifications.
- 23 complete, outlined SVG source exports retained. Partial export strings are not saved as assets. Remaining baseline exports and all browser comparisons are pending.

## What is authored rather than extracted
Usage and accessibility guidance is a separately labeled draft in `source/components/web-guidance.json`; primary W3C references are linked per package. It needs owner review and contextual testing. Exact source variants/defaults are examples of Figma configuration, not executable web-component examples.

## WEB_READY gate
All seven enrichments must be VERIFIED with evidence. In addition: all-variant anatomy coverage, approved usage, passing accessibility tests, runnable tested examples, source/browser visual comparison, resolved token dependencies, and passing runtime/responsive/accessibility/regression checks are required. Changing a status string alone cannot pass the validator.

Current: **0 WEB_READY; 18 SOURCE_READY with enrichment; 1 BLOCKED_EMPTY_FIGMA_SOURCE**. Documentation pages can show source evidence and pending items without claiming implementation readiness.

## Verification and resume
Static package, source-identity, route, generated HTML, internal-link, baseline-integrity, and status-guard tests are provided. The managed preview has no compatible server for this static-only project, so browser/runtime, responsive, accessibility and visual QA are NOT_RUN, not PASS. Do not merge on the basis of static tests alone.

Resume: finish missing source exports and per-variant anatomy; resolve external/stale token references; obtain review of authored Usage/Accessibility; implement executable examples; compare against source at matched states/viewports and run keyboard/screen-reader checks. Re-inspect the exact source before resuming extraction.
