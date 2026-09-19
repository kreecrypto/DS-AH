# DS-AH — Design Control Agent Entry Point

DS-AH is the **Knowledge Base and operating contract** for Design Control Agent v2.2.

It does not independently execute Figma. ChatGPT is the runtime; Figma MCP through ChatGPT is the live inspect/write/verify layer.

## Start sequence

1. Read `agent/SYSTEM.md`.
2. Read `agent/runtime.json`.
3. Read `agent/state-machine.json`.
4. Route with `agent/router/intent.json` and `agent/product-router.json`.
5. Load `agent/skill-router.json`.
6. Inspect target/reference read-only.
7. Resolve source authority with `agent/reference-router.json`.
8. Create a Design Decision using `agent/planner/design-decision.schema.json`.
9. Define Change Scope using `agent/controller/change-scope.schema.json`.
10. Evaluate `agent/permissions/write-permission.json`.
11. Execute only if WRITE_ALLOWED.
12. Run gates from `agent/gates/quality-gates.json`.
13. Enter Fix Loop when an authorized write has fixable P0/P1 failures.
14. Emit Evidence Matrix.
15. Complete with PASS, FAIL, or BLOCKED.

## Runtime architecture

User
→ Design Control Agent
→ Router
→ Inspect
→ Reference Authority
→ Planner
→ Scope Controller
→ Permission Controller
→ Skills
→ Figma Execution
→ Quality Gates
→ Regression
→ Fix Loop
→ Evidence

## Key rules

- Figma read-only by default.
- Reference PASS does not equal write permission.
- No plan/scope = no execution.
- Product/reference evidence outranks generic skill guidance.
- Reuse before create.
- REVIEW and standalone QA are read-only.
- No PASS without evidence.
- No scope expansion for aesthetic preference.

## Figma sources

- Core DS: `5ZFIRJWtmEIvuq95Rhyo6I`
- Agency Master Screens: `cipkv7yTxyE29VCfMphE0W`
- Admin Master Screens: `rEJCvUGUfzzQ3jegheRhnr`

See `agent/manifest.json` for the complete machine-readable map.

## Skill loading quality

Before relying on a production skill, load its full `SKILL.md`. The 13 primary skills are governed by `skills/SKILL-CONTRACT.md`; do not substitute a short summary for the full contract when the skill is active.

## Figma SOP loading

Before live Figma inspection/write/verification, read `docs/figma-sop.md`. Figma execution must remain subordinate to the active Agent Skills, Change Scope, and Write Permission.
