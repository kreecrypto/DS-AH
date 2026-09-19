# Workflow — QA v2.4

## Canonical order

Verification  
→ QA-01A Reference Authority  
→ QA-01B Visual Fidelity  
→ QA-02..QA-09  
→ QA-10 Visual Regression  
→ Final QA Aggregation  
→ Fix Loop when authorized  
→ Evidence.

## QA-01A
Verify Reference Lock, authority lanes, Build Mode and forbidden substitutions.

Wrong source/master is a P0 fidelity failure.

## QA-01B
Compare result with Visual Grammar at equivalent viewport/state.

For REPRODUCE:
- side-by-side visual evidence required
- skeleton and final comparisons should exist when the nested reproduce flow applies
- metadata-only evidence cannot PASS

## QA-02..09
Design System, IA, Interaction/States, Responsive/A11y, Content, Visual Quality, Structural, Scope.

## QA-10
Final regression against original locked authority baseline and preservation baseline when applicable.

## Final aggregation
Any required BLOCKED → BLOCKED.  
Else any required FAIL → FAIL.  
Else PASS.

## Fix Loop
Final QA FAIL
→ Fix
→ Verification
→ affected QA-01A/QA-01B/QA-02..09
→ QA-10
→ Final QA.
