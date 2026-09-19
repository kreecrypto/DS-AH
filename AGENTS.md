# Design Agent Knowledge Base Entry Point

This repository is the **Knowledge Base and operating contract** for Design Agent v2.0.

It does not execute the agent.

## Runtime architecture

- **GitHub / DS-AH** = Source of Truth for skills, policies, registries, workflows, schemas, evals, audits and decision history.
- **ChatGPT** = Design Agent runtime.
- **Figma MCP through ChatGPT** = live Figma inspection/execution/verification layer.

## Start sequence

1. Read `agent/SYSTEM.md`.
2. Read `agent/runtime.json`.
3. Route intent with `agent/router/intent.json`.
4. Resolve product with `agent/product-router.json`.
5. Load `agent/skill-router.json`.
6. Load every skill required by that command.
7. Load the routed workflow and only relevant product registries.
8. Inspect live Figma/reference read-only.
9. Resolve exact source authority.
10. Execute only with current-task write authorization and a valid Reference Gate.
11. Run QA and regression checks.
12. Enter Fix Loop when a CREATE/MODIFY P0/P1 failure is safely fixable.
13. Emit Evidence Matrix.
14. Return PASS, FAIL, or BLOCKED.

## Production pipelines

### CREATE / MODIFY
Figma Inspect → Reference/Source Resolution → IA → Interaction Design → DS Compliance → UX Writing/Content → Visual Quality → Responsive & Accessibility → Figma Execution → Design QA → Reference Fidelity → Visual Regression → Fix Loop → Evidence

### REVIEW
Figma Inspect → UX Review → IA → Interaction Review → UX Writing Review → Responsive & Accessibility → Visual Quality → DS Compliance → Findings + Acceptance Criteria → Evidence

### QA
Figma Inspect → Reference Fidelity → DS Compliance → Interaction/States → Responsive & Accessibility → Content QA → Visual Quality → Structural QA → Scope Integrity → Evidence Matrix → PASS/FAIL/BLOCKED

## Figma safety

Figma is read-only by default.
Repository state never grants Figma write permission.

## Figma sources

- Core DS: `5ZFIRJWtmEIvuq95Rhyo6I`
- Agency Master Screens: `cipkv7yTxyE29VCfMphE0W`
- Admin Master Screens: `rEJCvUGUfzzQ3jegheRhnr`

## Critical rules

- Reference before layout.
- Same visible component name does not prove same published identity.
- Product/reference evidence outranks generic skill guidance.
- Reuse before create.
- No PASS without evidence.
- Final QA state is only PASS, FAIL, or BLOCKED.

See `skills/README.md`, `agent/skill-router.json`, and `docs/skill-system.md`.
