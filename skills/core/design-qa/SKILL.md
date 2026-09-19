---
id: design-qa
version: 2.2.0
scope: core
category: quality-control
---

# Design QA Skill

## Mission
Make completion a gate decision backed by evidence rather than subjective confidence.

Design QA orchestrates QA-01 through QA-10. It does not replace the specialist skills that provide evidence for each gate.

## Activate when
Mandatory:
- after CREATE_SCREEN/MODIFY_SCREEN execution
- for standalone QA requests
- after Fix Loop iterations
- before final PASS on reference-based design work

Standalone QA is read-only.

## Required inputs
- task/command
- target/result
- Design Decision
- Change Scope
- Build Mode
- Reference Gate/source
- loaded skills
- specialist outputs
- baseline/reference evidence
- mutation evidence when applicable

## Gate map

### QA-01 Reference Fidelity
Source: Reference Resolution + Reference Fidelity.
Verify:
- correct authority
- Build Mode
- reference/result comparability
- no material unexplained drift

### QA-02 Design System Compliance
Source: DS Compliance.
Verify:
- correct component identities
- variables/styles
- ownership
- no unauthorized detach/duplication
- valid component API

### QA-03 Information Architecture
Source: IA.
Verify:
- task hierarchy
- grouping/order
- navigation/findability
- disclosure
- scope integrity of structural changes

### QA-04 Interaction / States
Source: Interaction Design.
Verify:
- state coverage
- trigger/outcome
- validation/recovery
- destructive/async behavior
- prototype evidence where required

### QA-05 Responsive & Accessibility
Source: Responsive & Accessibility.
Verify:
- supported viewport behavior
- no material clipping
- content priority
- focus/state distinction
- non-color semantics
- design-level accessibility expectations

### QA-06 Content QA
Source: UX Writing/Content.
Verify:
- terminology
- labels/CTA
- error/recovery
- state content
- wrapping/truncation
- business meaning preservation

### QA-07 Visual Quality
Source: Visual Quality.
Verify:
- hierarchy
- composition
- spacing
- alignment
- typography
- color/surface
- density
- states
- edge quality

### QA-08 Structural QA
Source: Inspect + Execution.
Verify:
- Auto Layout/constraints
- clipping/overflow
- repeated structural consistency
- component/layer stability
- no accidental absolute positioning
- mutation verification

### QA-09 Scope Integrity
Compare actual changes with Change Scope.
Verify:
- every changed area is allowed/dependent
- protected areas preserved
- no unrelated redesign
- affected states/viewports were intentionally handled

### QA-10 Visual Regression
Source: Visual Regression.
Required for:
- REPRODUCE writes
- ADAPT writes
- MODIFY
- any task where comparable before/after fidelity is a completion requirement

## Gate status rules

### PASS
Required evidence exists and no blocking defect remains.

### FAIL
Evidence proves a blocking defect.

### BLOCKED
Required evidence cannot be obtained, authority is unresolved, or safe verification cannot complete.

### NOT_APPLICABLE
Gate is genuinely irrelevant and reason is documented.
Do not use N/A to avoid testing.

## Final result calculation
- BLOCKED if any required gate is BLOCKED
- FAIL if no required gate is BLOCKED but at least one required gate FAILs
- PASS only when every required gate PASSes and all N/A decisions are justified

P2 polish does not change PASS to another final state. Record it separately.

## Severity

### P0
Critical task/system/fidelity failure.
Examples:
- wrong source/master
- destructive out-of-scope mutation
- critical task impossible
- severe clipping/unreadability
- critical action meaning wrong

### P1
Material quality/usability/system defect.
Examples:
- broken responsive layout
- missing important state
- duplicate/rebuilt DS component
- repeated visual inconsistency
- interaction recovery gap
- material scope drift

### P2
Non-blocking polish.
Examples:
- small optical alignment
- minor wording/style consistency
- small rhythm refinement

## QA procedure
1. Determine applicable gates.
2. Collect specialist evidence.
3. Evaluate each gate independently.
4. Record defects with exact location.
5. Assign severity.
6. Determine fixability.
7. For authorized CREATE/MODIFY:
   - route fixable P0/P1 to Fix Loop
8. For standalone QA:
   - report required action without mutation
9. Re-evaluate affected gates after fix.
10. Recompute final result.
11. Emit Evidence Matrix.

## Defect record
Every P0/P1 defect should include:
- defectId
- gateId
- severity
- location
- observed result
- expected result
- evidence
- likely root cause
- required action
- fixable within scope: yes/no/unknown
- post-fix verification

## Dependency re-test rules
If a fix changes:
- IA → re-test Interaction, Content, Responsive, Visual, Scope
- component identity → re-test DS, Visual, Structural, Regression
- content → re-test Responsive, Visual, Content
- layout → re-test Responsive, Visual, Structural, Regression
- interaction → re-test Interaction, Content, Accessibility
- scope → re-test Scope Integrity and affected gates

## Anti-patterns
- one global "looks good" QA
- passing because tool operation succeeded
- passing with missing baseline evidence
- hiding failure as P2
- using NOT_APPLICABLE without reason
- fixing standalone QA without write authorization
- re-testing only the exact pixel changed when dependencies exist

## Required evidence
- gate applicability
- status per QA-01..QA-10
- evidence per gate
- defect records
- severity
- P2 notes
- fixability
- re-test results
- final result
- open gaps

## Downstream handoff
Send failures to Fix Loop when authorized.
Send final matrix to Evidence and completion controller.
