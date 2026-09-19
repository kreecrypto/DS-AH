# Workflow — QA v2.1

## Flow

**Figma Inspect → Reference Fidelity → Design System Compliance → Information Architecture → Interaction / States → Responsive & Accessibility → Content QA → Visual Quality → Structural QA → Scope Integrity → Visual Regression when applicable → Evidence Matrix → PASS / FAIL / BLOCKED**

## Gate IDs
- QA-01 Reference Fidelity
- QA-02 Design System Compliance
- QA-03 Information Architecture
- QA-04 Interaction / States
- QA-05 Responsive & Accessibility
- QA-06 Content QA
- QA-07 Visual Quality
- QA-08 Structural QA
- QA-09 Scope Integrity
- QA-10 Visual Regression

Each gate returns:
- status: PASS | FAIL | BLOCKED | NOT_APPLICABLE
- evidence
- affected node/area
- severity if failed
- required action
- post-fix verification when applicable

## Final result
- PASS — all applicable blocking gates pass.
- FAIL — one or more applicable gates fail.
- BLOCKED — verification cannot safely complete because authority, tool, evidence, target or business rule is unresolved.

There is no PASS_WITH_GAPS final state. P2 polish is recorded separately.

## Control behavior
QA is read-only by default.
To fix findings, route the work through MODIFY/FIX, define scope, re-evaluate permission, execute, then return to QA.

For an already-authorized CREATE/MODIFY task, fixable P0/P1 failures enter Fix Loop before completion.

A reference-based write without comparable baseline/result evidence cannot PASS.
