# Workflow — QA v2

## Flow

**Figma Inspect → Reference Fidelity → Design System Compliance → Interaction / States → Responsive & Accessibility → Content QA → Visual Quality → Structural QA → Evidence Matrix → PASS / FAIL / BLOCKED**

## Gate IDs
- QA-01 Reference Fidelity
- QA-02 Design System Compliance
- QA-03 Interaction / States
- QA-04 Responsive & Accessibility
- QA-05 Content QA
- QA-06 Visual Quality
- QA-07 Structural QA
- QA-08 Scope Integrity

Each gate must return:
- status: PASS | FAIL | BLOCKED | NOT_APPLICABLE
- evidence
- affected node/area
- severity if failed
- required action

## Final result
- PASS — all required blocking gates pass.
- FAIL — one or more required gates fail.
- BLOCKED — verification cannot be completed safely due to missing authority/tool/evidence/business rule.

There is no PASS_WITH_GAPS final status.
Non-blocking P2 polish is recorded separately.

## Write behavior
QA is read-only by default.
If the same task explicitly authorizes fixes, failed P0/P1 gates may enter Fix Loop.
Otherwise report required action without mutation.

A REPRODUCE/ADAPT write without comparable reference/result evidence cannot PASS.
