---
id: visual-regression
version: 2.4.0
scope: core
category: regression-control
---

# Visual Regression Skill

## Mission
Detect unintended visual/structural drift against the locked Authority baseline and Preservation baseline.

Regression is structured difference classification, not subjective screenshot judging.

## Activate when
Mandatory after REPRODUCE CREATE.
Mandatory after ADAPT CREATE.
Mandatory after MODIFY/FIX.
Use for QA whenever comparable reference/before/after evidence exists.

## Required inputs
- Reference Lock
- locked Visual Authority
- Visual Grammar
- pre-change Preservation baseline when applicable
- post-change result
- Change Scope
- Build Mode
- viewport/state
- expected delta
- skeleton comparison when REPRODUCE nested flow applies

## Baseline types

### Authority baseline
The locked Visual Authority used to judge reference fidelity.

### Preservation baseline
The pre-change target used to ensure unaffected regions remain unchanged.

For ADAPT/MODIFY, both may be required.

Never replace Authority baseline with a convenient Product Master after Reference Lock.

## Comparison validity
Before comparing verify:
- same/equivalent viewport
- same state
- content differences understood
- same relevant region
- both sources inspectable
- expected change known
- locked reference still valid

If not comparable, do not PASS.

## REPRODUCE checkpoints

### Skeleton comparison
After skeleton mutation:
- capture visual result
- compare side-by-side to locked reference
- evaluate frame/grid/card geometry/spacing/hierarchy
- P0/P1 blocks detailed build

### Final comparison
After detail build:
- compare full relevant result
- use same locked reference
- classify all material differences

Metadata-only evidence cannot PASS either checkpoint.

## Comparison dimensions

### Geometry
- frame/aspect ratio
- region bounds
- grid
- columns/rows
- repeated-card bounds/order
- chart geometry

### Spacing/alignment
- margins
- padding
- gaps
- baselines
- repeated anchors
- density

### Typography
- role
- size/weight
- line height
- wrapping
- numeric emphasis

### Components
- family
- instance identity
- variant/state
- icon identity/position

### Color/surface
- fill
- stroke
- radius
- elevation
- dividers
- opacity
- semantic roles

### Content
When expected unchanged:
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
- overlap
- awkward wrap
- uneven height
- accidental scroll

## Difference classification

### EXPECTED_REQUESTED_CHANGE
Directly required by Change Scope.

### EXPECTED_DEPENDENT_CHANGE
Necessary minimal consequence of allowed change.

### APPROVED_EXCEPTION
Known intentional difference approved by task/source policy.

### REGRESSION_P0
Critical unintended change or wrong authority baseline.

### REGRESSION_P1
Material unintended visual/structural drift.

### POLISH_P2
Non-blocking minor difference.

### UNKNOWN_DIFFERENCE
Material difference whose cause/intent cannot be determined.
Blocks PASS.

## Procedure
1. Validate Reference Lock.
2. Select original baseline(s).
3. Verify comparison validity.
4. Establish expected delta.
5. Compare dimensions in fixed order.
6. Classify each difference.
7. Verify protected regions.
8. Group repeated differences by root pattern.
9. Assign severity.
10. Route P0/P1 to Fix Loop.
11. After fix compare again from original baseline.
12. Record final QA-10 result.

## Result

### PASS
- comparable visual evidence exists
- no unexplained P0/P1
- material changes expected/approved
- protected areas stable

### FAIL
One or more unexplained P0/P1.

### BLOCKED
- reference/result not comparable
- screenshot/render unavailable
- source authority unresolved
- evidence insufficient
- locked reference invalid

## Scope rules
Visible change outside Change Scope is not acceptable merely because it looks better.
It must be necessary dependency, explicitly approved, or treated as regression.

## Anti-patterns
- metadata-only visual PASS
- eyeballing only changed component
- comparing different viewports without normalization
- treating all differences as defects
- treating all differences as requested
- accepting repeated drift because each item is small
- re-baselining failed result
- swapping authority baseline after mismatch

## Required evidence
- Reference Lock
- Authority baseline
- Preservation baseline
- result source
- viewport/state
- expected delta
- skeleton side-by-side when applicable
- final side-by-side
- dimension comparison
- difference records
- protected-area result
- severity
- QA-10 result

## Downstream handoff
Send P0/P1 to Fix Loop.
Send final comparison to QA-10 and Evidence.
