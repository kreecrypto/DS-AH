# Design Control Agent Skill System v2.2

Status: Active

## Goal

Make Figma design work deterministic, auditable, resistant to drift, and detailed enough that separate agent runs given the same evidence make materially consistent decisions.

## Model

**Agent = control/orchestration**  
**Skill = professional capability**  
**Workflow = sequence**  
**Registry/Reference = truth**  
**Gate = completion rule**  
**Evidence = audit trail**

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
→ Fix Loop
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
→ Information Architecture
→ Interaction / States
→ Responsive & Accessibility
→ Content QA
→ Visual Quality
→ Structural QA
→ Scope Integrity
→ Visual Regression when applicable
→ Evidence Matrix
→ PASS / FAIL / BLOCKED

## Skill depth contract

The primary 13 skills follow `skills/SKILL-CONTRACT.md`.

Each must contain observable professional checks rather than generic instructions. Minimum structure/depth is validated by `scripts/run-skill-depth-evals.mjs`.

## Evidence-first rule

Every material PASS claim maps to direct or comparative evidence appropriate to the task.
UNKNOWN is never PASS.
Missing authority/tool/evidence produces BLOCKED when safe verification cannot continue.

## Fix Loop

Authorized CREATE/MODIFY P0/P1 failures are corrected at root cause, verified, re-tested across dependent gates, and regression-checked before completion.

## Versioning

Behavior changes update:
1. Skill version
2. Skill router/system version when orchestration expectations change
3. workflow/schema where affected
4. eval cases
5. validator expectations
