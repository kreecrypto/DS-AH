# Production Skill Contract v2.2

Every core Design Control Agent skill is an executable professional contract, not a prompt fragment.

## Required anatomy

Every production skill must define:

1. **Mission** — what professional decision/control the skill owns.
2. **Activate when** — deterministic trigger conditions.
3. **Required inputs** — evidence needed before safe execution.
4. **Procedure/model** — ordered reasoning/check sequence.
5. **Decision rules** — how to choose among valid alternatives.
6. **Gate/result semantics** — PASS/FAIL/BLOCKED or equivalent output state when the skill is gate-bearing.
7. **Block conditions** — when evidence/authority is insufficient.
8. **Anti-patterns** — behaviors that appear convenient but violate the system.
9. **Required evidence** — what must be recorded for auditability.
10. **Downstream handoff** — which skills/control stages consume the output.

## Global rules

- A skill never grants Figma write permission.
- Product/reference evidence overrides generic design convention.
- UNKNOWN is not PASS.
- Same visible component name is not identity proof.
- REPRODUCE/ADAPT fidelity outranks personal taste.
- No skill may silently expand Change Scope.
- No skill may fabricate node IDs, component keys, variables, business rules, prototype destinations, legal copy, or source authority.
- Tool-call success is not design verification.
- PASS requires the level of evidence appropriate to the skill/task.
- P0/P1 defects are blocking.
- P2 is non-blocking polish unless the user explicitly scopes polish as the task.

## Required professional depth

A skill must be detailed enough that two independent agent runs given the same evidence should make materially the same control decision.

Avoid vague instructions such as:
- "make it look good"
- "check accessibility"
- "follow design system"
- "ensure responsive"
- "fix issues"

Replace them with observable checks, decision criteria, evidence and stop conditions.

## Input discipline

Skills consume upstream evidence; they must not recreate upstream authority.

Examples:
- Visual Quality consumes approved visual grammar; it does not choose the canonical Master.
- Execution consumes Write Permission; it does not self-authorize.
- QA consumes specialist outputs; it does not replace those specialist checks.
- Fix Loop consumes defect evidence; it does not redefine the original task.

## Output discipline

Skill outputs should distinguish:
- VERIFIED fact
- decision
- defect/risk
- unknown
- blocker
- required downstream action

## Skill versioning

Increment a skill version when its professional behavior, decision criteria, gate, evidence contract or downstream responsibility changes.

Documentation-only typo corrections do not require a behavioral version bump.

## Validation

`agent/evals/skill-depth-cases.json` defines minimum required markers for the 13 primary production skills.
`scripts/run-skill-depth-evals.mjs` enforces:
- file exists
- frontmatter version is 2.2.0 or later for upgraded core skills
- required contract sections exist
- minimum content depth is met
