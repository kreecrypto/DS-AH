# Workflow — QA v2.4 + Write Fidelity Extension

## Canonical order
Verification → Visual Delta Generation → QA-01A Reference Authority → QA-01B Visual Fidelity → QA-02..QA-09 → QA-10 Visual Regression → Final QA Aggregation → Delta Patch Loop when authorized → Evidence.

## Pre-QA structural verification
Verify:
- correct source component identity
- instance vs custom duplicate
- expected variant/property
- token/variable binding where available
- Auto Layout/constraints
- archetype-required regions
- state coverage
- Mutation Budget / protected-area integrity

## Visual Delta taxonomy
- GEOMETRY — width/height/region proportions
- ALIGNMENT — edge/baseline/anchor mismatch
- SPACING — gap/padding/margin/rhythm
- TYPOGRAPHY — family/style/size/weight/line-height
- COLOR_SURFACE — semantic role, fill, border, elevation
- COMPONENT_IDENTITY — wrong or custom duplicate asset
- VARIANT_STATE — wrong property/state
- CONTENT — incorrect label/data/icon
- DENSITY — too loose/tight vs reference
- RESPONSIVE — breakpoint/constraint behavior
- SCOPE — unintended change outside authorized area

## Severity
- P0 — wrong reference/source, destructive scope drift, broken primary structure, unusable state
- P1 — major fidelity/component/layout mismatch
- P2 — polish/optical detail

P0/P1 block PASS.

## QA-01A
Verify Reference Lock, candidate decision, authority lanes, Build Mode and forbidden substitutions. Wrong source/master is P0.

## QA-01B
Compare result with Visual Grammar at equivalent viewport/state.
For REPRODUCE, side-by-side visual evidence is required; metadata-only evidence cannot PASS.

## QA-02 Design System
Check reuse map outcomes:
- approved component was reused when available
- variants/properties are valid
- no unnecessary custom primitive recreation
- semantic variables/tokens are used where available

## QA-03..09
Information Architecture, Interaction/States, Responsive/A11y, Content, Visual Quality, Structural QA and Scope Integrity.

## QA-10
Regress against original locked visual authority, original preservation baseline, and archetype/composition invariants when applicable.

## Delta Patch Loop
1. sort P0 → P1 → P2
2. group by root cause
3. create smallest patch plan
4. reject patches outside Mutation Budget
5. mutate
6. verify affected nodes and protected siblings
7. regenerate deltas
8. re-run affected QA
9. run QA-10
10. stop only at PASS / FAIL / BLOCKED

A delta record is not permission to redesign unaffected areas.

## Final aggregation
Any required BLOCKED → BLOCKED.  
Else any required FAIL → FAIL.  
Else PASS.
