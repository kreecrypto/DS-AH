---
id: visual-regression
version: 2.2.0
scope: core
category: regression-control
---

# Visual Regression Skill

## Mission
Detect unintended visual or structural drift by comparing equivalent baseline/reference and result states after design mutation.

Regression is difference classification, not subjective screenshot judging.

## Activate when
Mandatory after:
- REPRODUCE CREATE
- ADAPT CREATE
- MODIFY/FIX

Use for QA when comparable before/after or reference/result evidence exists.

## Required inputs
- approved reference
- pre-change baseline for MODIFY when available
- post-change result
- Change Scope
- Build Mode
- viewport/state
- expected delta

## Baseline types

### Authority baseline
Approved Master/reference used to judge fidelity.

### Preservation baseline
Pre-change target used to ensure unaffected areas remain unchanged.

For ADAPT/MODIFY, both may be needed.

## Comparison validity
Before comparison verify:
- same/sufficiently equivalent viewport
- same state
- same content or content differences understood
- same relevant region
- baseline/result both inspectable
- expected requested change known

If not comparable, do not PASS.

## Comparison dimensions

### Geometry
- frame bounds
- region bounds
- width/height
- position
- grid
- column structure
- card/row geometry

### Spacing/alignment
- padding
- gap
- margins between sections
- baseline alignment
- repeated anchors

### Typography
- style
- size
- weight
- line height
- wrapping
- truncation
- numeric alignment

### Components
- component family
- instance identity
- variant/state
- control size
- icon identity/position

### Color/surface
- fill
- stroke
- semantic colors
- radius
- elevation
- dividers
- opacity

### Content
When content should remain unchanged:
- labels
- values
- order
- visibility

### State
- selected
- disabled
- error
- focus
- hover
- loading
- empty
- success

### Responsive
- reflow
- wrapping
- stacking
- hidden/collapsed regions
- overflow
- sticky/fixed behavior

### Edge behavior
- clipping
- overflow
- awkward wrap
- uneven height
- accidental scroll

## Difference classification
Every material difference must be classified:

### EXPECTED_REQUESTED_CHANGE
Directly required by Change Scope.

### EXPECTED_DEPENDENT_CHANGE
Necessary consequence of an allowed change.
Must be minimal and documented.

### APPROVED_EXCEPTION
Known intentional difference approved by task/source policy.

### REGRESSION_P0
Critical unintended change.

### REGRESSION_P1
Material unintended change.

### POLISH_P2
Non-blocking minor difference.

### UNKNOWN_DIFFERENCE
Difference exists but cause/intent cannot be determined.
Blocks PASS when material.

## Procedure
1. Select valid baseline(s).
2. Establish expected delta from Change Scope.
3. Compare dimensions in fixed order.
4. Classify each difference.
5. Verify protected regions.
6. Group repeated differences by root pattern where useful.
7. Assign severity.
8. Route P0/P1 to Fix Loop.
9. After fix, compare again from original baseline, not only previous failed result.
10. Record final result.

## Result

### PASS
- comparable evidence exists
- no unexplained P0/P1
- all material changes are expected/approved
- protected areas stable

### FAIL
One or more unexplained P0/P1 regressions.

### BLOCKED
- baseline/result not comparable
- required viewport/state unavailable
- source authority unresolved
- evidence insufficient to classify material difference

## Scope rules
A visible change outside Change Scope is not automatically acceptable because it improves consistency.
It must be:
- necessary dependency
- explicitly approved
- or treated as regression

## Anti-patterns
- eyeballing only the changed component
- comparing different viewports
- comparing different states without noting it
- treating all differences as defects
- treating all differences as requested
- accepting small repeated drift because each item is minor
- re-baselining after failure to make result pass

## Required evidence
- authority baseline
- preservation baseline
- result source
- viewport/state
- expected delta
- dimension comparison
- difference records
- protected-area result
- severity
- final regression result

## Downstream handoff
Send P0/P1 to Fix Loop.
Send final comparison to QA-10 and Evidence.
