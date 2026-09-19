# Workflow — INSPECT v2.1

Purpose: produce verified Figma/source evidence without mutation.

## Control mode
INSPECT_ALLOWED. Never mutate.

## Steps
1. Resolve file key/node/target.
2. Inspect exact target before broad search.
3. Identify hierarchy, frames, sections and major dimensions.
4. Inspect Auto Layout, constraints, grids, spacing, typography, fills, strokes, effects and visibility.
5. Resolve instances/components and remote/local ownership.
6. Resolve variables/styles and variant/property definitions.
7. Identify states, responsive behavior and prototype links when present.
8. Compare with product/Core registries.
9. Identify source authority candidates, reuse candidates, naming debt, duplicates and gaps.
10. Record unknowns instead of inferring them.
11. Emit inspection evidence and no-change confirmation.

## Output
- exact nodes inspected
- structural summary
- component/variable identity findings
- responsive/state findings
- source candidates
- reuse candidates
- conflicts/gaps
- no-change confirmation
