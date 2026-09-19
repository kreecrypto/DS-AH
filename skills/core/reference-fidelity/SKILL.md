---
id: reference-fidelity
version: 1.0.0
scope: core
---

# Reference Fidelity Skill

## Purpose
Verify that REPRODUCE and ADAPT work remains faithful to the approved reference and requested scope.

## Trigger
Mandatory after CREATE/MODIFY and for QA of reference-based work.

## Compare dimensions
1. page shell/navigation/header
2. information hierarchy
3. section order
4. major geometry and grid
5. component families/identity
6. spacing rhythm
7. typography
8. color/surface
9. content structure
10. states/interaction
11. responsive behavior
12. requested-change boundary

## Procedure
1. Capture/inspect the approved reference.
2. Capture/inspect the result at comparable viewport/state.
3. Compare each dimension independently.
4. Record PASS/FAIL/BLOCKED/NOT_APPLICABLE per dimension.
5. For ADAPT, compare unchanged areas against the pre-change target.
6. Classify every material divergence as requested, approved exception, or defect.
7. Send defects to Fix Loop.

## Hard rules
- Visual similarity alone is not enough when component/source identity matters.
- A requested change does not authorize redesign outside its boundary.
- Missing comparable evidence means BLOCKED, not PASS.
- In REPRODUCE, unexplained material divergence is FAIL.

## Evidence
A structured comparison matrix with dimension, result, evidence, divergence and required action.
