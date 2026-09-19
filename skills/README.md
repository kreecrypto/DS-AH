# DS-AH Production Skill System

The `skills/` directory is the reusable capability layer for Design Agent v2.0.

## Architecture

System Contract
→ Intent/Product/Reference Routing
→ Skill Router
→ Task Pipeline
→ Product Evidence / Live Figma
→ Execution
→ QA / Regression
→ Fix Loop
→ Evidence

Skills define **how** to work.
Registries, approved references and live Figma define **what is true**.

## Core skills

### Inspection and authority
- `figma-inspect`
- `reference-source-resolution`
- `reference-fidelity`

### UX structure and behavior
- `information-architecture`
- `interaction-design`
- `ux-writing-content`
- `ux-review`

### System and visual
- `design-system-compliance`
- `visual-quality`
- `responsive-accessibility`

### Execution and verification
- `figma-execution`
- `design-qa`
- `visual-regression`
- `fix-loop`
- `evidence`
- `developer-handoff`

## Skill contract

Every production skill must define:
- purpose
- trigger
- required inputs
- procedure/checks
- hard rules
- gate/result semantics
- evidence
- block/fail behavior where applicable

A skill cannot grant Figma write permission.

## Unified result semantics

Final QA-oriented status:
- PASS
- FAIL
- BLOCKED

Gate-level status may also use NOT_APPLICABLE.

Do not introduce PASS_WITH_GAPS/PASS_WITH_P2 as final states. Record non-blocking P2 polish separately.

## Flow ownership

`agent/skill-router.json` is the machine-readable mapping.
`agent/workflows/` defines sequence.
`agent/output/evidence-matrix.schema.json` defines auditable QA evidence.
