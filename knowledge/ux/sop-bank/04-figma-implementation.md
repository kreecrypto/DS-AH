# SOP-04 — Figma Implementation

## Goal

Translate approved UX decisions into Figma while preserving system integrity and scope.

The canonical capability-level rules live in `docs/figma-sop.md`. This file defines the Bank workflow layer.

## 1. Pre-write gate

Before implementation:

- target inspected
- approved reference resolved
- design decision documented
- scope defined
- protected areas identified
- reusable components inspected
- variables/styles inspected
- states known
- write permission valid

If any critical item is unknown, pause mutation and inspect.

## 2. Implementation order

1. Structure
2. Layout
3. Component composition
4. Content
5. State
6. Visual polish
7. Prototype links
8. Verification

Do not begin with decorative polish.

## 3. Reuse order

Prefer:

1. existing instance property
2. existing variant
3. approved component
4. approved pattern
5. composition from Core components
6. new component only when justified

Never detach an approved instance merely for convenience.

## 4. Layout discipline

Use Auto Layout where relationships are structural.

Verify:

- parent/child relationship
- padding
- gap
- alignment
- Hug/Fill/Fixed behavior
- min/max behavior when applicable
- clipping
- text wrapping

## 5. Design System discipline

Preserve:

- token bindings
- typography roles
- component identity
- state semantics
- icon style
- radius/stroke conventions
- content density conventions

Do not replace semantic tokens with raw values just because they look identical.

## 6. Incremental mutation

For large screens:

```text
Inspect
→ Baseline
→ Skeleton
→ Verify
→ Region 1
→ Verify
→ Region 2
→ Verify
→ Final full-screen QA
```

## 7. Small-change rule

If the task says “fix dropdown,” “improve filter,” or “change CTA,” only related dependency changes are allowed.

No surrounding redesign without a separate design decision.

## 8. Post-write verification

After material changes verify:

- changed node exists
- expected hierarchy
- component identity
- Auto Layout
- token/style bindings
- typography
- wrapping
- states
- alignment
- no overlap
- no clipping
- protected areas unchanged

## 9. Evidence

Record:

- changed screen/frame
- node IDs when available
- screenshots
- before/after delta
- QA result
- unresolved items
