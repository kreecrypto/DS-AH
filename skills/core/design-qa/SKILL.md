---
id: design-qa
version: 2.1.0
scope: core
---

# Design QA Skill

## Purpose
Verify a Figma design through explicit quality gates before completion.

## Gates
1. QA-01 Reference Fidelity
2. QA-02 Design System Compliance
3. QA-03 Information Architecture
4. QA-04 Interaction / States
5. QA-05 Responsive & Accessibility
6. QA-06 Content QA
7. QA-07 Visual Quality
8. QA-08 Structural QA
9. QA-09 Scope Integrity
10. QA-10 Visual Regression when applicable

## Gate status
PASS | FAIL | BLOCKED | NOT_APPLICABLE

## Final status
PASS | FAIL | BLOCKED

PASS requires every applicable blocking gate to PASS.

## Scope integrity
Compare actual mutations against the approved Change Scope:
- allowed changes
- protected areas
- out-of-scope areas
- affected states
- affected viewports

Any unauthorized protected-area change is a blocking QA-09 failure.

## Fix behavior
In an explicitly authorized CREATE/MODIFY run, fixable P0/P1 failures enter Fix Loop. Re-run failed and dependent gates and visual regression before completion.

Standalone QA remains read-only and reports required action.

## Evidence
Use the Evidence Matrix. Never infer PASS from visual impression alone.
