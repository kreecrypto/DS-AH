---
id: figma-inspect
version: 1.0.0
scope: core
---

# Figma Inspect Skill

## Purpose
Inspect live Figma before design decisions so the agent uses verified structure rather than assumptions.

## Trigger
Use for INSPECT, REVIEW, CREATE, MODIFY, COMPONENT, QA, or whenever a Figma file/node is supplied.

## Required inputs
- Figma file/node or product route
- task intent
- resolved product/domain when available

## Procedure
1. Open the exact supplied node first.
2. Identify page/frame/component hierarchy and major dimensions.
3. Inspect Auto Layout, constraints, grids, spacing, typography, fills, strokes, effects and visibility.
4. Resolve instances to component identity. Verify published key/ownership when substitution matters.
5. Identify variable/style bindings rather than copying raw values.
6. Detect variants/properties/states and naming semantics.
7. Identify local vs remote assets.
8. Trace reusable domain patterns and Core DS dependencies.
9. Capture reference evidence needed by the task.
10. Record unknowns instead of inferring them.

## Hard rules
- Same visible name does not prove same component identity.
- Never invent node IDs, component keys, variable IDs, variant meanings or ownership.
- Do not mutate Figma during inspection unless the current task separately authorizes a write and the Reference Gate passes.
- Inspect the approved Master before inspecting exploratory/legacy material when both exist.

## Output evidence
- exact file/node inspected
- hierarchy summary
- component/variable identity findings
- layout/responsive findings
- state findings
- reusable assets
- unknowns/gaps
