# DS-AH Production Skill System v2.4

The `skills/` directory is the professional capability layer for **Design Control Agent v2.4**.

Skills define **how** professional design decisions/checks are performed.  
Registries, locked references, and live Figma define **what is true**.  
The Control Agent defines **when** a skill runs and whether execution is authorized.

## Production contract
All primary skills follow `skills/SKILL-CONTRACT.md`.
Depth is machine-checked by:
- `agent/evals/skill-depth-cases.json`
- `scripts/run-skill-depth-evals.mjs`

## 13 primary production skills
1. figma-inspect
2. reference-source-resolution
3. information-architecture
4. interaction-design
5. ux-writing-content
6. design-system-compliance
7. visual-quality
8. responsive-accessibility
9. figma-execution
10. design-qa
11. visual-regression
12. fix-loop
13. evidence

Supporting:
- reference-fidelity
- ux-review
- developer-handoff

## v2.4 authority model

Visual Authority and System Authority are separate.

Visual Authority controls:
- composition
- grid
- hierarchy
- density
- repeated anatomy
- chart geometry

System Authority controls:
- component identity/API
- semantic variables/tokens
- typography foundations
- icons
- accessibility primitives

Exact current-task user reference has highest Visual Authority when explicitly used as the reference.

## v2.4 reference fidelity hardening

Reference-based flow adds:
- Reference Lock
- Visual Grammar Extraction
- Design System Mapping
- REPRODUCE Skeleton Checkpoint
- QA-01A Reference Authority
- QA-01B Visual Fidelity

A Product Master may support content/domain behavior but cannot silently replace a locked user visual reference.

## Global invariants
- Skills never grant write permission.
- Missing requested prior ref blocks; no Master fallback.
- Reference Lock precedes Design Decision.
- Visual Grammar precedes execution planning.
- DS mapping preserves locked visual roles.
- REPRODUCE/ADAPT fidelity outranks personal taste.
- UNKNOWN is not PASS.
- Tool success is not verification.
- P0/P1 blocks; P2 is polish.
- Final result is PASS / FAIL / BLOCKED.

## Figma SOP
Live Figma work follows `docs/figma-sop.md`.
