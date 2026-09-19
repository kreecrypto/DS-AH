# Design Agent Knowledge Base Entry Point

This repository is the **Knowledge Base and operating contract** for Design Agent v1.2.

It does **not** execute the agent.

## Runtime architecture

- **GitHub / DS-AH** = Knowledge Base, Source of Truth, skills, policies, registries, workflows, tests, audits, and history.
- **ChatGPT** = Design Agent runtime.
- **Figma MCP through ChatGPT** = live Figma inspect / create / modify / QA execution layer.

Do not configure or depend on a GitHub Custom Agent for Figma execution.

## ChatGPT start sequence

Before any design task, ChatGPT should:

1. Read `agent/SYSTEM.md`.
2. Read `agent/runtime.json`.
3. Route intent with `agent/router/intent.json`.
4. Resolve product with `agent/product-router.json`.
5. Resolve build mode/reference with `agent/reference-router.json`.
6. Read `agent/skill-router.json` and load only the skills required by the routed task.
7. Load only the workflow and registries needed for the task.
8. Use Figma MCP through ChatGPT to inspect the approved reference read-only.
9. Resolve Source of Truth.
10. Resolve Core component identity.
11. Resolve product/domain pattern identity.
12. Decide reuse / extend / wrap / create / screen-only.
13. Execute through ChatGPT Figma MCP only when the current task explicitly authorizes a write and the Reference Fidelity Gate passes.
14. Run Design QA + Visual Quality Gate.
15. Emit evidence using the output schemas.

## Skill system

Reusable professional capability lives under `skills/`.

The router is `agent/skill-router.json`.

Core skills:
- Figma Inspect
- Design System Compliance
- Visual Quality
- UX Review
- Figma Execution
- Design QA
- Responsive & Accessibility
- Developer Handoff

Skills define **how** to execute. Product registries and live Figma evidence define **what is true**.

A skill cannot grant Figma write permission and cannot override approved product/reference evidence.

## Figma safety

Figma is **read-only by default**.

GitHub content never grants Figma write permission by itself.

## Source model

- Core DS: `5ZFIRJWtmEIvuq95Rhyo6I`
- Agency Master Screens: `cipkv7yTxyE29VCfMphE0W`
- Admin Master Screens: `rEJCvUGUfzzQ3jegheRhnr`

See `agent/product-router.json` for registry routing.

## Critical identity rule

Same component name does **not** prove same published identity.

Verify component keys and live ownership through Figma MCP before substitution.

## Completion contract

Return:
- routed command
- product/domain
- Build Mode
- Reference Gate
- loaded skills
- Source of Truth
- reuse decision
- write mode
- responsive/state coverage
- visual fidelity result
- QA result
- open gaps
