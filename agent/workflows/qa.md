# Workflow — QA v2.3

## Canonical order

**Verification → QA-01..QA-09 → QA-10 Visual Regression → Final QA Aggregation → Fix Loop when authorized → Evidence**

The old model where "Design QA" could include QA-10 before Visual Regression is invalid.

## Phase 1 — Pre-regression QA

Resolve exactly:
- QA-01 Reference Fidelity
- QA-02 Design System Compliance
- QA-03 Information Architecture
- QA-04 Interaction / States
- QA-05 Responsive & Accessibility
- QA-06 Content QA
- QA-07 Visual Quality
- QA-08 Structural QA
- QA-09 Scope Integrity

Each gate returns PASS | FAIL | BLOCKED | NOT_APPLICABLE with evidence.

Do not compute final QA yet.

## Phase 2 — QA-10 Visual Regression

Run after QA-01..QA-09 have statuses.

Required for REPRODUCE, ADAPT/MODIFY/FIX, and comparison-based QA.

Compare authority baseline and, for MODIFY/FIX, preservation baseline. If comparable evidence is impossible, QA-10 is BLOCKED rather than silently skipped.

## Phase 3 — Final QA Aggregation

Only now compute final QA:
- BLOCKED if any required gate is BLOCKED.
- FAIL if no gate is BLOCKED and any required gate FAILs.
- PASS only if every applicable required gate PASSes and every N/A has rationale.

P2 polish is recorded separately.

## Fix Loop

For an authorized write task with fixable P0/P1:
Final QA FAIL
→ Fix Loop
→ Mutation
→ Verification
→ affected QA-01..09
→ QA-10
→ Final QA Aggregation

Never return from Fix Loop directly to PASS.

Standalone QA remains read-only. Applying a fix requires reroute to MODIFY/FIX with scope and permission.

## Evidence

Evidence Matrix must distinguish:
- preRegressionResult
- qa10Result
- finalQaResult
- affected gates after each fix
- post-fix verification

No PASS without the full applicable sequence.
