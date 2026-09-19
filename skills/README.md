# DS-AH Skill System

The `skills/` directory is the reusable capability layer for Design Agent.

## Operating model

**System contract → Skill Router → Task Skills → Product evidence → Workflow → Figma MCP → QA**

Skills are not a substitute for product evidence. They define *how to reason and execute*; registries and live Figma define *what is true*.

## Loading rule

1. Always load `agent/skill-router.json`.
2. Load only the skills required by the routed task.
3. CREATE/MODIFY tasks must load `visual-quality`, `design-system-compliance`, `figma-execution`, and `design-qa`.
4. REVIEW tasks must load `ux-review` and `visual-quality`.
5. Figma inspection must load `figma-inspect`.
6. Responsive/public-facing work loads `responsive-accessibility`.
7. Handoff loads `developer-handoff`.

Do not load every skill for every task. Context must remain task-scoped.

## Core skills

- `skills/core/figma-inspect/SKILL.md`
- `skills/core/design-system-compliance/SKILL.md`
- `skills/core/visual-quality/SKILL.md`
- `skills/core/ux-review/SKILL.md`
- `skills/core/figma-execution/SKILL.md`
- `skills/core/design-qa/SKILL.md`
- `skills/core/responsive-accessibility/SKILL.md`
- `skills/core/developer-handoff/SKILL.md`

## Skill contract

Each skill must state:
- purpose
- triggers
- required inputs
- procedure
- hard rules
- outputs/evidence
- fail/block conditions

A skill may not grant Figma write permission. Write permission still requires the current user instruction plus the Reference Fidelity Gate.
