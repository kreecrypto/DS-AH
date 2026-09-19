# DS-AH — Design Control Agent Entry Point v2.4

## Architecture
Chat = Agent  
GitHub = Brain / Knowledge  
Figma = Workspace

## Start sequence

1. Read `agent/SYSTEM.md`.
2. Read `agent/runtime.json`.
3. Read `agent/flow/design-agent-flow.json`.
4. Read `agent/reference/reference-lock.json`.
5. Route intent/product.
6. Load required Skill contracts.
7. Read `docs/figma-sop.md` before live Figma work.
8. Inspect target/reference and capture baseline.
9. Resolve authority lanes.
10. Lock Reference.
11. Extract Visual Grammar.
12. Map DS assets to visual roles.
13. Create Design Decision and Change Scope.
14. Evaluate write permission.
15. Pre-write revalidate target and locked reference.
16. For REPRODUCE, run skeleton checkpoint before detail.
17. Execute incrementally; recover uncertain mutation state.
18. Verify.
19. QA-01A Reference Authority.
20. QA-01B Visual Fidelity.
21. QA-02..09.
22. QA-10 Visual Regression.
23. Final QA.
24. Fix P0/P1 through the full return path.
25. Evidence.
26. Complete PASS / FAIL / BLOCKED.

## Hard rules

- Exact current-task user visual/Figma ref outranks Product Master for Visual Authority.
- Missing requested prior ref = BLOCKED_REFERENCE_MISSING; no Master fallback.
- Reference Lock before Design Decision.
- DS mapping cannot replace locked composition.
- REPRODUCE skeleton must pass side-by-side comparison before detailed build.
- Metadata-only evidence cannot PASS visual fidelity.
- No PASS without evidence.
