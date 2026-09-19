# DS-AH Production Skill System v2.2

The `skills/` directory is the professional capability layer for **Design Control Agent v2.2**.

Skills define **how** a professional design decision/check is performed.  
Registries, approved references and live Figma define **what is true**.  
The Control Agent defines **when** a skill runs and whether execution is authorized.

## Production contract

All primary skills follow:
- `skills/SKILL-CONTRACT.md`

Depth is machine-checked by:
- `agent/evals/skill-depth-cases.json`
- `scripts/run-skill-depth-evals.mjs`

## 13 primary production skills

### Evidence and authority
1. `figma-inspect`
2. `reference-source-resolution`

### UX structure and behavior
3. `information-architecture`
4. `interaction-design`
5. `ux-writing-content`

### System and visual quality
6. `design-system-compliance`
7. `visual-quality`
8. `responsive-accessibility`

### Controlled execution and verification
9. `figma-execution`
10. `design-qa`
11. `visual-regression`
12. `fix-loop`
13. `evidence`

## Supporting skills

- `reference-fidelity`
- `ux-review`
- `developer-handoff`

## Required skill anatomy

Every production skill must be detailed enough to produce repeatable decisions and must define:
- Mission
- activation conditions
- required inputs
- procedure/model
- decision rules
- gate/result or stop semantics where applicable
- block conditions
- anti-patterns
- required evidence
- downstream handoff

## Global invariants

- Skills never grant Figma write permission.
- Product/reference evidence overrides generic convention.
- UNKNOWN is not PASS.
- REPRODUCE/ADAPT fidelity outranks personal taste.
- No skill silently expands Change Scope.
- Tool-call success is not design verification.
- P0/P1 is blocking; P2 is polish.
- Final QA state is PASS / FAIL / BLOCKED.

## Flow ownership

`agent/skill-router.json` maps commands to skills.  
`agent/workflows/` defines orchestration sequence.  
`agent/gates/quality-gates.json` defines QA gates.  
`agent/output/evidence-matrix.schema.json` defines auditable evidence.

## Figma operating SOP

Live Figma work follows `docs/figma-sop.md`. Agent Skills make design decisions; the Figma capability layer performs read/write/verify operations under Change Scope and Write Permission.
