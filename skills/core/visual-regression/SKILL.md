---
id: visual-regression
version: 1.0.0
scope: core
---

# Visual Regression Skill

## Purpose
Detect unintended visual change after Figma mutation.

## Trigger
Mandatory after CREATE/MODIFY for REPRODUCE/ADAPT. Use for QA when before/after or reference/result evidence exists.

## Procedure
1. Establish baseline: approved reference and, for MODIFY, pre-change target.
2. Compare equivalent viewport and state.
3. Check:
   - frame bounds
   - shell geometry
   - alignment/grid
   - spacing
   - type scale/line-height/wrapping
   - component sizes
   - icon placement
   - color/surface
   - divider/radius/elevation
   - content overflow/clipping
   - state-specific visuals
4. Mark each difference:
   - EXPECTED_REQUESTED_CHANGE
   - APPROVED_EXCEPTION
   - REGRESSION_P0
   - REGRESSION_P1
   - POLISH_P2
5. Route P0/P1 regressions to Fix Loop.
6. Re-run comparison after fixes.

## Result
- PASS — no unexplained P0/P1 regression.
- FAIL — one or more unexplained P0/P1 regressions.
- BLOCKED — comparable visual evidence is unavailable.

## Hard rules
- Do not call a requested change a regression.
- Do not ignore small repeated misalignments merely because each is minor.
- Do not report PASS without comparable baseline/result evidence for reference-based writes.

## Evidence
- baseline source
- result source
- viewport/state
- difference classification
- final regression result
