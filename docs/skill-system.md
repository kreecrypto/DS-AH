# Design Agent Skill System v2

Status: Active

## Goal
Make Design Agent execution deterministic, auditable and resistant to design drift.

## CREATE / MODIFY
Figma Inspect
→ Reference / Source Resolution
→ Information Architecture
→ Interaction Design
→ Design System Compliance
→ UX Writing / Content
→ Visual Quality
→ Responsive & Accessibility
→ Figma Execution
→ Design QA
→ Reference Fidelity
→ Visual Regression
→ Fix Loop when needed
→ Evidence

## REVIEW
Figma Inspect
→ UX Review
→ Information Architecture
→ Interaction Review
→ UX Writing Review
→ Responsive & Accessibility
→ Visual Quality
→ Design System Compliance
→ Findings + Acceptance Criteria
→ Evidence

## QA
Figma Inspect
→ Reference Fidelity
→ Design System Compliance
→ Interaction / States
→ Responsive & Accessibility
→ Content QA
→ Visual Quality
→ Structural QA
→ Scope Integrity
→ Evidence Matrix
→ PASS / FAIL / BLOCKED

## Why skills and workflows are separate
- Skill = professional capability and gate rules.
- Workflow = order and orchestration.
- Registry = verified product evidence.
- Schema = machine-checkable output contract.
- Eval = regression coverage for agent behavior.

## Evidence-first rule
Every QA claim must map to evidence.
Unknown is never PASS.
Missing authority/tool/evidence produces BLOCKED when safe verification cannot continue.

## Fix Loop
For authorized CREATE/MODIFY work, fixable P0/P1 failures must loop back into correction and re-verification instead of ending the task prematurely.

## Versioning
A behavior change must update:
1. affected Skill version
2. skill router when routing changes
3. workflow when sequence changes
4. schema when output semantics change
5. eval cases
6. validator expectations
