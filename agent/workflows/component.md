# Workflow — COMPONENT

Use for component creation, normalization, merge, or API audit.

## Decision tree

1. Exact Core DS component exists → reuse.
2. Core component exists but needs a supported variant/property → extend only if ownership allows and semantics fit.
3. Same semantic component exists locally multiple times → choose canonical owner and mark aliases/duplicates.
4. Visual similarity but different business semantics → keep separate patterns.
5. One-off screen composition → do not promote to component.
6. Ambiguous variant/state → REVIEW_REQUIRED, do not invent meaning.

## API normalization

Maintain two representations:
- `figmaCurrentApi`: exact current names/values for lookup
- `canonicalApi`: semantic names for new work/documentation

Example:
- current: `.device=desktop, stage=new`
- canonical: `Device=Desktop, State=New`

## Component acceptance

- semantic name
- semantic variant axes
- no placeholder variant names
- documented owner layer: Core or Domain
- responsive behavior documented
- state coverage documented
- source/aliases recorded in registry
