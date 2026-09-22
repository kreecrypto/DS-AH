# Workflow — MODIFY SCREEN / FIX v2.4 + Write Fidelity Extension

## Goal
Change the requested behavior/visual area while preserving everything the user did not authorize changing.

## Canonical flow
Inspect Target → Preservation Baseline → Retrieve/Resolve Reference → Reference Lock → Visual Grammar → DS Mapping → Resolve affected Archetype/Composition Pattern → Reuse Map → Design Decision → Change Scope → Mutation Budget → Permission → Pre-write Revalidation → Targeted Write Plan → Smallest Mutation → Verification → Visual Delta → QA-01A/01B/02..10 → Delta Patch Loop → Evidence.

## Preservation-first
The current target is Preservation Authority for all unaffected regions.

Record protected node IDs/regions, component properties, layout dimensions, states, responsive behavior and visual relationships before mutation.

## Mutation Budget
Classify:
- MICRO: one property/state/text/icon
- LOCAL: one component or compact region
- REGIONAL: one section/toolbar/card group
- STRUCTURAL: page layout/navigation/major composition
- FULL: explicit redesign/reproduce

The write plan may not exceed the budget unless the user explicitly expands scope or a documented dependency requires it.

## Reuse-first mutation
Prefer:
1. change component property
2. swap variant
3. override content
4. replace with approved component instance
5. recompose a bounded approved pattern
6. custom structural edit only when necessary

Never detach/rebuild a component for a small visual change if its API can express the result.

## Rules
- Locked user visual reference owns visual composition for the scoped change.
- Existing target owns preservation of unaffected regions.
- Product Master may support domain behavior/content but cannot silently replace the visual reference.
- DS mapping must preserve locked visual roles.
- STALE_REFERENCE returns to Resolve Reference.
- Tool error does not prove zero write.
- Visual polish cannot justify scope expansion.
- Visual Delta authorizes only a targeted patch inside the active Mutation Budget.

## Fix Loop
Each defect record must include root cause and patch target.
Any fidelity fix must re-run Verification, affected QA gates and QA-10 as applicable.

## Completion
PASS / FAIL / BLOCKED with evidence from original locked reference and original preservation baseline.
