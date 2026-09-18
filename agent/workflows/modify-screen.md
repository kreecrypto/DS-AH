# Workflow — MODIFY SCREEN

Use when changing an existing approved/current screen.

## Reference Gate

1. Inspect the exact target node.
2. Resolve the approved/current source that the target is derived from.
3. Build Mode defaults to **ADAPT**.
4. If source/reference cannot be resolved, remain read-only and report `BLOCKED_REFERENCE_MISSING`.
5. If multiple source references are plausible, report `BLOCKED_REFERENCE_AMBIGUOUS`.

## Change scope

Determine whether the requested change belongs to:
- instance property
- domain pattern
- Core component
- screen-only composition

Prefer property/variant changes over detaching/rebuilding.

## Preservation rule

Preserve unchanged structure.

Do not:
- redesign unrelated sections
- replace the page shell
- add a new dashboard/card/table pattern outside the requested scope
- propagate a screen-specific requirement into Core without cross-domain evidence

Check Desktop/Tablet/Mobile impact.

## Completion

Compare the modified result against:
1. the pre-change target
2. the approved reference

Everything outside the requested change scope should remain structurally/visually stable.

Run QA. If unrelated layout drift exists, QA = FAIL and fix it before completion.

If the requested change reveals a reusable API gap, route that portion through COMPONENT workflow before implementation.
