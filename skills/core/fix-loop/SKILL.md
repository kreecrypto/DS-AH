---
id: fix-loop
version: 1.0.0
scope: core
---

# Fix Loop Skill

## Purpose
Turn QA failures into deterministic corrections and prevent premature completion.

## Trigger
Mandatory whenever CREATE/MODIFY/QA produces FAIL on a fixable issue.

## Loop
1. Collect failed gates and exact evidence.
2. Rank failures: P0 then P1; P2 is non-blocking polish unless requested.
3. Identify the smallest root-cause fix.
4. Confirm the fix remains inside user-authorized scope.
5. Apply the fix only when write authorization exists.
6. Re-run the failed gate.
7. Re-run dependent gates affected by the change.
8. Re-run Visual Regression for reference-based writes.
9. Repeat until:
   - all blocking gates PASS, or
   - a genuine blocker prevents further correction.

## Stop conditions
- PASS — no P0/P1 failures remain.
- BLOCKED — missing authority/tool/evidence/business rule prevents a safe fix.
- Do not stop at FAIL if the issue is safely fixable within authorized scope.

## Hard rules
- Never broaden scope merely to make QA pass.
- Never hide a failing element/state.
- Never downgrade severity to avoid another iteration.
- Never claim a fix without post-fix verification.

## Evidence
- iteration number
- failures addressed
- root cause
- change made
- gates re-run
- final result
- unresolved blocker
