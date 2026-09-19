# Design Agent Production Flow v2.4

## Architecture
Chat = Agent  
GitHub = Brain / Knowledge  
Figma = Workspace

## Production flow

1. User Request
2. Resolve Intent
3. Load Agent Skills
4. Figma Inspect
5. Capture Baseline
6. Resolve Reference + Authority Lanes
7. Reference Lock
8. Visual Grammar Extraction
9. Design System Mapping
10. Design Decision
11. Change Scope
12. Write Permission
13. Pre-write Revalidation
14. Figma Execution Plan
15. Mutation / REPRODUCE Skeleton nested checkpoint
16. Mutation Recovery when needed
17. Verification
18. QA Pre-regression: QA-01A, QA-01B, QA-02..QA-09
19. QA-10 Visual Regression
20. Final QA Aggregation
21. Fix Loop
22. Evidence
23. Complete

## Stage 6 — Resolve Reference
Current-task exact user visual/Figma reference has highest Visual Authority when explicitly used as the reference. Prior reference that cannot be recovered blocks. Product Master cannot be silently substituted.

## Stage 7 — Reference Lock
Record Primary Visual Authority, Build Mode, authority lanes, allowed supporting sources, forbidden substitutions and evidence. Reference-based design cannot proceed without LOCKED or justified NOT_APPLICABLE.

## Stage 8 — Visual Grammar
Extract canvas, grid, hierarchy, repeated anatomy/order, typography, surface, colors, charts, states, responsive behavior, fidelity anchors and unknowns.

## Stage 9 — Design System Mapping
Map visual roles to approved components/tokens while preserving each locked visual role. Material conflict is recorded, not hidden by substituting another composition.

## REPRODUCE nested flow
Skeleton → side-by-side compare → fix P0/P1 → detail batches → final side-by-side compare.

## QA
QA-01A Reference Authority and QA-01B Visual Fidelity are independent gates. QA-10 remains the regression phase.

## Return paths
Missing prior ref → BLOCKED_REFERENCE_MISSING → resume at Resolve Reference.  
Invalid lock → resume at Reference Lock.  
Incomplete grammar → resume at Visual Grammar Extraction.  
DS mapping conflict → resume at Design System Mapping.  
Stale reference → Resolve Reference.  
Fix → Verification → affected pre-regression QA → QA-10 → Final QA.

## Completion
PASS only with valid authority, fidelity evidence, applicable QA and complete Evidence Matrix.
