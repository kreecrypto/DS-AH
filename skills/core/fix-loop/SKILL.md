---
id: fix-loop
version: 2.2.0
scope: core
category: corrective-control
---

# Fix Loop Skill

## Mission
Convert fixable blocking QA failures into the smallest verified correction, then re-run affected quality gates until the authorized task reaches PASS or a genuine BLOCKED condition.

The Fix Loop is controlled correction, not iterative redesign.

## Activate when
Use when all are true:
- task is CREATE_SCREEN/MODIFY_SCREEN/FIX with WRITE_ALLOWED
- QA has P0/P1 FAIL
- failure is safely fixable within existing or valid dependent scope

Standalone REVIEW/QA does not enter write Fix Loop without rerouting/permission.

## Required inputs
- failed gate(s)
- defect records
- evidence
- Change Scope
- permission state
- baseline/reference
- post-write result
- specialist skill outputs

## Root-cause classification
Classify each failure primarily as:
- REFERENCE
- SCOPE
- IA
- INTERACTION
- DESIGN_SYSTEM
- CONTENT
- VISUAL
- RESPONSIVE_ACCESSIBILITY
- STRUCTURE
- EXECUTION
- UNKNOWN

Fix root cause before symptoms when possible.

## Fixability classification

### SELF_FIXABLE
Can be corrected:
- within current authority
- within Change Scope or necessary dependent scope
- without unknown business decision
- using available Figma capability

### SCOPE_UPDATE_REQUIRED
Fix requires change outside current allowed scope.
Do not proceed until controller approves/derives a valid scope update.

### BUSINESS_DECISION_REQUIRED
Behavior/content meaning is unknown.
BLOCK.

### AUTHORITY_REQUIRED
Reference/ownership conflict prevents safe fix.
BLOCK.

### TOOL_BLOCKED
Figma/tool capability prevents verified correction.
BLOCK.

## Iteration procedure
1. Collect current P0/P1 failures.
2. Group related failures by root cause.
3. Prioritize:
   - P0
   - root causes producing multiple P1s
   - remaining P1
4. Define smallest correction.
5. Check correction against Change Scope.
6. Re-check permission.
7. Apply correction.
8. Inspect/verify mutation.
9. Re-run failed gate.
10. Re-run dependent gates.
11. Re-run Visual Regression when reference-based/layout/visual/component changes occurred.
12. Update defect status.
13. Repeat while SELF_FIXABLE blocking failures remain.

## Dependency examples
If fixing:
- spacing token → re-test DS + Visual + Regression
- IA grouping → re-test IA + Interaction + Content + Responsive + Visual + Scope
- component variant → re-test DS + Interaction + Visual + Structural + Regression
- error copy → re-test Content + Interaction + Responsive
- responsive stack → re-test Responsive + Visual + Structural + Regression

## Scope protection
A fix may change a dependent region only when:
- dependency is technically/semantically necessary
- change is minimal
- reason is recorded
- protected design intent remains intact

Do not use "fixing QA" as blanket scope expansion.

## Stop conditions

### PASS
- no applicable P0/P1 remains
- affected gates re-tested
- regression passed when applicable
- evidence complete

### BLOCKED
Use when:
- fix needs unresolved business decision
- reference/ownership unclear
- scope cannot validly expand
- write capability unavailable
- safe verification impossible

### Continue
Do not stop at FAIL if:
- issue is SELF_FIXABLE
- permission remains valid
- correction is within scope

## Loop safety
Do not:
- repeatedly toggle between two solutions without new evidence
- downgrade severity to exit loop
- hide/remove failing content
- re-baseline against the failed result
- fix unrelated P2 while P0/P1 remains
- claim correction without post-fix inspection

## Iteration record
Each iteration includes:
- iteration number
- defects addressed
- root cause
- fixability
- intended correction
- scope check
- mutation
- verification
- gates re-run
- regression result
- remaining failures

## Anti-patterns
- symptom patch instead of root-cause fix
- full-screen rebuild for local defect
- fixing P2 before P1
- widening scope silently
- repeating mutation without reading result
- stopping after tool success

## Required output
- iteration records
- defects resolved
- defects remaining
- scope updates if any
- gates re-run
- regression re-test
- final PASS/BLOCKED state
- unresolved blockers

## Downstream handoff
Return corrected verified state to Design QA.
Return iteration history to Evidence.
