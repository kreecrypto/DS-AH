---
id: design-qa
version: 2.4.0
scope: core
category: quality-control
---

# Design QA Skill

## Mission
Make completion an evidence-backed gate decision.
Reference Authority and Visual Fidelity are independent gates.

## Activate when
Mandatory after CREATE_SCREEN.
Mandatory after MODIFY_SCREEN/FIX.
Mandatory for standalone QA.
Mandatory after Fix Loop.
Mandatory before final PASS on reference-based work.

Standalone QA remains read-only.

## Required inputs
- task/command
- target/result
- Build Mode
- Reference Gate
- Reference Lock
- Visual Grammar
- Design System Mapping
- Design Decision
- Change Scope
- loaded skills
- baseline evidence
- visual comparison evidence
- mutation/verification evidence
- specialist outputs

## Gate map

### QA-01A Reference Authority
Source: Reference Resolution + Reference Lock.

Verify:
- correct Primary Visual Authority
- authority lane assignment
- Build Mode
- no forbidden substitution
- prior-ref recovery correctness
- exact user ref not replaced by Product Master

Wrong source/master is P0.

### QA-01B Visual Fidelity
Source: Reference Fidelity + Visual Grammar.

Verify:
- comparable reference/result evidence
- frame/aspect ratio
- grid/major geometry
- repeated anatomy/order
- spacing/density
- typography roles
- surface/color roles
- chart/badge geometry
- relevant states/responsive behavior

For REPRODUCE, side-by-side visual evidence is mandatory.
Metadata-only evidence cannot PASS.

### QA-02 Design System Compliance
Verify component identities, tokens, ownership, APIs and no unauthorized detach/duplication.

### QA-03 Information Architecture
Verify hierarchy, grouping/order, navigation/findability and structural scope.

### QA-04 Interaction / States
Verify state coverage, trigger/outcome, validation/recovery and prototype evidence.

### QA-05 Responsive & Accessibility
Verify supported viewports, clipping, priority, focus/state distinction and non-color semantics.

### QA-06 Content QA
Verify terminology, labels/CTA, state copy, wrapping/truncation and meaning preservation.

### QA-07 Visual Quality
Verify hierarchy, composition, spacing, alignment, typography, color/surface, density and edge quality.

### QA-08 Structural QA
Verify Auto Layout/constraints, clipping/overflow, repeated structure, instance stability and mutation verification.

### QA-09 Scope Integrity
Verify every change is allowed/dependent, protected areas remain stable, and no unrelated redesign occurred.

### QA-10 Visual Regression
Run after pre-regression gates.
Required for REPRODUCE/ADAPT/MODIFY/FIX when comparison applies.

## Gate status rules

### PASS
Required evidence exists and no blocking defect remains.

### FAIL
Evidence proves a blocking defect.

### BLOCKED
Required evidence/authority/comparison cannot be obtained.

### NOT_APPLICABLE
Genuinely irrelevant with documented reason.
Never use N/A to avoid testing.

## Final result calculation
Order:
1. QA-01A
2. QA-01B
3. QA-02..QA-09
4. QA-10
5. Final Aggregation

Final:
- any required BLOCKED → BLOCKED
- else any required FAIL → FAIL
- else PASS

A visually polished result using the wrong reference cannot PASS.

## Severity

### P0
- wrong reference/master
- locked user ref replaced
- destructive out-of-scope mutation
- critical task impossible
- severe unreadability/clipping

### P1
- material visual fidelity drift
- broken responsive layout
- missing important state
- duplicate/rebuilt DS component
- interaction recovery gap
- material scope drift

### P2
- minor optical alignment
- wording/style polish
- small rhythm refinement

## QA procedure
1. Determine applicable gates.
2. Validate Reference Lock.
3. Validate Visual Grammar and DS Mapping.
4. Evaluate QA-01A.
5. Evaluate QA-01B.
6. Evaluate QA-02..QA-09.
7. Run QA-10 when applicable.
8. Record defects with exact location.
9. Assign severity.
10. Determine fixability.
11. Route authorized P0/P1 to Fix Loop.
12. Re-test all affected gates.
13. Recompute final result.
14. Emit Evidence Matrix.

## Dependency re-test rules
If reference changes → re-run QA-01A, QA-01B, QA-02..09 as affected, QA-10.
If layout changes → re-run QA-01B, QA-05, QA-07, QA-08, QA-09, QA-10.
If component identity changes → re-run QA-02, QA-07, QA-08, QA-10.
If content changes → re-run QA-06, QA-05, QA-07.
If interaction changes → re-run QA-04, QA-05, QA-06.
If scope changes → re-run QA-09 and all affected gates.

## Anti-patterns
- one global “looks good” QA
- treating tool success as PASS
- passing wrong reference because result is attractive
- metadata-only visual fidelity PASS
- hiding failure as P2
- using NOT_APPLICABLE without reason
- fixing standalone QA without write authorization
- re-testing only changed pixels when dependencies exist

## Required evidence
- gate applicability
- QA-01A status/evidence
- QA-01B status/evidence
- QA-02..QA-10 status/evidence
- defect records
- severity
- fixability
- post-fix re-tests
- final result
- open gaps

## Downstream handoff
Send fixable failures to Fix Loop when authorized.
Send final gate matrix to Evidence and completion controller.
