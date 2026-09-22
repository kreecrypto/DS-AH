# Workflow — Visual Delta Fix Loop

## Input
Verified result + locked reference + preservation baseline + Mutation Budget.

## Procedure
1. Capture comparable result/reference evidence at equivalent viewport/state.
2. Emit delta records using `agent/qa/visual-delta.schema.json`.
3. Sort P0 → P1 → P2.
4. Group deltas by root cause rather than by visible symptom.
5. Decide whether the root cause is:
   - wrong reference/authority
   - wrong screen skeleton
   - wrong component identity
   - wrong variant/state
   - wrong token/style
   - wrong layout constraint
   - wrong content
   - optical polish
6. Route authority/root-source failures back to reference/system resolution instead of patching visually.
7. Build the smallest patch batch.
8. Check the batch against Mutation Budget and protected regions.
9. Execute.
10. Reinspect affected nodes plus protected siblings.
11. Regenerate delta records.
12. Re-run affected QA and QA-10.
13. End at PASS / FAIL / BLOCKED.

## Principle
Fix root causes, not screenshots. A screenshot can prove a mismatch; it cannot justify detaching the Design System or redrawing unaffected regions.
